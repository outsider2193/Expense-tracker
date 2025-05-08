// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

export const TransactionDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchTransactions();
  }, [userId]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/transactions/user/${userId}`);
      setTransactions(res.data.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/transactions/${id}`);
      fetchTransactions();
      setTransactions(transactions.filter(transaction => transaction._id !== id))
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const chartData = {
    labels: transactions.map((transaction) => transaction.category),
    datasets: [
      {
        label: "Transaction Amount",
        data: transactions.map((transaction) => transaction.amount),
        backgroundColor: transactions.map((transaction) =>
          transaction.type === "Income" ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)"
        ),
      },
    ],
  };

  return (
    <div>
      <h2>Transaction Dashboard</h2>
      <Button variant="contained" color="primary" onClick={() => navigate("/user/addtransaction")}>Add Transaction</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell>
                  {/* <Button variant="contained" color="secondary" onClick={() => navigate(`/update-transaction/${transaction._id}`)}>Edit</Button> */}
                  <Button variant="contained" color="error" onClick={() => handleDelete(transaction._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>Transaction Overview</h3>
      <Bar data={chartData} />
    </div>
  );
};
