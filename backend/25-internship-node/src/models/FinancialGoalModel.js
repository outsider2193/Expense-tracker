const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const financialGoalSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    goalName: {
        type: String,
        required: true
    },
    targetAmount: {
        type: Number,
        required: true
    },
    savedAmount: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["In Progress", "Completed", "On Hold", "Cancelled"],
        default: "In Progress"
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("FinancialGoal", financialGoalSchema);
