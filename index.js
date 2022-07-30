const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("home", { files: [{ name: "sdsd.xlsx", path: "./sadas.xlsx" }] });
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log("server is running on http://localhost:5000")
);
