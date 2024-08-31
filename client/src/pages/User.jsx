import UserNavBar from "../components/UserNavbar";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import addQuestionLogo from "../images/add_question.png";

import { useState } from "react";
import { Form } from "react-bootstrap";

import toast from "react-hot-toast";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [testKey, setTestKey] = useState("");

  const handleInputTestKey = (e) => {
    setTestKey(e.target.value);
  };

  const handleStartTest = async () => {
    const key = testKey;

    if (key.length == 0) {
      toast.error("Please enter key");
    } else {
      // checking if key is valid or not

      try {
        const { data } = await axios.get(`/api/v1/tests/checkTestKey/${key}`);

        if (data.success == false) {
          toast.error(data.message);
        } else if (data.success == true) {
          // need to check if user already given test or not
          const { data } = await axios.post(
            "/api/v1/results/check-test-attempt",
            {
              email: localStorage.getItem("email"),
              testKey: key,
            }
          );

          if (data.success == false) {
            toast.error(data.message);
          } else if (data.success == true) {
            navigate("/user/giveTest");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <UserNavBar />
      <div className="card-container">
        <div>
          <img src={addQuestionLogo} className="login-image" alt="login" />
        </div>
        <Card style={{ width: "18rem" }}>
          <Card.Img className="card-img" variant="top" src={addQuestionLogo} />
          <Card.Body>
            <Card.Text>
              You can give test here. Just click below button and enter test Key
              to give test.
            </Card.Text>
            <Button className="card-btn" variant="primary" onClick={handleShow}>
              Give Test
            </Button>
          </Card.Body>
        </Card>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Test Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              onChange={handleInputTestKey}
              placeholder="Enter test key here.."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleStartTest}>
            Start
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default User;
