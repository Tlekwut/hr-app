import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockKeyhole, faAddressCard, faKey } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Swal from "sweetalert2";

const Index = () => {
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    const [credentials, setCredentials] = useState({
        employee_id: "",
        password: "",
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        try {
            const url = `${API_URL}/api/login`;
            console.log("Login URL:", url);

            Swal.fire({
                title: "กำลังเข้าสู่ระบบ...",
                text: "กรุณารอสักครู่",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await axios.post(url, credentials);

            console.log("Login Success:", response.data);

            localStorage.setItem("token", response.data.token);
            Swal.close();
            
            navigate("/login/pin");

        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            Swal.fire({
                icon: "warning  ",
                title: "เข้าสู่ระบบล้มเหลว!",
                text: error.response?.data?.error || "Unknown Error",
                confirmButtonText: "ลองใหม่อีกครั้ง",
            });
        }
    };


    return (
        <Container fluid className="bg-login m-0 p-0">
            <Row className="m-1 d-flex justify-content-center">
                <Col xs="auto" md="auto" lg="auto">
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Form>
                                <Row className="m-0 p-0">
                                    <Form.Group className="mb-3" controlId="employee_id">
                                        <Form.Label>รหัสพนักงาน</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text id="employeeID">
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                name="employee_id"
                                                value={credentials.employee_id}
                                                onChange={handleChange}
                                                placeholder="กรุณากรอกรหัสพนักงาน"
                                                aria-label="employeeID"
                                                aria-describedby="employeeID"
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className="m-0 p-0">
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>รหัสผ่าน</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text id="password">
                                                <FontAwesomeIcon icon={faKey} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={credentials.password}
                                                onChange={handleChange}
                                                placeholder="กรุณากรอกรหัสผ่าน"
                                                aria-label="password"
                                                aria-describedby="password"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className="m-0 p-0">
                                    <Col className="d-flex justify-content-end">
                                        <Button variant="primary" onClick={handleLogin}>
                                            <FontAwesomeIcon icon={faUnlockKeyhole} className="me-2" />
                                            Login
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Index;
