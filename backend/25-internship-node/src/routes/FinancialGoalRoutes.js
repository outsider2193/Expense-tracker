const routes = require("express").Router();
const financialGoalController = require("../controllers/FinancialGoalController");

// Get all financial goals
routes.get("/financial-goals", financialGoalController.getAllFinancialGoals);

// Get financial goal by ID
routes.get("/financial-goals/:id", financialGoalController.getFinancialGoalById);

// Get financial goal by userID
routes.get("/financial-goals/user/:userId", financialGoalController.getFinancialGoalsByUserId);



// Add new financial goal
routes.post("/financial-goals", financialGoalController.addFinancialGoal);

// Update financial goal
routes.put("/financial-goals/:id", financialGoalController.updateFinancialGoal);

// Delete financial goal
routes.delete("/financial-goals/:id", financialGoalController.deleteFinancialGoal);

module.exports = routes;
