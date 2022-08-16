import { Container, Table } from "react-bootstrap";

const Counts = ({ data }) => {
  const counts = [
    {
      fruit: "برتقال",
      result: `${data.filter((el) => el.fruitName === "برتقال").length}`,
    },
    {
      fruit: "ليمون",
      result: `${data.filter((el) => el.fruitName === "ليمون").length}`,
    },
    {
      fruit: "عنب",
      result: `${data.filter((el) => el.fruitName === "عنب").length}`,
    },
    {
      fruit: "تفاح",
      result: `${data.filter((el) => el.fruitName === "تفاح").length}`,
    },
    {
      fruit: "فريز",
      result: `${data.filter((el) => el.fruitName === "فريز").length}`,
    },
    {
      fruit: "منجا",
      result: `${data.filter((el) => el.fruitName === "منجا").length}`,
    },
    {
      fruit: "بطيخ",
      result: `${data.filter((el) => el.fruitName === "بطيخ").length}`,
    },
    {
      fruit: "كرز",
      result: `${data.filter((el) => el.fruitName === "كرز").length}`,
    },
  ];
  return (
    <Container>
      <Table striped bordered hover responsive dir="rtl" id="rounds-table">
        <thead>
          <tr>
            {counts.map((c) => (
              <th key={c.fruit}>{c.fruit}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {counts.map((c) => (
              <td key={c.fruit}>{c.result}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Counts;
