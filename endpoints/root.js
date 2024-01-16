module.exports = {
  path: "/",
  method: "get",
  run: function (q, s) {
    const status = require("../index.js");
    if (status) {
      s.status(200).send("Online");
    } else {
      s.status(503).send("Offline")
    }
  }
}