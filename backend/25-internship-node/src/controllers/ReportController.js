const reportModel = require("../models/ReportModel");
const incomemodel = require("../models/IncomeModel");
const budgetModel= require("../models/BudgetModel");
const expenseModel= require("../models/ExpenseModel");
const transactionModel= require("../models/TransactionModel");
const financialGoalModel= require("../models/FinancialGoalModel");
// Create Report
const addReport = async (req, res) => {
  try {
    const createdReport = await reportModel.create(req.body);
    res.status(201).json({
      message: "Report generated successfully",
      data: createdReport,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error generating report",
      error: err,
    });
  }
};

// Get All Reports
const getAllReports = async (req, res) => {
  try {
    const reports = await reportModel.find().populate("userId");
    res.status(200).json({
      message: "Reports fetched successfully",
      data: reports,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching reports",
      error: err,
    });
  }
};

//Get report by userid
// const getReportByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const reports = await reportModel.find({ userId }).populate("userId");
    
//     res.status(200).json({
//       message: "Reports fetched successfully",
//       data: reports,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Error fetching reports",
//       error: err,
//     });
//   }
// };

const getReportByUserId = async (req, res) => {
  try {
    const { id } = req.query;  // Changed from req.params to req.query
    const reports = await reportModel.find({ userId: id }).populate("userId");
    
    res.status(200).json({
      message: "Reports fetched successfully",
      data: reports,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching reports",
      error: err.message,
    });
  }
};


// Get Report by ID
const getReportById = async (req, res) => {
  try {
    const report = await reportModel.findById(req.params.id).populate("userId");
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({
      message: "Report fetched successfully",
      data: report,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching report",
      error: err,
    });
  }
};

// Update Report
const updateReport = async (req, res) => {
  try {
    const updatedReport = await reportModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({
      message: "Report updated successfully",
      data: updatedReport,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating report",
      error: err,
    });
  }
};

// Delete Report
const deleteReport = async (req, res) => {
  try {
    const deletedReport = await reportModel.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({
      message: "Report deleted successfully",
      data: deletedReport,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting report",
      error: err,
    });
  }
};

// const getAllModelReports= async (req,res)=>{
//   try{
//     const incomeReport= await incomemodel.find();
//     const budgetReport= await budgetModel.find();
//     const expenseReport= await expenseModel.find();
//     const transactionReport= await transactionModel.find();
//     const financialGoalReport= await financialGoalModel.find();

//     const allReports = [
//       ...incomeReport.map(report => ({ ...report._doc, reportType: "Income" })),
//       ...expenseReport.map(report => ({ ...report._doc, reportType: "Expense" })),
//       ...budgetReport.map(report => ({ ...report._doc, reportType: "Budget" })),
//       ...financialGoalReport.map(report => ({ ...report._doc, reportType: "Financial Goal" })),
//       ...transactionReport.map(report => ({ ...report._doc, reportType: "Transaction Summary" }))
//     ];
    
//     res.status(200).json({
//       message:"Income Report fetched successfully",
//       data: allReports
//     })
    
    

//   }catch(err){
//     res.status(500).json({
//       message:"Error fetching income report",
//       error: err
//     })
//   }
// }

const getAllModelReports = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from route parameters
    
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required"
      });
    }
    
    // Fetch data from all models
    const incomeReport = await incomemodel.find({ userId });
    const budgetReport = await budgetModel.find({ userId });
    const expenseReport = await expenseModel.find({ userId });
    const transactionReport = await transactionModel.find({ userId });
    const financialGoalReport = await financialGoalModel.find({ userId });

    // Create Report documents for each type
    const Report = require("../models/ReportModel"); 
    await Report.deleteMany({ userId });
    
    
    // Process and save each report type
    const saveReportPromises = [];
    
    // Process Income reports
    for (const income of incomeReport) {
      const reportData = {
        userId: userId,
        reportType: "Income",
        startDate: income.startDate || income.date || new Date(),
        endDate: income.endDate || income.date || new Date(),
        totalAmount: income.amount || 0,
        details: `Income report: ${income.description || income.category || 'No details'}`,
      };
      
      const newReport = new Report(reportData);
      saveReportPromises.push(newReport.save());
    }
    
    // For Expense reports
    for (const expense of expenseReport) {
      const reportData = {
        userId: userId,
        reportType: "Expense",
        startDate: expense.startDate || expense.date || new Date(),
        endDate: expense.endDate || expense.date || new Date(),
        totalAmount: expense.amount || 0,
        details: `Expense report: ${expense.description || expense.category || 'No details'}`,
      };
      
      const newReport = new Report(reportData);
      saveReportPromises.push(newReport.save());
    }
    
    // For Budget reports
    for (const budget of budgetReport) {
      const reportData = {
        userId: userId,
        reportType: "Budget",
        startDate: budget.startDate || budget.period?.start || new Date(),
        endDate: budget.endDate || budget.period?.end || new Date(),
        totalAmount: budget.amount || budget.limit || 0,
        details: `Budget report: ${budget.category || budget.name || 'No details'}`,
      };
      
      const newReport = new Report(reportData);
      saveReportPromises.push(newReport.save());
    }
    
    // For Financial Goal reports
    for (const goal of financialGoalReport) {
      const reportData = {
        userId: userId,
        reportType: "Financial Goal",
        startDate: goal.startDate || goal.createdAt || new Date(),
        endDate: goal.endDate || goal.endDate || new Date(),
        totalAmount: goal.targetAmount || goal.amount || 0,
        details: `Financial goal: ${goal.title || goal.description || 'No details'}`,
      };
      
      const newReport = new Report(reportData);
      saveReportPromises.push(newReport.save());
    }
    
    // For Transaction Summary reports
    for (const transaction of transactionReport) {
      const reportData = {
        userId: userId,
        reportType: "Transaction Summary",
        startDate: transaction.date || new Date(),
        endDate: transaction.date || new Date(),
        totalAmount: transaction.amount || 0,
        details: `Transaction: ${transaction.description || transaction.type || 'No details'}`,
      };
      
      const newReport = new Report(reportData);
      saveReportPromises.push(newReport.save());
    }
    
    // Save all reports to database
    await Promise.all(saveReportPromises);
    
    // Fetch all saved reports to return to client
    const savedReports = await Report.find({ userId });
    
    res.status(200).json({
      message: "Reports consolidated and saved successfully",
      data: savedReports
    });
    
  } catch (err) {
    console.error("Error saving consolidated reports:", err);
    res.status(500).json({
      message: "Error consolidating and saving reports",
      error: err.message
    });
  }
};
// Exports
module.exports = {
  addReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  getReportByUserId,
  getAllModelReports
};
