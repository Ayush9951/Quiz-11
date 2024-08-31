import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";

import axios from "axios";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import toast from "react-hot-toast";

function ViewQuestions() {
  const [questions, setQuestions] = useState([]);

  const getAllQuestions = async () => {
    const { data } = await axios.get("/api/v1/questions/get-all-questions");

    setQuestions(data.allQuestions);

    console.log(data);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editQuestionInput, setEditQuestionInput] = useState({});

  const handleEditQuestion = (question) => {
    handleShow();

    setEditQuestionInput({
      id: question._id,
      title: question.title,
      description: question.description,
      option1: question.options[0],
      option2: question.options[1],
      option3: question.options[2],
      option4: question.options[3],
      branch: question.branch,
      subject: question.subject,
      answer: question.answer,
    });
  };

  const handleEditQuestionInputChange = (e) => {
    setEditQuestionInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditQuestionSubmit = async (e) => {
    e.preventDefault();

    const questionId = editQuestionInput.id;

    try {
      const { data } = await axios.put(
        `/api/v1/questions/edit-question/${questionId}`,
        {
          ...editQuestionInput,
        }
      );

      if (data.success === true) {
        toast.success(data.message);
      }

      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [removeClick, setRemoveClick] = useState(false);

  const handleRemoveQuestion = async (question) => {
    const questionId = question._id;

    try {
      const { data } = await axios.delete(
        `/api/v1/questions/delete-question/${questionId}`
      );

      toast.success(data.message);

      setRemoveClick(!removeClick);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, [show, removeClick]);

  return (
    <>
      <NavBar />
      <h3 className="all-questions-title">Questions: </h3>
      <Table bordered className="view-questions-table">
        <thead className="table-header">
          <tr>
            <th>S. No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Branch</th>
            <th>Subject</th>
            <th>Modify</th>
            <th>Remove</th>
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
                    variant="secondary"
                    onClick={() => handleEditQuestion(question)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleRemoveQuestion(question)}>
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditQuestionSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question title"
                name="title"
                value={editQuestionInput.title}
                onChange={handleEditQuestionInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question description"
                name="description"
                value={editQuestionInput.description}
                onChange={handleEditQuestionInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Options</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter option 1"
                className="mb-2"
                name="option1"
                value={editQuestionInput.option1}
                onChange={handleEditQuestionInputChange}
              />
              <Form.Control
                type="text"
                placeholder="Enter option 2"
                className="mb-2"
                name="option2"
                value={editQuestionInput.option2}
                onChange={handleEditQuestionInputChange}
              />
              <Form.Control
                type="text"
                placeholder="Enter option 3"
                className="mb-2"
                name="option3"
                value={editQuestionInput.option3}
                onChange={handleEditQuestionInputChange}
              />
              <Form.Control
                type="text"
                placeholder="Enter option 4"
                className="mb-2"
                name="option4"
                value={editQuestionInput.option4}
                onChange={handleEditQuestionInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Branch</Form.Label>
              <Form.Select
                className="mb-3"
                name="branch"
                value={editQuestionInput.branch}
                onChange={handleEditQuestionInputChange}
              >
                <option value="CSE">Computer Science</option>
                <option value="Electrical">Electrical</option>
                <option value="Civil">Civil</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Select
                className="mb-3"
                name="subject"
                value={editQuestionInput.subject}
                onChange={handleEditQuestionInputChange}
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
                value={editQuestionInput.answer}
                onChange={handleEditQuestionInputChange}
              >
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit">
              Save
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewQuestions;
