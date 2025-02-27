import React, { useState } from "react";

function ReminderForm({ setReminders }) {
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!time || !message) {
      setError("Please enter both time and message!");
      return;
    }

    try {
      const response = await fetch("http://break-reminder-app-production.up.railway.app/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ time, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setReminders((prevReminders) => [...prevReminders, data.reminder]);
        setTime("");
        setMessage("");
        setError("");
        setSuccess("Reminder added successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message || "Failed to set reminder.");
      }
    } catch (error) {
      setError("Error setting reminder. Please try again.");
      console.error("Error setting reminder:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Add a Reminder</h3>

      {/* Error & Success Messages */}
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      {/* Time Input */}
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time"
        required
        style={styles.input}
      />

      {/* Reminder Message Input */}
      <input
        type="text"
        placeholder="Reminder Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        style={styles.input}
      />

      {/* Submit Button */}
      <button onClick={handleSubmit} style={styles.button}>
        Set Reminder
      </button>
    </div>
  );
}

// ✅ Updated Styles for Better UI
const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    color: "#333",
    marginBottom: "15px",
  },
  input: {
    display: "block",
    padding: "10px",
    marginBottom: "15px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    marginBottom: "10px",
  },
};

export default ReminderForm;
