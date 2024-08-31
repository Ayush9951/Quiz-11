import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Table } from "react-bootstrap";

function ViewResults() {
  const testKey = localStorage.getItem("testKey");

  const [resultData, setResultData] = useState({});
  const getAllResultsByTestId = async () => {
    try {
      const { data } = await axios.get(`/api/v1/results/get-result/${testKey}`);

      setResultData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllResultsByTestId();
  }, []);

  return (
    <div>
      <NavBar />
      {resultData.success === false && (
        <div class="result-message">{resultData.message}</div>
      )}

      {resultData.success === true && (
        <div>
          <h3 className="all-questions-title">Result: </h3>
          <Table bordered className="view-questions-table">
            <thead className="table-header">
              <tr>
                <th>S. No.</th>
                <th>Student Name</th>
                <th>Title</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="table-container">
              {resultData.result.map((result, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{result.name}</td>
                    <td>{result.title}</td>
                    <td>{result.marks}</td>
                    <td>{result.submittedAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ViewResults;
