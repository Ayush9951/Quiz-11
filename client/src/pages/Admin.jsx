import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

import Logo from "../images/login.png";
import Questions from "../images/questions.png";
import addQuestion from "../images/add_question.png";
import Results from "../images/results.png";
import createTest from "../images/create_test.png";
import ViewResults from "./ViewResults";

function Admin() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [hideAddQuestionTag, setHideAddQuestionTag] = useState(true);

  const [questionInput, setQuestionInput] = useState({
    title: "",
    description: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    branch: "CSE",
    subject: "Java",
    answer: "1",
  });

  const handleQuestionInputChange = (e) => {
    setQuestionInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQuestionInputSubmit = async (e) => {
    e.preventDefault();

    console.log(questionInput);

    const options = [
      questionInput.option1,
      questionInput.option2,
      questionInput.option3,
      questionInput.option4,
    ];

    const { data } = await axios.post("/api/v1/questions/add-question", {
      title: questionInput.title,
      description: questionInput.description,
      options,
      branch: questionInput.branch,
      subject: questionInput.subject,
      answer: questionInput.answer,
    });

    if (data.success == false) {
      toast.error(data.message);
    } else {
      toast.success(data.message);

      setQuestionInput({
        title: "",
        description: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        branch: "",
        subject: "",
        answer: "",
      });
    }
  };

  // view questions
  const handleViewQuestions = () => {
    navigate("/admin/viewQuestions");
    setHideAddQuestionTag(false);
  };

  // create test

  const handleOpenCreateTestPage = () => {
    navigate("/admin/createTest");
  };

  // view results model
  const [showResults, setShowResults] = useState(false);

  const handleShowResultsClose = () => {
    setShowResults(false);
  };
  const handleShowResultsOpen = () => {
    setShowResults(true);
    getAllTestsData();
  };

  const [allTests, setAllTests] = useState([]);

  const getAllTestsData = async () => {
    const { data } = await axios.get("/api/v1/tests/get-all-tests");

    setAllTests(data.allTests);
  };

  // view results
  const handleViewResults = (testKey) => {
    setShowResults(false);
    localStorage.setItem("testKey", testKey);
    navigate("/admin/viewResults");
  };

  return (
    <>
      <div>
        <NavBar
          handleShow={handleShow}
          handleViewQuestions={handleViewQuestions}
          hideAddQuestionTag={hideAddQuestionTag}
        />

        {showResults === false && (
          <div className="card-container">
            <Card style={{ width: "18rem" }}>
              <Card.Img className="card-img" variant="top" src={addQuestion} />
              <Card.Body>
                <Card.Text>Add a new Question</Card.Text>
                <Button variant="primary" onClick={handleShow}>
                  Add Question
                </Button>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img className="card-img" variant="top" src={Questions} />
              <Card.Body>
                <Card.Text>View All Questions</Card.Text>
                <Button variant="primary" onClick={handleViewQuestions}>
                  View Questions
                </Button>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img className="card-img" variant="top" src={createTest} />
              <Card.Body className="card-body">
                <Card.Text>Create a new Test</Card.Text>
                <Button variant="primary" onClick={handleOpenCreateTestPage}>
                  Create Test
                </Button>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Img className="card-img" variant="top" src={Results} />
              <Card.Body>
                <Card.Text>View Results</Card.Text>
                <Button variant="primary" onClick={handleShowResultsOpen}>
                  Check Results
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "20px" }}>Add Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleQuestionInputSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter question title"
                  name="title"
                  value={questionInput.title}
                  onChange={handleQuestionInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter question description"
                  name="description"
                  value={questionInput.description}
                  onChange={handleQuestionInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Options</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter option 1"
                  className="mb-2"
                  name="option1"
                  value={questionInput.option1}
                  onChange={handleQuestionInputChange}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter option 2"
                  className="mb-2"
                  name="option2"
                  value={questionInput.option2}
                  onChange={handleQuestionInputChange}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter option 3"
                  className="mb-2"
                  name="option3"
                  value={questionInput.option3}
                  onChange={handleQuestionInputChange}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter option 4"
                  className="mb-2"
                  name="option4"
                  value={questionInput.option4}
                  onChange={handleQuestionInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Branch</Form.Label>
                <Form.Select
                  className="mb-3"
                  name="branch"
                  value={questionInput.branch}
                  onChange={handleQuestionInputChange}
                >
                  <option value="CSE">Computer Science Engineering</option>
                  <option value="Electrical">Electrical Engineering</option>
                  <option value="Civil">Civil Engineering</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Select
                  className="mb-3"
                  name="subject"
                  value={questionInput.subject}
                  onChange={handleQuestionInputChange}
                >
                  <option value="Java">Java</option>
                  <option value="DBMS">DBMS</option>
                  <option value="Operating System">Operating System</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Answer</Form.Label>
                <Form.Select
                  className="mb-3"
                  name="answer"
                  value={questionInput.answer}
                  onChange={handleQuestionInputChange}
                >
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">Option 4</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Question
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showResults} onHide={handleShowResultsClose}>
          <Modal.Header closeButton>
            <Modal.Title>View Results</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {allTests.map((test) => {
              return (
                <div class="view-all-results-container">
                  <div>
                    <div>
                      {test.title} - ({test.subject})
                    </div>
                    <div>Key: {test.testKey}</div>
                  </div>
                  <div>
                    <Button onClick={() => handleViewResults(test.testKey)}>
                      View Result
                    </Button>
                  </div>
                </div>
              );
            })}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleShowResultsClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Admin;
