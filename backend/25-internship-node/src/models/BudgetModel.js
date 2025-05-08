const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    category: {
        type: String, 
        enum: ["Groceries", "Rent", "Utilities", "Transportation", "Entertainment", "Health", "Debt Payment", "Education", "Other"],
        required: true
    },
    amount: {
        type: Number,
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
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Budget", budgetSchema);
