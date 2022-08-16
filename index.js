const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./connectDB");
const roundRoutes = require("./routes/roundRoutes");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use("/rounds", roundRoutes);

app.get("/files", (req, res) => {
  let files = fs
    .readdirSync("./", { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name)
    .filter((file) => file.includes("xlsx"))
    .map((item, index) => {
      const i = {
        id: index,
        name: item,
        path: path.join(__dirname, `/${item}`),
      };
      return i;
    })
    .reverse();
  res.json(files);
});

app.get("/download/:id", (req, res) => {
  let files = fs
    .readdirSync("./", { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name)
    .filter((file) => file.includes("xlsx"))
    .map((item, index) => {
      const i = {
        id: index,
        name: item,
        path: path.join(__dirname, `/${item}`),
      };
      return i;
    })
    .reverse();
  const id = `${req.params.id}`;
  const file = files.find((file) => file.id == id).path;
  res.download(file);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log("server is running on http://localhost:5000")
);
