import Season from "../models/season.js";

const postSeason = async (req, res, next) => {
  const { years } = req.body;

  try {
    const season = await Season.create({ years });

    return res.status(201).send({ message: "Season created", id: season.id });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getSeasons = async (req, res, next) => {
  try {
    const seasons = await Season.findAll();

    return res.status(202).send(seasons);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export default {
  postSeason,
  getSeasons,
};
