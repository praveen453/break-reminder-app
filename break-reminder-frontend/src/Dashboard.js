import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReminderForm from "./ReminderForm";
import { motion } from "framer-motion";

function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5050/api/reminders";
  const token = localStorage.getItem("token");

  const convertTo12Hour = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);
    let amPm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minutes} ${amPm}`;
  };

  const fetchReminders = useCallback(async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setReminders(data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      setError("Failed to load reminders. Please try again.");
    }
  }, [API_BASE_URL, token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchReminders();
    }
  }, [token, navigate, fetchReminders]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#1976d2", fontWeight: "bold" }}>Dashboard</h1>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer" }}>
          Logout
        </motion.button>
      </div>
      <ReminderForm setReminders={fetchReminders} />
      <h3 style={{ color: "#333", marginTop: "20px" }}>Your Reminders:</h3>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {reminders.length > 0 ? (
          reminders.map((reminder, index) => (
            <motion.li key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}
              style={{ backgroundColor: "#f3f3f3", padding: "10px", borderRadius: "5px", marginBottom: "8px", fontSize: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
              <strong>{convertTo12Hour(reminder.time)}</strong>
              <span>{reminder.message}</span>
            </motion.li>
          ))
        ) : (
          <p style={{ textAlign: "center", fontStyle: "italic" }}>No reminders found.</p>
        )}
      </ul>
    </motion.div>
  );
}

export default Dashboard;
