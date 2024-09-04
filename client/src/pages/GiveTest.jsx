import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function GiveTest() {
  const navigate = useNavigate();

  const testKey = localStorage.getItem("testKey");

  const [time, setTime] = useState(0);

  const [questions, setQuestions] = useState([]);

  const getTestDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/tests/get-test/${testKey}`);

      console.log(data);
      setTime(data?.test[0]?.time);
      setQuestions(data?.test[0]?.questions);

      //storing test details in localStorage
      localStorage.setItem("test", JSON.stringify(data?.test[0]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTestDetails();
  }, []);

  const [options, setOptions] = useState({});

  const handleOptionChoose = (e) => {
    console.log(e.target.name + " : " + e.target.value);
    setOptions((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateMarks = () => {
    let score = 0;

    questions.map((question, index) => {
      if (question.answer === options[`question_${index + 1}_option`]) {
        score++;
      }
    });

    const percentage = (score / questions.length) * 100;

    return percentage;
  };

  const handleTestSubmit = async () => {
    const marks = calculateMarks();

    const { title, testKey } = JSON.parse(localStorage.getItem("test"));

    const { data } = await axios.post("/api/v1/results/submit-test", {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      marks,
      title,
      submittedAt: new Date().toLocaleDateString(),
      testKey,
    });

    console.log(data);

    navigate("/user");
  };

  return (
    <>
      <div>
        <Navbar className="give-test-navbar" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Quiz 11</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Time: {time} mins</Nav.Link>
            </Nav>
          </Container>
          <Button
            variant="warning"
            className="quiz-submit-btn"
            onClick={handleTestSubmit}
          >
            Submit
          </Button>
          <Button variant="light">Logout</Button>
        </Navbar>

        <div className="">
          <div className="">
            <ol>
              {questions.map((question, index) => {
                return (
                  <li key={index} className="question-container">
                    <div>{question.title}</div>
                    <div>{question.description}</div>
                    <ul>
                      {question.options.map((option, optionIndex) => {
                        return (
                          <div key={option}>
                            <input
                              type="radio"
                              name={`question_${index + 1}_option`}
                              value={optionIndex + 1}
                              onChange={handleOptionChoose}
                              className="option-radio-btn"
                            />
                            <label htmlFor="">{option}</label>
                          </div>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default GiveTest;
