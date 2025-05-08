const incomeModel = require("../models/IncomeModel");

// Create Income Entry
const addIncome = async (req, res) => {
  try {
    const createdIncome = await incomeModel.create(req.body);
    res.status(201).json({
      message: "Income added successfully",
      data: createdIncome,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding income",
      error: err,
    });
  }
};

// Get All Incomes
const getAllIncomes = async (req, res) => {
  try {
    const incomes = await incomeModel.find().populate("userId");
    res.status(200).json({
      message: "Incomes fetched successfully",
      data: incomes,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching incomes",
      error: err,
    });
  }
};

//Get income by userid
const getIncomeByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const incomes = await incomeModel.find({ userId }).populate("userId");
    res.status(200).json({
      message: "User-specific incomes fetched successfully",
      data: incomes,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching user incomes",
      error: err,
    });
  }
};


// Get Income by ID
const getIncomeById = async (req, res) => {
  try {
    const income = await incomeModel.findById(req.params.id).populate("userId");
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({
      message: "Income fetched successfully",
      data: income,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching income",
      error: err,
    });
  }
};

// Update Income
const updateIncome = async (req, res) => {
  try {
    const updatedIncome = await incomeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({
      message: "Income updated successfully",
      data: updatedIncome,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating income",
      error: err,
    });
  }
};

// Delete Income
const deleteIncome = async (req, res) => {
  try {
    const deletedIncome = await incomeModel.findByIdAndDelete(req.params.id);
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({
      message: "Income deleted successfully",
      data: deletedIncome,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting income",
      error: err,
    });
  }
};

// Exports
module.exports = {
  addIncome,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
  getIncomeByUserId,
};
