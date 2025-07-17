import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "students"));
      setStudents(snapshot.docs.map((doc) => doc.data()));
    };
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "30px", fontSize: "28px", color: "#1a202c" }}>All Students</h2>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px #1a202c",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <thead style={{ backgroundColor: "#1a202c", color: "#fff" }}>
            <tr>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Fees Paid</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={tableCellStyle}>{s.name}</td>
                <td style={tableCellStyle}>{s.email}</td>
                <td style={tableCellStyle}>{s.feesPaid ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  padding: "15px",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "16px",
};

const tableCellStyle = {
  padding: "15px",
  fontSize: "15px",
  color: "#2d3748",
};

export default AllStudents;
