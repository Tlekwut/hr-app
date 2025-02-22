import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    
    const [formData, setFormData] = useState({
        employee_id: "",
        name: "",
        password: "",
        bio_data: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password.length < 6 || formData.bio_data.length !== 6) {
            Swal.fire({
                icon: "error",
                title: "ข้อมูลไม่ถูกต้อง!",
                text: "รหัสผ่านต้องมีอย่างน้อย 6 ตัว และรหัส PIN ต้องมี 6 หลัก",
            });
            return;
        }

        try {
            Swal.fire({
                title: "กำลังบันทึกข้อมูล...",
                text: "กรุณารอสักครู่",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await axios.post(`${API_URL}/api/register`, formData);

            Swal.fire({
                icon: "success",
                title: "ลงทะเบียนสำเร็จ!",
                text: "กำลังพาไปหน้าเข้าสู่ระบบ...",
                timer: 2000,
                showConfirmButton: false,
            });

            localStorage.setItem("token", response.data.token);
            Swal.close();
            navigate("/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: error.response?.data?.error || "Unknown Error",
            });
        }
    };

    return (
        <Container className="mt-5">
            <h2>ลงทะเบียนพนักงาน</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <Form.Label>รหัสพนักงาน</Form.Label>
                    <Form.Control
                        type="text"
                        name="employee_id"
                        placeholder="กรอกรหัสพนักงาน"
                        value={formData.employee_id}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>ชื่อพนักงาน</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="กรอกชื่อพนักงาน"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="กรอกรหัสผ่าน (ขั้นต่ำ 6 ตัวอักษร)"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>รหัส PIN (6 หลัก)</Form.Label>
                    <Form.Control
                        type="password"
                        name="bio_data"
                        placeholder="กรอกรหัส PIN 6 หลัก"
                        value={formData.bio_data}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                        ลงทะเบียน
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Register;
