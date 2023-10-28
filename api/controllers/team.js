import { Op } from "sequelize";
import axios from "axios";
import cheerio from "cheerio";

import Team from "../models/team.js";
import Game from "../models/game.js";

const postTeam = async (req, res, next) => {
  const { name, logoUrl } = req.body;

  try {
    const team = await Team.create({ name, logoUrl });

    return res.status(201).send(team);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.findAll();

    return res.status(202).send(teams);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const setTeamsLogoFromBasketballReference = async (req, res, next) => {
  try {
    const teamWihoutLogo = await Team.findOne({
      where: { logoUrl: "" },
      order: [["createdAt", "DESC"]],
    });
    const gameTeamPlayed = await Game.findOne({
      where: {
        [Op.or]: [
          { homeTeamId: teamWihoutLogo.id },
          { awayTeamId: teamWihoutLogo.id },
        ],
      },
    });

    const html = await axios(gameTeamPlayed.basketballReferenceUrl);
    const $ = cheerio.load(html.data);
    let logoUrl;

    if (teamWihoutLogo.id === gameTeamPlayed.homeTeamId) {
      logoUrl = $($(".teamlogo")[1]).attr("src");
    } else {
      logoUrl = $($(".teamlogo")[0]).attr("src");
    }

    Team.update({ logoUrl }, { where: { id: teamWihoutLogo.id } });
  } catch (err) {
    console.log(err);
  }
};

export default {
  postTeam,
  getTeams,
  setTeamsLogoFromBasketballReference,
};
