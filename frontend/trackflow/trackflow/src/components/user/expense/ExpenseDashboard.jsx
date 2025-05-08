// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

export const ExpenseDashboard = () => {
    const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id") // Replace with actual user ID

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/expense/user/${userId}`);
      setExpenses(res.data.data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/expense/${id}`);
      fetchExpenses();
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const chartData = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: "Expense Amount",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };
  return (
    <div>
    <h2>Expense Dashboard</h2>
    <Button variant="contained" color="primary" onClick={() => navigate("/user/add-expense")}>Add Expense</Button>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>{expense.paymentMethod}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => navigate(`/user/update-expense/${expense._id}`)}>Edit</Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(expense._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <h3>Expense Overview</h3>
    <Bar data={chartData} />
  </div>
);
};

