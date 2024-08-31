import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";

function NavBar(props) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/admin");
  };

  const handleOpenCreateTestPage = () => {
    navigate("/admin/createTest");
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="navbar-title">Quiz 11</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleHomePage}>Home</Nav.Link>

            {props.hideAddQuestionTag === true && (
              <Nav.Link onClick={props.handleShow}>Add Questions</Nav.Link>
            )}
            <Nav.Link onClick={props.handleViewQuestions}>
              View Questions
            </Nav.Link>
            <Nav.Link onClick={handleOpenCreateTestPage}>Create Test</Nav.Link>
          </Nav>
          <Button variant="light">Logout</Button>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
