import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { InputOtp } from "primereact/inputotp";
import axios from "axios";
import Swal from "sweetalert2";

function ChangePin() {

    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [pin, setPin] = useState("");

    useEffect(() => {
        if (pin.length === 6) {
            onSubmit();
        }
    }, [pin]);

    const handleAddNumber = (num) => {
        if (pin.length < 6) {
            setPin(pin + num);
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
    };

    const handleEnter = () => {
        if (pin.length === 6) {
            if (onSubmit) {
                onSubmit(pin);
            }
        } else {
            Swal.fire({
                title: "กรุณากรอก PIN 6 หลัก",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const onSubmit = async () => {
        try {
            const url = `${API_URL}/api/update-pin`;
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found!");
                alert("กรุณาเข้าสู่ระบบก่อน");
                return;
            }

            Swal.fire({
                title: "กำลังเข้าสู่ระบบ...",
                text: "กรุณารอสักครู่",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await axios.post(url,
                { pin }, // ส่ง PIN ไปใน Body
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Login Success:", response.data);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "เข้าสู่ระบบสำเร็จ!",
                    text: response.data.message,
                });

                localStorage.setItem("Name", response.data.user.name);
                Swal.close();
                navigate("/dashboard");

            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            Swal.fire({
                icon: "warning",
                title: "เข้าสู่ระบบล้มเหลว!",
                text: error.response?.data?.error || "Unknown Error",
                confirmButtonText: "ลองใหม่อีกครั้ง",
            });
            setPin("");
        }

    }
    return (
        <>
            <Container fluid className="bg-login m-0 p-0">
                <Row className="m-1 d-flex justify-content-center">
                    <Col xs="12" md="12" lg="12">
                        <h2 className="text-center mb-2">แก้ไข PIN</h2>
                    </Col>
                    <Col xs="12" md="12" lg="12">
                        <div className="d-flex justify-content-center mb-3">
                            <InputOtp
                                value={pin}
                                onChange={(e) => setPin(e.value)}
                                length={6}
                                autoFocus
                                className="text-center my-3"
                                style={{ fontSize: "20px" }}
                            />
                        </div>

                    </Col>

                    <Col xs="8" md="8" lg="8">
                        <div className="d-flex flex-column">
                            {[["7", "8", "9"], ["4", "5", "6"], ["1", "2", "3"], ["del", "0", "enter"]].map((row, rowIndex) => (
                                <Row key={rowIndex} className="mb-2">
                                    {row.map((num) => (
                                        <Col key={num}>
                                            <Button
                                                variant={num === "enter" ? "success" : num === "del" ? "danger" : "primary"}
                                                className="w-100 p-3"
                                                onClick={() => {
                                                    if (num === "del") handleDelete();
                                                    else if (num === "enter") handleEnter();
                                                    else handleAddNumber(num);
                                                }}
                                            >
                                                {num === "del" ? <FontAwesomeIcon icon={faDeleteLeft} /> : num === "enter" ? <FontAwesomeIcon icon={faUnlockKeyhole} /> : num}
                                            </Button>
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default ChangePin