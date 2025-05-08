const routes = require("express").Router();
const budgetController = require("../controllers/BudgetController");

// Get all budgets
routes.get("/budget", budgetController.getAllBudgets);

//Get budget by id
routes.get("/budget/user/:userId", budgetController.getBudgetByUserId);


// Get budget by ID
routes.get("/budget/:id", budgetController.getBudgetById);

// Add new budget
routes.post("/budget", budgetController.addBudget);

// Update budget
routes.put("/budget/:id", budgetController.updateBudget);

// Delete budget
routes.delete("/budget/:id", budgetController.deleteBudget);

module.exports = routes;
