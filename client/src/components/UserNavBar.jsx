import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useNavigate } from "react-router-dom";

function UserNavBar() {
  const navigate = useNavigate();

  const handleUserHome = () => {
    navigate("/user");
  };

  const handleAttemptedTests = () => {
    navigate("/user/attemptedTests");
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="navbar-title">Quiz 11</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleUserHome}>Home</Nav.Link>
            <Nav.Link onClick={handleAttemptedTests}>Test Attempts</Nav.Link>
          </Nav>
        </Container>
        <Button variant="light">Logout</Button>
      </Navbar>
    </div>
  );
}

export default UserNavBar;
