const express = require("express");
const routes = express.Router();
const adminController = require("../controllers/AdminController");
// const  = require("../middleware/");

// **Admin Authentication**
routes.post("/admin/login", adminController.adminLogin);

// **User Management**
routes.get("/users",  adminController.getAllUsers);
routes.delete("/admin/users/:id",  adminController.deleteUser);

// **Transaction Management**
routes.get("/admin/transactions",  adminController.getAllTransactions);
routes.delete("/admin/transactions/:id",  adminController.deleteTransaction);

// **Financial Goals Management**
routes.get("/admin/financial-goals",  adminController.getAllFinancialGoals);
routes.delete("/admin/financial-goals/:id",  adminController.deleteFinancialGoal);

// **Reports & Notifications**
routes.get("/admin/reports/summary",  adminController.getReportsSummary);
routes.post("/admin/notifications",  adminController.sendNotification);

module.exports = routes;
