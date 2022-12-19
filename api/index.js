const express = require("express");

const oauthRoutes = require("./routes/oauth");

const app = express();
app.use("/oauth", oauthRoutes);

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
