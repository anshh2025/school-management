"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [roll, setRoll] = useState("");
  const [search, setSearch] = useState("");

  const addStudent = () => {
    if (!name || !studentClass || !roll) return;

    setStudents([...students, { name, studentClass, roll }]);

    setName("");
    setStudentClass("");
    setRoll("");
  };

  const deleteStudent = (index: number) => {
    const newList = students.filter((_, i) => i !== index);
    setStudents(newList);
  };

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

        <Button onClick={addStudent} style={{ width: "100%" }}>
          Add Student
        </Button>

        {/* Search */}
        <h3 style={{ marginTop: "15px" }}>Search</h3>
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