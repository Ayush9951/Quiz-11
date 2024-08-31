import Form from "react-bootstrap/Form";
import NavBar from "../components/NavBar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useEffect, useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function CreateTest() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);

    navigate("/admin");
  };

  const handleShow = () => setShow(true);

  const [questions, setQuestions] = useState([]);

  const getAllQuestions = async () => {
    const { data } = await axios.get("/api/v1/questions/get-all-questions");

    setQuestions(data.allQuestions);
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  const [createTestInput, setCreateTestInput] = useState({
    title: "",
    time: "",
    branch: "CSE",
    subject: "Java",
  });

  const handleCreateTestInputChange = (e) => {
    setCreateTestInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const testQuestions = [];

  const handleAddQuestionInTest = (question) => {
    testQuestions.push(question);

    toast.success("Question Added");

    console.log(createTestInput);
  };

  const [testKey, setTestKey] = useState();

  const handleCreateTestSubmit = async (e) => {
    e.preventDefault();

    // adding selected questions in the createTestInput object to send to backend testController
    createTestInput.questions = testQuestions;

    try {
      const { data } = await axios.post("/api/v1/tests/create-test", {
        ...createTestInput,
      });

      if (data.success === false) {
        toast.error(data.message);
      } else {
        setCreateTestInput({
          title: "",
          time: "",
          branch: "CSE",
          subject: "Java",
        });
        setTestKey(data.testKey);
        handleShow();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />

      <Form className="create-test-container" onSubmit={handleCreateTestSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="create-test-heading">Test Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Test Title"
            name="title"
            value={createTestInput.title}
            onChange={handleCreateTestInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="create-test-heading">Test Timings:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Time (in Minutes)"
            name="time"
            value={createTestInput.time}
            onChange={handleCreateTestInputChange}
          />
        </Form.Group>
        <Form.Group className="flex-container">
          <div>
            <Form.Label className="create-test-heading">Branch:</Form.Label>
            <Form.Select
              name="branch"
              value={createTestInput.branch}
              onChange={handleCreateTestInputChange}
            >
              <option value="CSE">Computer Science Engineering</option>
              <option value="Electrical">Electrical Engineering</option>
              <option value="Civil">Civil Engineering</option>
              <option value="Others">Others</option>
            </Form.Select>
          </div>

          <div>
            <Form.Label className="create-test-heading">Subject:</Form.Label>
            <Form.Select
              name="subject"
              valu={createTestInput.title}
              onChange={handleCreateTestInputChange}
            >
              <option value="Java">Java</option>
              <option value="DBMS">DBMS</option>
              <option value="Operating System">Operating System</option>
              <option value="Others">Others</option>
            </Form.Select>
          </div>
        </Form.Group>

        <Button variant="primary" className="create-test-btn" type="submit">
          Create Test
        </Button>
      </Form>

      <Table bordered className="view-questions-table">
        <thead className="table-header">
          <tr>
            <th>S. No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Branch</th>
            <th>Subject</th>
            <th>Select Questions</th>
          </tr>
        </thead>
        <tbody className="table-container">
          {questions.map((question, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{question.title}</td>
                <td>{question.description}</td>
                <td>{question.branch}</td>
                <td>{question.subject}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleAddQuestionInTest(question)}
                  >
                    Add question
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Test Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Test Key: {testKey}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateTest;
