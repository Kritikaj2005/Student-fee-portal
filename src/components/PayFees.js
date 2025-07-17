import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const PayFees = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return alert("Not logged in");

    const ref = doc(db, "students", user.uid);
    await updateDoc(ref, {
      feesPaid: true,
    });

    alert("Payment successful!");
    navigate("/profile");
  };

  useEffect(() => {
    if (!auth.currentUser) navigate("/profile");
  }, [navigate]);

  return (
    <div
  style={{
    padding: "40px",
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginTop: "40px",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    cursor: "default",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
    e.currentTarget.style.transform = "translateY(-3px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>

      <h2 style={{ marginBottom: "30px", color: "#1a202c" }}>Pay Fees</h2>
      <form onSubmit={handlePayment} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", color: "#333", fontWeight: 500 }}>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", color: "#333", fontWeight: 500 }}>
          Payment Method:
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          >
            <option value="UPI">UPI</option>
            <option value="Card">Credit/Debit Card</option>
            <option value="Netbanking">Netbanking</option>
          </select>
        </label>

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#3182ce",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PayFees;
