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
    teamId,
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
      teamId,
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

    return res.status(201).send({ message: "Game created" });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.getGames = async (req, res, next) => {
  try {
    const game = await Game.findAll({ include: { model: Team } });

    return res.status(201).send(game);
  } catch (err) {
    return res.status(500).send(err);
  }
};
