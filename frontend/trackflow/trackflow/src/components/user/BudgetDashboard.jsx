// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

export const BudgetDashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id"); // Fetch user ID from local storage

  useEffect(() => {
    if (userId) {
      fetchBudgets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchBudgets = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/budget/user/${userId}`);
      setBudgets(res.data.data || []);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/budget/${id}`);
      fetchBudgets();
      setBudgets(budgets.filter(budget => budget._id !== id))
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  const chartData = {
    labels: budgets.map((budget) => budget.category),
    datasets: [
      {
        label: "Budget Amount",
        data: budgets.map((budget) => budget.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Budget Dashboard</h2>
      <Button variant="contained" color="primary" onClick={() => navigate("/user/addbudget")}>
        Add Budget
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget._id}>
                <TableCell>{budget.category}</TableCell>
                <TableCell>{budget.amount}</TableCell>
                <TableCell>{new Date(budget.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(budget.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => navigate(`/user/updatebudget/${budget._id}`)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(budget._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>Budget Overview</h3>
      <Bar data={chartData} />
    </div>
  );
};
