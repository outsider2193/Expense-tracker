// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const DisplayIncome = () => {
    const [incomes, setIncomes] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("id");

    useEffect(() => {
        fetchIncomeData();
    }, []);

    const fetchIncomeData = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/income/user/${userId}`);
            setIncomes(res.data.data || []);
        } catch (error) {
            console.error("Error fetching income data:", error);
        }
    };

    // const handleEdit = async (id) => {
    //     const updatedAmount = prompt("Enter new amount:");
    //     if (!updatedAmount || isNaN(updatedAmount)) {
    //         toast.error("Invalid input. Please enter a valid number.", { position: "top-center" });
    //         return;
    //     }
    //     try {
    //         const res = await axios.put(`http://localhost:3000/income/${id}`, { amount: updatedAmount });
    //         toast.success("Income updated successfully!", { position: "top-center" });
    //         fetchIncomeData();
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Error updating income!", { position: "top-center" });
    //     }
    // };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this income record?")) return;
        try {
            await axios.delete(`http://localhost:3000/income/${id}`);
            toast.success("Income deleted successfully!", { position: "top-center" });
            fetchIncomeData();
            setIncomes(incomes.filter(income => income._id !== id));
        } catch (err) {
            console.error(err);
            toast.error("Error deleting income!", { position: "top-center" });
        }
    };

    const chartData = {
        labels: incomes.map((income) => income.category),
        datasets: [
            {
                label: "Income Amount",
                data: incomes.map((income) => income.amount),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const pieData = {
        labels: incomes.map((income) => income.category),
        datasets: [
            {
                data: incomes.map((income) => income.amount),
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
                ],
            },
        ],
    };

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Income Dashboard
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Source</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incomes.length > 0 ? (
                            incomes.map((income) => (
                                <TableRow key={income._id}>
                                    <TableCell>{income.source}</TableCell>
                                    <TableCell>{income.amount}</TableCell>
                                    <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{income.category}</TableCell>
                                    <TableCell>{income.notes || "N/A"}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => navigate(`/user/updateincome/${income._id}`)}>Edit</Button>
                                        <Button variant="contained" sx={{ ml: "10px" }} color="error" onClick={() => handleDelete(income._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="5" align="center">No income records found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h5" align="center" gutterBottom style={{ marginTop: "20px" }}>
                Income Overview
            </Typography>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                <div style={{ width: "50%" }}>
                    <Bar data={chartData} />
                </div>
                <div style={{ width: "30%" }}>
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};