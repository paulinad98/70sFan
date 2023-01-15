const Team = require("../models/team");

exports.postTeam = async (req, res, next) => {
  const { name, logoUrl } = req.body;

  try {
    const team = await Team.create({ name, logoUrl });

    return res.status(201).send(team);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Team.findAll();

    return res.status(202).send(teams);
  } catch (err) {
    return res.status(500).send(err);
  }
};
