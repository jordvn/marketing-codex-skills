import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

const propertyId = process.env.GA4_PROPERTY_ID;

if (!propertyId) {
  throw new Error("Missing GA4_PROPERTY_ID");
}

const analytics = new BetaAnalyticsDataClient();

serveStdio(() => {
  const server = new McpServer({
    name: "ga4-mcp",
    version: "0.1.0",
  });

  server.registerTool(
    "run_ga4_report",
    {
      description: "Run a read-only GA4 report using the Google Analytics Data API.",
      inputSchema: z.object({
        startDate: z.string().describe("Start date, e.g. 2026-06-01 or 30daysAgo"),
        endDate: z.string().describe("End date, e.g. 2026-06-30 or yesterday"),
        dimensions: z.array(z.string()).min(1).max(5),
        metrics: z.array(z.string()).min(1).max(10),
        limit: z.number().int().min(1).max(1000).default(100),
      }),
    },
    async ({ startDate, endDate, dimensions, metrics, limit }) => {
      const [response] = await analytics.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: dimensions.map((name) => ({ name })),
        metrics: metrics.map((name) => ({ name })),
        limit,
      });

      const rows =
        response.rows?.map((row) => {
          const out: Record<string, string> = {};

          dimensions.forEach((dimension, index) => {
            out[dimension] = row.dimensionValues?.[index]?.value ?? "";
          });

          metrics.forEach((metric, index) => {
            out[metric] = row.metricValues?.[index]?.value ?? "";
          });

          return out;
        }) ?? [];

      return {
        content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
        structuredContent: { rows },
      };
    }
  );

  console.error("GA4 MCP server running on stdio");
  return server;
});