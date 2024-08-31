import { Table } from "react-bootstrap";
import UserNavBar from "../components/UserNavbar";
import axios from "axios";
import { useEffect, useState } from "react";

function AttemptedTests() {
  const loggedInUserEmail = localStorage.getItem("email");

  const [resultData, setResultData] = useState();
  const getUserResultData = async () => {
    try {
      const { data } = await axios.post("/api/v1/results/get-user-result", {
        email: loggedInUserEmail,
      });

      setResultData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserResultData();
  }, []);

  return (
    <>
      <UserNavBar />
      {resultData?.success === false && (
        <div class="result-message">{resultData.message}</div>
      )}

      {resultData?.success === true && (
        <div>
          <h3 className="all-questions-title">Result: </h3>
          <Table bordered className="view-questions-table">
            <thead className="table-header">
              <tr>
                <th>S. No.</th>
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
    </>
  );
}

export default AttemptedTests;
