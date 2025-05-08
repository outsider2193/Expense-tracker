const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    type: {
        type: String,
        enum: ["Income", "Expense"],
        required: true
    },
    category: {
        type: String, 
        enum: ["Salary", "Business", "Freelance", "Investments", "Groceries", "Rent", "Utilities", "Transportation", "Entertainment", "Health", "Debt Payment", "Education", "Other"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "UPI", "Other"],
        required: true
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Transaction", transactionSchema);
