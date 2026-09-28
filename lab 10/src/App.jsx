import { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Card,
  Button,
  Spinner
} from "react-bootstrap";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getServerMessage = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/message");
      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server.");
    }

    setLoading(false);
  };

  useEffect(() => {
    getServerMessage();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Social Media App</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Profile</Nav.Link>
            <Nav.Link href="#">Messages</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Card className="mx-auto" style={{ maxWidth: "750px" }}>
          <Card.Header className="text-center">
            <h5 className="mb-0">Feed / Connection Test</h5>
          </Card.Header>

          <Card.Body className="text-center">
            <h5>Response from Server:</h5>

            {loading ? (
              <Spinner animation="border" />
            ) : (
              <p>{message}</p>
            )}

            <Button
              variant="primary"
              onClick={getServerMessage}
            >
              Refresh Feed
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default App;