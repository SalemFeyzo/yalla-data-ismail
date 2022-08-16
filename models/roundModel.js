const mongoose = require("mongoose");
const moment = require("moment-timezone");

const now = moment.tz(Date.now(), "Europe/Istanbul");

const date = new Date(); //2017-04-25T06:23:36.510Z

const roundSchema = new mongoose.Schema({
  roundNum: {
    type: Number,
    required: true,
  },
  fruitName: {
    type: String,
    required: true,
  },
  fruitId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

const Round = mongoose.model("Round", roundSchema);

module.exports = Round;
