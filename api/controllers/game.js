import { Op } from "sequelize";

import axios from "axios";
import cheerio from "cheerio";
import reader from "xlsx";

import Game from "../models/game.js";
import Team from "../models/team.js";
import Season from "../models/season.js";

function ExcelDateToJSDate(date) {
  const newDate = new Date(Date.UTC(0, 0, date - 1));
  return newDate;
}

const postGame = async (req, res, next) => {
  let {
    date,
    seasonId,
    homeTeamScore,
    awayTeamScore,
    homeTeamId,
    awayTeamId,
    gameUrl,
    basketballReferenceUrl,
    description,
    seasonPhase,
  } = req.body;

  try {
    const game = await Game.create({
      date,
      seasonId,
      homeTeamScore,
      awayTeamScore,
      homeTeamId,
      awayTeamId,
      gameUrl: gameUrl.split(";"),
      basketballReferenceUrl,
      description,
      seasonPhase,
    });

    return res.status(201).send({ message: "Game created", id: game.id });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const postGameFile = async (req, res, next) => {
  let file = req.file;

  try {
    const excelFile = reader.read(file.buffer);

    let data = [];

    const sheets = excelFile.SheetNames;

    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(
        excelFile.Sheets[excelFile.SheetNames[i]]
      );
      temp.forEach((res) => {
        res["Date"] = ExcelDateToJSDate(res["Date"]);
        data.push(res);
      });
    }

    let gameObject = {};
    let games = [];
    let seasons = [];
    let teams = [];

    data.forEach((record) => {
      if (record["Against"].includes("/")) {
        gameObject = {};
        gameObject = { Season: record["Against"] };

        seasons.push(record["Against"].split(" ")[0]);
      } else {
        gameObject = {
          ...gameObject,
          ...record,
        };
        games.push(gameObject);
        teams.push(gameObject["Home Team"]);
        teams.push(gameObject["Against"]);

        gameObject = { Season: gameObject["Season"] };
      }
    });

    seasons = [...new Set(seasons)];
    teams = [...new Set(teams)];

    const [teamsFromDb, seasonsFromDb, gamesFromDb] = await Promise.all([
      Team.findAll(),
      Season.findAll(),
      Game.findAll(),
    ]);

    teams = teams.filter(
      (team) => !teamsFromDb.find((teamFromDb) => teamFromDb.name === team)
    );
    seasons = seasons.filter(
      (season) =>
        !seasonsFromDb.find((seasonFromDb) => seasonFromDb.years === season)
    );

    teams = teams.map((team) => {
      return { name: team, logoUrl: "" };
    });
    seasons = seasons.map((season) => {
      return { years: season };
    });

    await Promise.all([Team.bulkCreate(teams), Season.bulkCreate(seasons)]);

    const [teamsWithId, seasonsWithId] = await Promise.all([
      Team.findAll(),
      Season.findAll(),
    ]);

    games = games.filter(
      (game) =>
        !gamesFromDb.find(
          (gameFromDb) =>
            gameFromDb.basketballReferenceUrl === game["Boxscore link"]
        )
    );

    games = games.map((game) => {
      const homeTeamId = teamsWithId.find(
        (team) => team.name === game["Home Team"]
      ).id;
      const awayTeamId = teamsWithId.find(
        (team) => team.name === game["Against"]
      ).id;
      const season = seasonsWithId.find(
        (season) => season.years === game["Season"].split(" ")[0]
      ).id;

      return {
        date: game["Date"],
        seasonId: season,
        homeTeamScore: 0,
        awayTeamScore: 0,
        homeTeamId: homeTeamId,
        awayTeamId: awayTeamId,
        gameUrl: [],
        basketballReferenceUrl: game["Boxscore link"],
        description: game["Notes"] || "",
        seasonPhase: game["Season"].split(" ")[1],
      };
    });

    console.log(games);
    console.log(games.length);

    const gamesWithId = await Game.bulkCreate(games);

    const gameTeamArray = [];
    const gameSeasonArray = [];

    gamesWithId.forEach((game) => {
      gameTeamArray.push({ gameId: game.id, teamId: game.homeTeamId });
      gameTeamArray.push({ gameId: game.id, teamId: game.awayTeamId });
      gameSeasonArray.push({ gameId: game.id, seasonId: game.seasonId });
    });

    return res.status(201).send({ message: "Game created" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const getGames = async (req, res, next) => {
  let { seasonsId, teamsId, seasonPhase, page } = req.query;

  page = +page;
  if (!page || !Number.isInteger(page)) {
    page = 1;
  }

  const limit = 6;
  const offset = (page - 1) * limit;

  try {
    const where = {
      [Op.and]: {
        [Op.or]: {
          homeTeamId: teamsId || { [Op.ne]: null },
          awayTeamId: teamsId || { [Op.ne]: null },
        },
        seasonId: seasonsId || { [Op.ne]: null },
        seasonPhase: seasonPhase || { [Op.ne]: null },
      },
    };

    const totalGamesNumber = Game.count({
      where,
    });

    const filterGames = Game.findAll({
      where,
      include: [
        { model: Team, as: "homeTeam" },
        { model: Team, as: "awayTeam" },
        { model: Season },
      ],
      limit,
      offset,
    });

    const [total, games] = await Promise.all([totalGamesNumber, filterGames]);

    const lastPage = Math.ceil(total / limit);

    return res.status(200).send({ games, meta: { total, lastPage, page } });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const setGameScoresFromBasketballReference = async (req, res, next) => {
  try {
    const gamesWithNoScore = await Game.findAll({
      where: { [Op.or]: [{ homeTeamScore: 0 }, { awayTeamScore: 0 }] },
    });

    const req = [];

    gamesWithNoScore.slice(0, 5).forEach(async (game) => {
      const html = await axios(game.basketballReferenceUrl);
      const $ = cheerio.load(html.data);

      const awayTeamScore = $($(".score")[0]).text();
      const homeTeamScore = $($(".score")[1]).text();

      req.push(
        Game.update(
          { homeTeamScore, awayTeamScore, gameUrl: [] },
          { where: { id: game.id } }
        )
      );
    });

    await Promise.all(req);

    return res.status(200).send({ message: "Game scores updated" });
  } catch (err) {
    console.log(err);
  }
};

export default {
  postGame,
  postGameFile,
  getGames,
  setGameScoresFromBasketballReference,
};
