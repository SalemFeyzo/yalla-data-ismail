const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Round = mongoose.model("Round", roundSchema);

module.exports = Round;
