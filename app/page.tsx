"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [roll, setRoll] = useState("");
  const [search, setSearch] = useState("");

  // Fetch initial students from backend on page load
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Add student to backend
  const addStudent = async () => {
    if (!name || !studentClass || !roll) return;

    const student = { name, studentClass, roll };

    try {
      // Send to backend
      await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      // Fetch updated list
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);

      // Clear inputs
      setName("");
      setStudentClass("");
      setRoll("");
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  // Delete student (UI only for now)
  const deleteStudent = (index: number) => {
    const newList = students.filter((_, i) => i !== index);
    setStudents(newList);
  };

  // Filter students for search
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f7fa",
        color: "black",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          width: "380px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>School Management</h2>

        {/* Add Student */}
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <Input
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        />
        <br />

        <Input
          placeholder="Roll No"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <br />

        <Button onClick={addStudent} style={{ width: "100%", marginTop: "10px" }}>
          Add Student
        </Button>

        {/* Search */}
        <h3 style={{ marginTop: "20px" }}>Search</h3>
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* List */}
        <h3 style={{ marginTop: "15px" }}>
          Students ({filteredStudents.length})
        </h3>

        {filteredStudents.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#eee",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              {s.name} - {s.studentClass} - {s.roll}
            </span>
            <Button
              onClick={() => deleteStudent(i)}
              style={{ background: "red" }}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}