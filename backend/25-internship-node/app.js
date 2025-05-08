const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors()) // *
app.use(express.json()) //to accept data as json...



//import role routes

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

const incomeRoutes = require("./src/routes/IncomeRoutes")
app.use(incomeRoutes) 

const expenseRoutes = require("./src/routes/ExpenseRoutes")
app.use(expenseRoutes) 

const budgetRoutes = require("./src/routes/BudgetRoutes")
app.use(budgetRoutes) 

const financialGoalRoutes = require("./src/routes/FinancialGoalRoutes")
app.use(financialGoalRoutes) 

const transactionRoutes = require("./src/routes/TransactionRoutes")
app.use(transactionRoutes)

const reportRoutes = require("./src/routes/ReportRoutes")
app.use(reportRoutes)

const adminRoutes= require("./src/routes/AdminRoutes");
app.use(adminRoutes)


mongoose.connect("mongodb://localhost:27017/trackflow").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})