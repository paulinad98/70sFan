const { oauth } = require("patreon");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const Patreon = require("../models/patreon");

const jwt = require("jsonwebtoken");

const clientId = process.env.PATREON_CLIENT_ID;
const clientSecret = process.env.PATREON_CLIENT_SECRET;
const redirect = process.env.PATREON_REDIRECT_URI;

const jwtPrivateKey = process.env.PRIVATE_KEY;

const oauthClientPatreon = oauth(clientId, clientSecret);

const url =
  "https://www.patreon.com/api/oauth2/v2/identity?include=memberships&fields%5Bmember%5D=last_charge_status,full_name,last_charge_date";

const options = (token) => {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const dateDiffInSeconds = (a, b) => {
  const MS_PER_SECOND = 1000;

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_SECOND);
};

exports.oauthClient = async (req, res, next) => {
  const { code } = req.query;

  try {
    const { access_token } = await oauthClientPatreon.getTokens(code, redirect);

    const response = await fetch(url, options(access_token));
    const patreonData = await response.json();
    const patreonDataIncluded = patreonData.included[0];

    const { id } = patreonDataIncluded;
    const { full_name, last_charge_status, last_charge_date } =
      patreonDataIncluded.attributes;

    if (last_charge_status !== "Paid") {
      return res.status(401).send({
        ok: false,
        error: "Access denied. Don't have a paid membership",
      });
    }

    const lastChargeDate = new Date(last_charge_date);
    const expiresDate = lastChargeDate;
    expiresDate.setMonth(lastChargeDate.getMonth() + 1);
    expiresDate.setDate(15);

    const token = jwt.sign({ id, full_name }, jwtPrivateKey, {
      expiresIn: dateDiffInSeconds(new Date(), expiresDate),
    });

    const pareon = await Patreon.findByPk(id);
    if (!pareon) {
      Patreon.create({ id, name: full_name });
    }

    return res.status(200).send({
      ok: true,
      token,
      patreon: { id, full_name },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res, next) => {
  const { id, full_name } = req.user;

  return res.status(200).send({
    ok: true,
    patreon: { id, full_name },
  });
};
