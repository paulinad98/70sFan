const { Op } = require("sequelize");

const Game = require("../models/game");
const TeamGames = require("../models/teamGames");
const SeasonGames = require("../models/seasonGames");
const Team = require("../models/team");
const Season = require("../models/season");

const reader = require("xlsx");

const createTeamGames = (gameId, teamId) => {
  return TeamGames.create({ gameId, teamId });
};

const createSeasonGames = (gameId, seasonId) => {
  return SeasonGames.create({ gameId, seasonId });
};

function ExcelDateToJSDate(date) {
  const newDate = new Date(Date.UTC(0, 0, date - 1));
  return newDate;
}

exports.postGame = async (req, res, next) => {
  let {
    date,
    seasonId,
    season,
    homeTeamScore,
    awayTeamScore,
    homeTeamId,
    awayTeamId,
    gameUrl,
    basketballReferenceUrl,
    description,
    seasonPhase,
  } = req.body;

  if (!seasonId && season) {
    const seasonObject = await Season.create({ years: season });
    seasonId = seasonObject.id;
  }

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
      seasonPhase: "regular",
    });

    let homeTeam = createTeamGames(game.id, homeTeamId);
    let awayTeam = createTeamGames(game.id, awayTeamId);
    let seasonGames = createSeasonGames(game.id, seasonId);

    await Promise.all([homeTeam, awayTeam, seasonGames]);

    return res.status(201).send({ message: "Game created", id: game.id });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.postGameFile = async (req, res, next) => {
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

    await Game.bulkCreate(games);

    return res.status(201).send({ message: "Game created" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.getGames = async (req, res, next) => {
  let { season, homeTeamId, awayTeamId, page } = req.query;

  const limit = 6;

  page = +page;

  if (!page || !Number.isInteger(page)) {
    page = 1;
  }

  const offset = (page - 1) * limit;

  let conditions = [{ season }, { homeTeamId }, { awayTeamId }];

  conditions = conditions.filter((condition) => {
    return Object.values(condition)[0] !== undefined;
  });

  try {
    const totalPromise = Game.count({
      where: { [Op.and]: [...conditions] },
    });

    const gamesPromise = Game.findAll({
      where: { [Op.and]: [...conditions] },
      include: { model: Team },
      limit,
      offset,
    });

    const [total, games] = await Promise.all([totalPromise, gamesPromise]);

    const lastPage = Math.ceil(total / limit);

    return res.status(201).send({ games, meta: { total, lastPage, page } });
  } catch (err) {
    return res.status(500).send(err);
  }
};
