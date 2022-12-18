const express = require("express");

const authRoutes = require("./routes/auth");

const app = express();
app.use("/auth", authRoutes);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
