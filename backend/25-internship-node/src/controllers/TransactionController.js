const transactionModel = require("../models/TransactionModel");

// Create Transaction Entry
const addTransaction = async (req, res) => {
  try {
    const createdTransaction = await transactionModel.create(req.body);
    res.status(201).json({
      message: "Transaction added successfully",
      data: createdTransaction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding transaction",
      error: err,
    });
  }
};

// Get All Transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.find().populate("userId");
    res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching transactions",
      error: err,
    });
  }
};

//get transaction by userid
const getTransactionByUserId = async (req, res) => {
  try {
    const transactions = await transactionModel.find({ userId: req.params.userId }).populate("userId");
    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found for this user" });
    }
    res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching transactions",
      error: err,
    });
  }
};

// Get Transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await transactionModel.findById(req.params.id).populate("userId");
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      message: "Transaction fetched successfully",
      data: transaction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching transaction",
      error: err,
    });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating transaction",
      error: err,
    });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await transactionModel.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      message: "Transaction deleted successfully",
      data: deletedTransaction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting transaction",
      error: err,
    });
  }
};

// Exports
module.exports = {
  addTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionByUserId,
};
