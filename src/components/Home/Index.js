import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">HR APP</Navbar.Brand>
          <Nav className="ms-auto">
            {token ? (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="primary" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5 text-center">
        <Row>
          <Col>
            <h1>Welcome to HR APP</h1>
            <p>ระบบสำหรับจัดการข้อมูลของพนักงาน HR Service</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="info" onClick={() => navigate("/add-user")}>
              เพิ่มพนักงาน
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Index;
