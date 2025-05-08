const financialGoalModel = require("../models/FinancialGoalModel");

// Create Financial Goal
const addFinancialGoal = async (req, res) => {
  try {
    const createdGoal = await financialGoalModel.create(req.body);
    res.status(201).json({
      message: "Financial goal added successfully",
      data: createdGoal,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding financial goal",
      error: err,
    });
  }
};

// Get All Financial Goals
const getAllFinancialGoals = async (req, res) => {
  try {
    const goals = await financialGoalModel.find().populate("userId");
    res.status(200).json({
      message: "Financial goals fetched successfully",
      data: goals,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching financial goals",
      error: err,
    });
  }
};

//GET FINANCIAL GOALS BY USERID
const getFinancialGoalsByUserId = async (req, res) => {
  try {
    const goals = await financialGoalModel.find({ userId: req.params.userId }).populate("userId");
    if (!goals.length) {
      return res.status(404).json({ message: "No financial goals found for this user" });
    }
    res.status(200).json({
      message: "Financial goals fetched successfully",
      data: goals,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching financial goals",
      error: err,
    });
  }
};


// Get Financial Goal by ID
const getFinancialGoalById = async (req, res) => {
  try {
    const goal = await financialGoalModel.findById(req.params.id).populate("userId");
    if (!goal) {
      return res.status(404).json({ message: "Financial goal not found" });
    }
    res.status(200).json({
      message: "Financial goal fetched successfully",
      data: goal,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching financial goal",
      error: err,
    });
  }
};

// Update Financial Goal
const updateFinancialGoal = async (req, res) => {
  try {
    const updatedGoal = await financialGoalModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGoal) {
      return res.status(404).json({ message: "Financial goal not found" });
    }
    res.status(200).json({
      message: "Financial goal updated successfully",
      data: updatedGoal,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating financial goal",
      error: err,
    });
  }
};

// Delete Financial Goal
const deleteFinancialGoal = async (req, res) => {
  try {
    const deletedGoal = await financialGoalModel.findByIdAndDelete(req.params.id);
    if (!deletedGoal) {
      return res.status(404).json({ message: "Financial goal not found" });
    }
    res.status(200).json({
      message: "Financial goal deleted successfully",
      data: deletedGoal,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting financial goal",
      error: err,
    });
  }
};

// Exports
module.exports = {
  addFinancialGoal,
  getAllFinancialGoals,
  getFinancialGoalById,
  updateFinancialGoal,
  deleteFinancialGoal,
  getFinancialGoalsByUserId,
};
