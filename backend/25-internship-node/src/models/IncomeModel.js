const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    source: {
        type: String,
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
    category: {
        type: String, 
        enum: ["Salary", "Business", "Freelance", "Investments", "Other"],
        required: true
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Income", incomeSchema);
