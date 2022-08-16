import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import * as XLSX from "xlsx";

const downloadExcel = (entryData) => {
  const rounds = entryData.map((item) => {
    return {
      الجولة: item.roundNum,
      الفاكهة: item.fruitName,
      "الوقت والتاريخ": format(
        parseISO(new Date(item.createdAt).toISOString()),
        "yyyy-MM-dd hh:mm:ss aaaaa",
        { locale: ar }
      ),
    };
  });
  const counts = [
    {
      الفاكهة: "برتقال",
      النتائج: `${entryData.filter((el) => el.fruitName === "برتقال").length}`,
    },
    {
      الفاكهة: "ليمون",
      النتائج: `${entryData.filter((el) => el.fruitName === "ليمون").length}`,
    },
    {
      الفاكهة: "عنب",
      النتائج: `${entryData.filter((el) => el.fruitName === "عنب").length}`,
    },
    {
      الفاكهة: "تفاح",
      النتائج: `${entryData.filter((el) => el.fruitName === "تفاح").length}`,
    },
    {
      الفاكهة: "فريز",
      النتائج: `${entryData.filter((el) => el.fruitName === "فريز").length}`,
    },
    {
      الفاكهة: "منجو",
      النتائج: `${entryData.filter((el) => el.fruitName === "منجو").length}`,
    },
    {
      الفاكهة: "بطيخ",
      النتائج: `${entryData.filter((el) => el.fruitName === "بطيخ").length}`,
    },
    {
      الفاكهة: "كرز",
      النتائج: `${entryData.filter((el) => el.fruitName === "كرز").length}`,
    },
  ];
  const workbook = XLSX.utils.book_new();
  const roundsWorksheet = XLSX.utils.json_to_sheet(rounds);
  XLSX.utils.book_append_sheet(workbook, roundsWorksheet, "الجولات");
  const countsWorksheet = XLSX.utils.json_to_sheet(counts);
  XLSX.utils.book_append_sheet(workbook, countsWorksheet, "الاحصائيات");

  //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  const today = new Date().toLocaleDateString();
  XLSX.writeFile(workbook, `${today.split("/").join("-")}.xlsx`);
};

export default downloadExcel;
