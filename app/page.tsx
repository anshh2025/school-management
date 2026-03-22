"use client";
import { useState } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [roll, setRoll] = useState("");

  const addStudent = () => {
    if (!name || !studentClass || !roll) return;

    setStudents([...students, { name, studentClass, roll }]);

    setName("");
    setStudentClass("");
    setRoll("");
  };

  return (
    <main style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f5f7fa",
      color: "black"
    }}>
      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center" }}>School Management</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          placeholder="Roll No"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button
          onClick={addStudent}
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Add Student
        </button>

        <h3 style={{ marginTop: "15px" }}>Students</h3>

        {students.map((s, i) => (
          <div key={i} style={{
            background: "#eee",
            padding: "8px",
            marginTop: "5px",
            borderRadius: "5px"
          }}>
            {s.name} - {s.studentClass} - {s.roll}
          </div>
        ))}
      </div>
    </main>
  );
}