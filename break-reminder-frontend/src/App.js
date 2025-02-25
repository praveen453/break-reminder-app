import React from "react";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Login from "./login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";

function App() {
  return (
    <Router>  {/* ✅ Wrap everything inside BrowserRouter */}
      <AppBar position="static" sx={{ bgcolor: "#1976d2", boxShadow: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Break Reminder App
          </Typography>
          <Button color="inherit" href="/" sx={{ fontWeight: "bold" }}>Login</Button>
          <Button color="inherit" href="/register" sx={{ fontWeight: "bold" }}>Register</Button>
        </Toolbar>
      </AppBar>
      
      <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
