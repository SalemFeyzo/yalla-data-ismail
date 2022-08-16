const Round = require("../models/roundModel");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { from, to } = req.query;
    try {
      const allRounds = await Round.find({
        createdAt: {
          $gte: from,
          $lte: to,
        },
      }).sort({ createdAt: -1 });
      if (allRounds.length > 0) {
        const rounds = allRounds.filter(
          (v, i, a) => a.findIndex((v2) => v2.roundNum === v.roundNum) === i
        );
        res.status(200).json(rounds);
      } else {
        res.status(200).json({ msg: "لا يوجد جولات مسجلة ضمن هذا التاريخ" });
      }
    } catch (error) {
      res.status(401);
      throw new Error("Field");
    }
  })
  .post(async (req, res) => {
    try {
      const { roundNum, fruitName, fruitId, createdAt } = req.body;
      Round.collection.dropIndexes();
      const newRound = new Round({
        roundNum,
        fruitName,
        fruitId,
        createdAt,
      });
      newRound.save();
      res.status(200).json(newRound);
      // const newRounds = await Round.insertMany(rounds);
      // res.status(200).json(newRounds);
    } catch (error) {
      res.status(401);
      throw new Error("Field to add");
    }
  });

module.exports = router;
