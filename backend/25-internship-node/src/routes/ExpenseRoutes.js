const routes = require("express").Router();
const expenseController = require("../controllers/ExpenseController");

// Get all expenses
routes.get("/expense", expenseController.getAllExpenses);

// Get expense by ID
routes.get("/expense/:id", expenseController.getExpenseById);

//get by userid
routes.get("/expense/user/:userId", expenseController.getExpenseByUserId);

// Add new expense
routes.post("/expense/:userId", expenseController.addExpense);

// Update expense
routes.put("/expense/:id", expenseController.updateExpense);

// Delete expense
routes.delete("/expense/:id", expenseController.deleteExpense);

module.exports = routes;
