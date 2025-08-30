const { getDailyExpenseRecordByDate } = require("./controller/expenses");

const getDailyExpenseByDateTool = {
  name: "getDailyExpenseByDate",
  description: "Get daily expenses for a specific date",
  schema: {
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format, use ISO 8601 format",
    }),
  },
  handler: async ({ date }) => {
    const data = await getDailyExpenseRecordByDate({ date });
    return data;
  },
};

module.exports = { getDailyExpenseByDateTool };
