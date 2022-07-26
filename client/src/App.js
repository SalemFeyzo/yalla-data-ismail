import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Table,
  Form,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { format, parseISO, startOfDay, endOfDay, addHours } from "date-fns";
import { ar } from "date-fns/locale";
import downloadExcel from "./utils/excelUitl";
import Counts from "./Counts";

function App() {
  const today = new Date();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [date, setDate] = useState(today);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/rounds?from=${addHours(
            startOfDay(date),
            1
          ).toISOString()}&to=${addHours(endOfDay(date), 1).toISOString()}`
        );
        if (data.msg) setError(data.msg);
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    getData();
  }, [date]);
  return (
    <Container>
      <Container className="p-3">
        <Row>
          <Col>
            {(!error || !loading) && (
              <Button onClick={() => downloadExcel(data)} variant="success">
                تنزيل كملف اكسيل
              </Button>
            )}
          </Col>
          <Col>
            <Form.Control
              type="date"
              onChange={(e) => {
                setDate(e.target.valueAsDate);
                setLoading(true);
                setError("");
              }}
            />
          </Col>
        </Row>
      </Container>

      {error ? (
        <Row>
          <Alert variant="danger" dir="rtl">
            {error}
          </Alert>
        </Row>
      ) : loading ? (
        <Container>
          <Row className="d-flex justify-content-center align-items-center p-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Row>
        </Container>
      ) : (
        <Container dir="rtl">
          <Counts data={data} />
          <h1>الجولات: </h1>
          <Table striped bordered hover responsive dir="rtl" id="rounds-table">
            <thead>
              <tr>
                <th>الجولة</th>
                <th>الفاكهة</th>
                <th>الوقت والتاريخ</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.roundNum}</td>
                  <td>{item.fruitName}</td>
                  <td>
                    {format(
                      parseISO(new Date(item.createdAt).toISOString()),
                      "yyyy-MM-dd hh:mm:ss aaaaa",
                      { locale: ar }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </Container>
  );
}

export default App;
