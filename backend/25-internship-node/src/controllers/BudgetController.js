const budgetModel = require("../models/BudgetModel");

// Create Budget Entry
const addBudget = async (req, res) => {
  try {
    const createdBudget = await budgetModel.create(req.body);
    res.status(201).json({
      message: "Budget added successfully",
      data: createdBudget,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding budget",
      error: err,
    });
  }
};

// Get All Budgets
const getAllBudgets = async (req, res) => {
  try {
    const budgets = await budgetModel.find().populate("userId");
    res.status(200).json({
      message: "Budgets fetched successfully",
      data: budgets,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching budgets",
      error: err,
    });
  }
};

// Get Budget by User ID
const getBudgetByUserId = async (req, res) => {
  try {
    const budgets = await budgetModel.find({ userId: req.params.userId }).populate("userId");
    if (!budgets.length) {
      return res.status(404).json({ message: "No budgets found for this user" });
    }
    res.status(200).json({
      message: "Budgets fetched successfully",
      data: budgets,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching budgets",
      error: err,
    });
  }
};

// Get Budget by ID
const getBudgetById = async (req, res) => {
  try {
    const budget = await budgetModel.findById(req.params.id).populate("userId");
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json({
      message: "Budget fetched successfully",
      data: budget,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching budget",
      error: err,
    });
  }
};

// Update Budget
const updateBudget = async (req, res) => {
  try {
    const updatedBudget = await budgetModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json({
      message: "Budget updated successfully",
      data: updatedBudget,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating budget",
      error: err,
    });
  }
};

// Delete Budget
const deleteBudget = async (req, res) => {
  try {
    const deletedBudget = await budgetModel.findByIdAndDelete(req.params.id);
    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json({
      message: "Budget deleted successfully",
      data: deletedBudget,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting budget",
      error: err,
    });
  }
};

// Exports
module.exports = {
  addBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getBudgetByUserId,
};
