const routes = require("express").Router();
const reportController = require("../controllers/ReportController");

// Get all reports
routes.get("/reports", reportController.getAllReports);


routes.get("/reports/user/:userId", reportController.getAllModelReports);

// Get report by ID
// routes.get("/reports/:id", reportController.getReportById);

// Add new report
routes.post("/reports", reportController.addReport);

// Update report
routes.put("/reports/:id", reportController.updateReport);

// Delete report
routes.delete("/reports/:id", reportController.deleteReport);

routes.get("/allreports",reportController.getAllModelReports);

module.exports = routes;
