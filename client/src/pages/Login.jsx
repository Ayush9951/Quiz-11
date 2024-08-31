import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Logo from "../images/login.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import axios from "axios";

import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const handleLoginInputChange = (e) => {
    setLoginInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/users/login", {
        email: loginInput.email,
        password: loginInput.password,
      });

      console.log(data);

      if (data.success == false) {
        toast.error(data.message);
      } else {
        toast.success(data.message);

        setTimeout(() => {
          if (data.user.email === "admin@gmail.com") {
            navigate("/admin");
          } else {
            navigate("/user");
            localStorage.setItem("email", data.user.email);
          }
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [registerInput, setRegisterInput] = useState({
    email: "",
    name: "",
    branch: "CSE", // default value
    password: "",
    confirmPassword: "",
  });

  const handleRegisterInputChange = (e) => {
    setRegisterInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/v1/users/register", {
      ...registerInput,
    });

    console.log(data);

    if (data.success == false) {
      toast.error(data.message);
    } else {
      toast.success(data.message);

      setRegisterInput({
        email: "",
        name: "",
        branch: "",
        password: "",
        confirmPassword: "",
      });

      handleClose();
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="form-container">
          <h1 className="login-title">Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={loginInput.email}
                onChange={handleLoginInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={loginInput.password}
                onChange={handleLoginInputChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="login-btn">
              Login
            </Button>
            <p className="create-account" onClick={handleShow}>
              Create a new account ?
            </p>
          </form>
        </div>
        <div>
          <img src={Logo} className="login-image" alt="login" />
        </div>
      </div>

      {/* Register */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={registerInput.email}
                onChange={handleRegisterInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={registerInput.name}
                onChange={handleRegisterInputChange}
              />
            </Form.Group>
            <Form.Label>Branch</Form.Label>
            <Form.Select
              className="mb-3"
              name="branch"
              value={registerInput.branch}
              onChange={handleRegisterInputChange}
            >
              <option value="CSE">Computer Science Engineering</option>
              <option value="Electrical">Electrical Engineering</option>
              <option value="Civil">Civil Engineering</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={registerInput.password}
                onChange={handleRegisterInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={registerInput.confirmPassword}
                onChange={handleRegisterInputChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="register-btn">
              Register
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

export default Login;
