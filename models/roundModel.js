const mongoose = require("mongoose");
const moment = require("moment-timezone");

const now = moment.tz(Date.now(), "Europe/Istanbul");

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
    type: Date,
    required: true,
    default: now,
  },
});

const Round = mongoose.model("Round", roundSchema);

module.exports = Round;
