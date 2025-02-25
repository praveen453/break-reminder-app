import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReminderForm from "./ReminderForm";

function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5050/api/reminders";
  const token = localStorage.getItem("token");

  // ✅ Convert 24-hour time to 12-hour format
  const convertTo12Hour = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);
    let amPm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 to 12 for midnight
    return `${hour}:${minutes} ${amPm}`;
  };

  // ✅ Fetch reminders from the backend (using useCallback)
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

  // ✅ Redirect to login if no token & fetch reminders when mounted
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchReminders();
    }
  }, [token, navigate, fetchReminders]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#1976d2" }}>Dashboard</h1>

      {/* ✅ Logout Button */}
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          style={{
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* ✅ Reminder Form */}
      <ReminderForm setReminders={fetchReminders} />

      {/* ✅ Display Reminders */}
      <h3 style={{ color: "#333" }}>Your Reminders:</h3>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {reminders.length > 0 ? (
          reminders.map((reminder, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#f3f3f3",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "8px",
                fontSize: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>{convertTo12Hour(reminder.time)}</strong>
              <span>{reminder.message}</span>
            </li>
          ))
        ) : (
          <p>No reminders found.</p>
        )}
      </ul>
    </div>
  );
}

export default Dashboard; 