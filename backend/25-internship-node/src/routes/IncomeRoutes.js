const routes = require("express").Router();
const incomeController = require("../controllers/IncomeController");

// Get all incomes
routes.get("/income", incomeController.getAllIncomes);

// Get income by ID
routes.get("/income/:id", incomeController.getIncomeById);

//Get income by userid
routes.get("/income/user/:userId", incomeController.getIncomeByUserId);


// Add new income
routes.post("/income", incomeController.addIncome);

// Update income
routes.put("/income/:id", incomeController.updateIncome);

// Delete income
routes.delete("/income/:id", incomeController.deleteIncome);

module.exports = routes;
