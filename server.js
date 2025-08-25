import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import initMongoDb from "./configs/db";
import Expense from "./model/Expense.js";

dotenv.config();
initMongoDb();

const server = new McpServer({
  name: "starter-server",
  title: "Starter MCP Server",
  description: "A simple MCP server example",
  version: "1.0.0",
});

server.tool(
  "getDailyExpenseByDate",
  {
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format, use ISO 8601 format",
    }),
  },
  {
    description: "Get daily expenses for a specific date",
  },
  async ({ date }) => {
    const expense = new Expense();
    const expenses = await expense.getExpenseListByDate(date);
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
  }
);

const init = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

init().catch((err) => {
  console.error("Failed to start MCP server:", err);
});
