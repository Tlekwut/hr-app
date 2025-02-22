# HR App - Frontend (React)

HR App เป็นระบบจัดการทรัพยากรบุคคลที่ใช้ React.js สำหรับ Frontend และ Laravel สำหรับ Backend

📌 คุณสมบัติของระบบ

ระบบล็อกอินด้วย JWT Authentication

ระบบเปลี่ยนรหัสผ่านครั้งแรก

รองรับการล็อกอินด้วย Biometric PIN

ระบบจัดการโปรไฟล์พนักงาน

ระบบสะสมแต้มและแลกของรางวัล

🚀 การติดตั้งและใช้งาน
1. ติดตั้ง Dependencies
   npm install
2.ตั้งค่า Environment
   สร้างไฟล์ .env และกำหนดค่าดังนี้: REACT_APP_API_URL=http://localhost:8000
3. รันโปรเจค
   npm start


🔑 การใช้งานระบบ

1️⃣ ล็อกอินเข้าสู่ระบบ
กรอกรหัสพนักงาน และรหัสผ่าน

หากเป็นครั้งแรก ระบบจะบังคับให้เปลี่ยนรหัสผ่านและกรอกข้อมูลส่วนตัว

สามารถเลือกล็อกอินด้วย PIN หรือ Biometric ได้

2️⃣ การเปลี่ยนรหัสผ่าน

เมื่อเข้าสู่ระบบครั้งแรก ระบบจะให้เปลี่ยนรหัสผ่านใหม่

ต้องกรอก ชื่อ, เบอร์โทรศัพท์, ที่อยู่ ก่อนใช้งาน

3️⃣ จัดการโปรไฟล์

อัปเดตข้อมูลส่วนตัวได้ เช่น ชื่อ, อีเมล, ที่อยู่


