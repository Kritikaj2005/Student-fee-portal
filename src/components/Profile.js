import React, { useEffect, useState } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [feeStatus, setFeeStatus] = useState("Loading...");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  provider.setCustomParameters({
  prompt: "select_account",
});

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    setUser(user);

    const ref = doc(db, "students", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        name: user.displayName,
        email: user.email,
        feesPaid: false,
      });
      setFeeStatus("No");
      setName(user.displayName || "");
    } else {
      const data = snap.data();
      setFeeStatus(data.feesPaid ? "Yes" : "No");
      setName(data.name || user.displayName || "");
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
      const ref = doc(db, "students", auth.currentUser.uid);
      getDoc(ref).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || auth.currentUser.displayName || "");
          setFeeStatus(data.feesPaid ? "Yes" : "No");
        } else {
          setDoc(ref, {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            feesPaid: false,
          });
          setName(auth.currentUser.displayName || "");
          setFeeStatus("No");
        }
      });
    }
  }, []);

  const handleUpdateName = async () => {
    const uid = user.uid;
    const docRef = doc(db, "students", uid);
    await updateDoc(docRef, {
      name: name,
    });
    alert("Updated Name Successfully!");
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {!user ? (
         <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "30vh", // This makes the button vertically centered
    }}
  >
    <button
      onClick={login}
      style={{
        padding: "12px 24px",
        fontSize: "16px",
        backgroundColor: "#1a202c",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      Login with Google
    </button>
  </div>
      ) : (
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "500px",
            margin: "0 auto",
            boxShadow: "0 2px 10px #1a202c",
          }}
        >
          <h2 style={{ marginBottom: "10px", color: "#1a202c" }}>
            Welcome, {user.displayName}
          </h2>
          <p style={{ marginBottom: "20px", color: "#4a5568" }}>Email: {user.email}</p>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "10px",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <button
              onClick={handleUpdateName}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#1a202c",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Update Name
            </button>
          </div>

          <p style={{ display: "block", marginBottom: "20px", fontWeight: "500" }}>
            Fees Paid:{" "}
            <strong style={{ color: feeStatus === "Yes" ? "green" : "red" }}>
              {feeStatus}
            </strong>
          </p>
          <div style={{ display: "flex", flexDirection: "row",alignItems: "center",gap: "15px", marginTop: "10px" }}>
          {feeStatus === "No" && (
            <button
              onClick={() => navigate("/pay")}
              style={{
                padding: "8px 16px",
                backgroundColor: "#38a169",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                // marginBottom: "20px",
              }}
            >
              Pay Fees
            </button>
          )}

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#e53e3e",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            //   marginTop: "10px",
            }}
          >
            Logout
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
