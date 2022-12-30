const { oauth } = require("patreon");

const clientId = process.env.PATREON_CLIENT_ID;
const clientSecret = process.env.PATREON_CLIENT_SECRET;
const redirect = process.env.PATREON_REDIRECT_URI;

const oauthClientPatreon = oauth(clientId, clientSecret);

exports.oauthClient = async (req, res, next) => {
  const { code } = req.query;

  try {
    const { access_token } = await oauthClientPatreon.getTokens(code, redirect);
    console.log(access_token);
  } catch (err) {
    console.log(err);
  }
};
