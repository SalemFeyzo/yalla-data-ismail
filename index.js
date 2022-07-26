const axios = require("axios");
var xl = require("excel4node");

let baseUrl = "https://play.yalla.live/Webservers/Game";
let userId = "67715553";
let token = "1BF58B87463066D19920BADBF03D8DD2";

const headerColumns = ["Round", "Fruit"];
const headerColumnsForCounts = ["ID", "Fruit", "Count"];
let arr = [];
const createExcelFile = (data, fruitCount) => {
  var wb = new xl.Workbook();
  const today = new Date().toLocaleDateString();

  var ws = wb.addWorksheet(`Rounds`);
  let colIndex = 1;
  headerColumns.forEach((el) => {
    ws.cell(1, colIndex++).string(el);
  });
  let rowIndex = 2;
  data.forEach((el) => {
    let colIndex = 1;
    Object.keys(el).forEach((colName) => {
      ws.cell(rowIndex, colIndex++).string(el[colName]);
    });
    rowIndex++;
  });

  //create count paper
  var wsCounts = wb.addWorksheet(`Counts`);

  let colIndexForCounts = 1;

  headerColumnsForCounts.forEach((el) => {
    wsCounts.cell(1, colIndexForCounts++).string(el);
  });

  let rowIndexForCounts = 2;

  fruitCount.forEach((el) => {
    let colIndex = 1;
    Object.keys(el).forEach((colName) => {
      wsCounts.cell(rowIndexForCounts, colIndex++).string(el[colName]);
    });
    rowIndexForCounts++;
  });

  wb.write(`${today.split("/").join("-")}.xlsx`);
};

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
          ? "Orange"
          : result.data.data.betFruitId === 2
          ? "Lemon"
          : result.data.data.betFruitId === 3
          ? "Grape"
          : result.data.data.betFruitId === 4
          ? "Apple"
          : result.data.data.betFruitId === 5
          ? "Strawberry"
          : result.data.data.betFruitId === 6
          ? "Mango"
          : result.data.data.betFruitId === 7
          ? "Watermelon"
          : result.data.data.betFruitId === 8
          ? "Cherry"
          : "No thing";

      if (result.data.data.betFruitId > 0) {
        console.log({ result: result.data.data.betFruitId, timer });
        arr.push({
          round: `${result.data.data.currBureauno}`,
          fruit,
        });
        //remove duplicates
        const data = arr.filter(
          (v, i, a) => a.findIndex((v2) => v2.round === v.round) === i
        );

        const fruitCount = [
          {
            id: "1",
            fruit: "Orange",
            count: `${data.filter((el) => el.fruit === "Orange").length}`,
          },
          {
            id: "2",
            fruit: "Lemon",
            count: `${data.filter((el) => el.fruit === "Lemon").length}`,
          },
          {
            id: "3",
            fruit: "Grape",
            count: `${data.filter((el) => el.fruit === "Grape").length}`,
          },
          {
            id: "4",
            fruit: "Apple",
            count: `${data.filter((el) => el.fruit === "Apple").length}`,
          },
          {
            id: "5",
            fruit: "Strawberry",
            count: `${data.filter((el) => el.fruit === "Strawberry").length}`,
          },
          {
            id: "6",
            fruit: "Mango",
            count: `${data.filter((el) => el.fruit === "Mango").length}`,
          },
          {
            id: "7",
            fruit: "Watermelon",
            count: `${data.filter((el) => el.fruit === "Watermelon").length}`,
          },
          {
            id: "8",
            fruit: "Cherry",
            count: `${data.filter((el) => el.fruit === "Cherry").length}`,
          },
        ];

        createExcelFile(data, fruitCount);
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
//6 avocado
//7 watermelon
//8 cherry
