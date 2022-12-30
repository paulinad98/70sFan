const { oauth } = require("patreon");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const clientId = process.env.PATREON_CLIENT_ID;
const clientSecret = process.env.PATREON_CLIENT_SECRET;
const redirect = process.env.PATREON_REDIRECT_URI;

const oauthClientPatreon = oauth(clientId, clientSecret);

const url =
  "https://www.patreon.com/api/oauth2/v2/identity?include=memberships&fields%5Bmember%5D=last_charge_status,full_name";

const options = (token) => {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

exports.oauthClient = async (req, res, next) => {
  const { code } = req.query;

  try {
    const { access_token } = await oauthClientPatreon.getTokens(code, redirect);

    const response = await fetch(url, options(access_token));
    const patreonData = await response.json();
    const patreonDataIncluded = patreonData.included[0];

    const { id } = patreonDataIncluded;
    const { full_name, last_charge_status } = patreonDataIncluded.attributes;

    console.log(id, full_name, last_charge_status);
  } catch (err) {
    console.log(err);
  }
};
