const getDailyExpenseRecordByDate = async ({date}) => {
  try {
    const expenses = await Expense.getExpenseListByDate(date);
    if (expenses.length > 0) {
      return {
        content: [
          { type: "text", text: `Expenses for ${date}:` },
          ...expenses.map((exp) => ({
            type: "text",
            text: `${exp.description}: $${exp.amount.toFixed(2)}`,
          })),
        ],
      };
    }
    return {
      content: [],
    };
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

module.exports = { getDailyExpenseRecordByDate };
