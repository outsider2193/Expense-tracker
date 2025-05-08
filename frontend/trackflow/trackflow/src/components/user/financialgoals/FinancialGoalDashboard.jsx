// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
export const FinancialGoalDashboard = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchFinancialGoals();
  }, []);

  const fetchFinancialGoals = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/financial-goals/user/${userId}`);
      setGoals(res.data.data || []);
    } catch (error) {
      console.error("Error fetching financial goals:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/financial-goals/${id}`);
      fetchFinancialGoals();
      setGoals(goals.filter(goal => goal._id !== id))
    } catch (error) {
      console.error("Error deleting financial goal:", error);
    }
  };

  const chartData = {
    labels: goals.map((goal) => goal.goalName),
    datasets: [
      {
        label: "Saved Amount",
        data: goals.map((goal) => goal.savedAmount),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Financial Goals Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/user/add-financial-goal")}>
        Add Financial Goal
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Goal Name</TableCell>
              <TableCell>Target Amount</TableCell>
              <TableCell>Saved Amount</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal._id}>
                <TableCell>{goal.goalName}</TableCell>
                <TableCell>${goal.targetAmount}</TableCell>
                <TableCell>${goal.savedAmount}</TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={(goal.savedAmount / goal.targetAmount) * 100} />
                  <Typography variant="body2" align="center">{((goal.savedAmount / goal.targetAmount) * 100).toFixed(2)}%</Typography>
                </TableCell>
                <TableCell>{new Date(goal.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(goal.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{goal.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => navigate(`/user/update-financial-goal/${goal._id}`)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(goal._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: "20px" }}>
        Financial Goals Overview
      </Typography>
      <Bar data={chartData} />
    </div>
  );
};




