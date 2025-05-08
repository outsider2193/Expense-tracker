const routes = require("express").Router();
const transactionController = require("../controllers/TransactionController");

// Get all transactions
routes.get("/transactions", transactionController.getAllTransactions);

// Get transaction by ID
routes.get("/transactions/:id", transactionController.getTransactionById);

//get by userid
routes.get("/transactions/user/:userId", transactionController.getTransactionByUserId);

// Add new transaction
routes.post("/transactions", transactionController.addTransaction);

// Update transaction
routes.put("/transactions/:id", transactionController.updateTransaction);

// Delete transaction
routes.delete("/transactions/:id", transactionController.deleteTransaction);

module.exports = routes;
