const Season = require("../models/season");

exports.postSeason = async (req, res, next) => {
  const { years, phase } = req.body;

  try {
    const season = await Season.create({
      years,
      phase,
    });

    return res.status(201).send({ message: "Season created", id: season.id });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.getSeasons = async (req, res, next) => {
  try {
    const seasons = await Season.findAll();

    return res.status(202).send(seasons);
  } catch (err) {
    return res.status(500).send(err);
  }
};
