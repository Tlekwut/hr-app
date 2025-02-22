import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Password } from "primereact/password";
import Swal from "sweetalert2";
import axios from "axios";

const ChangePassword = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(localStorage.getItem("Name") || ""); 
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login"); 
    }
  }, [navigate]); 
  
  const validateForm = () => {
    if (!password || !confirmPassword || !name || !phone || !address) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน!",
        text: "จำเป็นต้องกรอกชื่อพนักงาน, เบอร์โทรศัพท์, ที่อยู่ และรหัสผ่าน",
      });
      return false;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน!",
        text: "กรุณากรอกรหัสผ่านให้ตรงกัน",
      });
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const url = `${API_URL}/api/update-profile`;
      Swal.fire({
        title: "กำลังบันทึกข้อมูล...",
        text: "กรุณารอสักครู่",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await axios.post(
        url,
        { password, name, phone, email, address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {

        // Swal.fire({
        //   icon: "success",
        //   title: "เปลี่ยนรหัสผ่านสำเร็จ!",
        //   text: "กรุณาเข้าสู่ระบบใหม่",
        // });
        // console.log(response);
        Swal.close();
        navigate("/change-pin");
      }
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
      <h2>เปลี่ยนรหัสผ่าน</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>รหัสผ่านใหม่</Form.Label>
          <div className="w-100">
            <Password
              className="w-100"
              value={password}
              placeholder="กรอกรหัสผ่านใหม่"
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
          <div className="w-100">
            <Password
              className="w-100"
              value={confirmPassword}
              placeholder="ยืนยันรหัสผ่านใหม่"
              onChange={(e) => setConfirmPassword(e.target.value)}
              toggleMask
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ชื่อพนักงาน</Form.Label>
          <Form.Control
            placeholder="ชื่อพนักงาน"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            readOnly // ✅ ชื่อพนักงานไม่ให้แก้ไข
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>เบอร์โทรศัพท์</Form.Label>
          <Form.Control
            placeholder="เบอร์โทรศัพท์"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ที่อยู่</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" onClick={handleChangePassword}>
            บันทึกข้อมูล
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ChangePassword;
