const expenseModel = require("../models/ExpenseModel");

// Create Expense Entry
const addExpense = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from URL
    const expenseData = { ...req.body, userId }; // Add userId to expense data

    const createdExpense = await expenseModel.create(expenseData);

    res.status(201).json({
      message: "Expense added successfully",
      data: createdExpense,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding expense",
      error: err.message,
    });
  }
};

// Get All Expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find().populate("userId");
    res.status(200).json({
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching expenses",
      error: err,
    });
  }
};

//Get expense by userid
const getExpenseByUserId = async (req, res) => {
  try {
    const expenses = await expenseModel.find({ userId: req.params.userId }).populate("userId");
    if (!expenses.length) {
      return res.status(404).json({ message: "No expenses found for this user" });
    }
    res.status(200).json({
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching expenses",
      error: err,
    });
  }
};

// Get Expense by ID
const getExpenseById = async (req, res) => {
  try {
    const expense = await expenseModel.findById(req.params.id).populate("userId");
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({
      message: "Expense fetched successfully",
      data: expense,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching expense",
      error: err,
    });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await expenseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating expense",
      error: err,
    });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await expenseModel.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({
      message: "Expense deleted successfully",
      data: deletedExpense,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting expense",
      error: err,
    });
  }
};

// Exports
module.exports = {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseByUserId,
};
