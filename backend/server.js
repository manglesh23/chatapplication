const express = require("express");
const { connectdatabase } = require("./databaseconnect/databaseconnect");
const { router } = require("./authrouter/authrouter");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/", router);

connectdatabase()
  .then(() => {
    app.listen(7000, () => {
      console.log("listening at 7000");
    });
  })
  .catch((e) => {
    return {
      error: true,
      details: e,
    };
  });
