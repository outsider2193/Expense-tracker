const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    reportType: {
        type: String,
        enum: ["Income", "Expense", "Budget", "Financial Goal", "Transaction Summary"],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    details: {
        type: String
    },
    generatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Report", reportSchema);
