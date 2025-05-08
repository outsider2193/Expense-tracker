const adminModel = require("../models/AdminModel");
const userModel = require("../models/UserModel");
const transactionModel = require("../models/TransactionModel");
const financialGoalModel = require("../models/FinancialGoalModel");
const reportModel = require("../models/ReportModel");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const mailUtil = require("../utils/MailUtil");

// **Admin Login**
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await userModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // const token = jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful",  admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// **Get All Users**
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// **Delete User**
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// **Get All Transactions**
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.find();
    res.status(200).json({ message: "Transactions fetched successfully", data: transactions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// **Delete Transaction**
const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await transactionModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Transaction deleted successfully", data: deletedTransaction });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};

// **Get All Financial Goals**
const getAllFinancialGoals = async (req, res) => {
  try {
    const goals = await financialGoalModel.find();
    res.status(200).json({ message: "Financial goals fetched successfully", data: goals });
  } catch (error) {
    res.status(500).json({ message: "Error fetching financial goals", error });
  }
};

// **Delete Financial Goal**
const deleteFinancialGoal = async (req, res) => {
  try {
    const deletedGoal = await financialGoalModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Financial goal deleted successfully", data: deletedGoal });
  } catch (error) {
    res.status(500).json({ message: "Error deleting financial goal", error });
  }
};

// **Get Reports Summary**
const getReportsSummary = async (req, res) => {
  try {
    const reports = await reportModel.find();
    const totalIncome = reports.reduce((sum, report) => sum + report.totalIncome, 0);
    const totalExpenses = reports.reduce((sum, report) => sum + report.totalExpenses, 0);
    const totalBudget = reports.reduce((sum, report) => sum + report.totalBudget, 0);

    res.status(200).json({
      message: "Reports summary fetched successfully",
      totalIncome,
      totalExpenses,
      totalBudget,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

// **Send Notifications to Users**
const sendNotification = async (req, res) => {
  const { userId, message } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await mailUtil.sendingMail(user.email, "Budget Buddy Notification", message);

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending notification", error });
  }
};

// **Exports**
module.exports = {
  adminLogin,
  getAllUsers,
  deleteUser,
  getAllTransactions,
  deleteTransaction,
  getAllFinancialGoals,
  deleteFinancialGoal,
  getReportsSummary,
  sendNotification,
};
