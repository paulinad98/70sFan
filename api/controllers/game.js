const { Op } = require("sequelize");

const Game = require("../models/game");
const TeamGames = require("../models/teamGames");
const Team = require("../models/team");

const createTeamGames = (gameId, teamId) => {
  return TeamGames.create({ gameId, teamId });
};

exports.postGame = async (req, res, next) => {
  const {
    date,
    season,
    homeTeamScore,
    awayTeamScore,
    homeTeamId,
    awayTeamId,
    gameUrl,
    basketballReferenceUrl,
    description,
  } = req.body;

  try {
    const game = await Game.create({
      date,
      season,
      homeTeamScore,
      awayTeamScore,
      homeTeamId,
      awayTeamId,
      gameUrl,
      basketballReferenceUrl,
      description,
    });

    let homeTeam = createTeamGames(game.id, homeTeamId);
    let awayTeam = createTeamGames(game.id, awayTeamId);

    [homeTeam, awayTeam] = await Promise.all([homeTeam, awayTeam]);

    return res.status(201).send({ message: "Game created", id: game.id });
  } catch (err) {
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
