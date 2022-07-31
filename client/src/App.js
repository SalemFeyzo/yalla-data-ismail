import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/files");
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    getData();
  }, []);

  if (loading === true) {
    return (
      <div className="App">
        <header className="App-header"></header>
        <p>Loading...</p>
      </div>
    );
  } else if (error) {
    return <p>{error}</p>;
  } else {
    return (
      <div className="App" dir="rtl">
        <header className="App-header">
          <ul className="list">
            {data.map((i) => {
              return (
                <li key={i.id} className="list-item">
                  <h5 dir="ltr">{i.name}</h5>{" "}
                  <h6
                    className="btn"
                    onClick={async () => {
                      try {
                        const { data } = await axios.get(`/download/${i.id}`, {
                          responseType: "blob",
                        });
                        const url = window.URL.createObjectURL(
                          new Blob([data])
                        );
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", `${i.name}`);
                        document.body.appendChild(link);
                        link.click();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    تنزيل
                  </h6>
                </li>
              );
            })}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
