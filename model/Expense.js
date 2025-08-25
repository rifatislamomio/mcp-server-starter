const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: String,
      required: true,
      default: new Date().toISOString().split("T")[0],
    },
  },
  {
    timestamps: true,
  }
);

schema.statics.getExpenseListByDate = function (expenseDate = new Date()) {
  const [date] = new Date(expenseDate).toISOString().split("T");
  return this.find({
    date: date,
  });
};

module.exports = mongoose.model("Expense", schema);
