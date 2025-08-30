import dotenv from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { initMongoDb } from "./configs/db.js";
import { getDailyExpenseByDateTool } from "./tools.js";

dotenv.config();
initMongoDb();

const server = new McpServer({
  name: "starter-server",
  title: "Starter MCP Server",
  description: "A simple MCP server example",
  version: "1.0.0",
});

server.tool(...getDailyExpenseByDateTool);

const init = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

init().catch((err) => {
  console.error("Failed to start MCP server:", err);
});
