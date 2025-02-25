import React from "react";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Login from "./login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";

function App() {
  return (
    <Router>  {/* ✅ Wrap everything inside BrowserRouter */}
      <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Break Reminder App
          </Typography>
          <Button color="inherit" href="/">Login</Button>
          <Button color="inherit" href="/register">Register</Button>
        </Toolbar>
      </AppBar>
      
      <Container sx={{ mt: 4 }}></Container>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;