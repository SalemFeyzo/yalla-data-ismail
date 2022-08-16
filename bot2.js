const axios = require("axios");
const moment = require("moment-timezone");
require("dotenv").config();

let baseUrl = "https://play.yalla.live/Webservers/Game";
let userId = "67715553";
let token = "1BF58B87463066D19920BADBF03D8DD2";

const config = {
  headers: {
    "Content-type": "Application/json",
  },
};

let arr = [];

const getData = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}/GameUserPersonal?userid=${userId}&token=${token}`
    );
    const currentNo = res.data.data.currentNo;
    const bureauNoIdent = res.data.data.bureauNoIdent;
    const timer = res.data.data.startSecondNum;

    try {
      const result = await axios.get(
        `${baseUrl}/GameUserBetResult?bureauno=${currentNo}&bureaunoident=${bureauNoIdent}&userid=${userId}&token=${token}`
      );
      const countResult = await axios.get(
        `${baseUrl}/GamePropConfigList?userid=${userId}&token=${token}`
      );
      const fruit =
        result.data.data.betFruitId === 1
          ? "برتقال"
          : result.data.data.betFruitId === 2
          ? "ليمون"
          : result.data.data.betFruitId === 3
          ? "عنب"
          : result.data.data.betFruitId === 4
          ? "تفاح"
          : result.data.data.betFruitId === 5
          ? "فريز"
          : result.data.data.betFruitId === 6
          ? "منجا"
          : result.data.data.betFruitId === 7
          ? "بطيخ"
          : result.data.data.betFruitId === 8
          ? "كرز"
          : "No thing";

      if (result.data.data.betFruitId > 0) {
        const now = moment.tz(Date.now(), "Europe/Istanbul");
        const { data } = await axios.post(
          "http://localhost:5000/rounds",
          {
            roundNum: Number(result.data.data.currBureauno),
            fruitName: fruit,
            fruitId: Number(result.data.data.betFruitId),
            createdAt: String(now),
          },
          config
        );
        console.log("Success");
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

setInterval(getData, 1000);

//1 orange
//2 lemon
//3 Grape
//4 Apple
//5 Strawberry
//6 Mango
//7 watermelon
//8 cherry
