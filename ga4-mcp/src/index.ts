import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { GoogleAuth } from "google-auth-library";
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

const propertyId = process.env.GA4_PROPERTY_ID;
const defaultSearchConsoleSiteUrl = process.env.GSC_SITE_URL;

const analytics = new BetaAnalyticsDataClient();
const searchConsoleAuth = new GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
});

type SearchConsoleRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

type SearchConsoleResponse = {
  rows?: SearchConsoleRow[];
};

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
      if (!propertyId) {
        throw new Error("Missing GA4_PROPERTY_ID");
      }

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

  server.registerTool(
    "run_gsc_search_analytics",
    {
      description:
        "Run a read-only Google Search Console Search Analytics report. Useful for homepage queries, pages, countries, devices, and date comparisons.",
      inputSchema: z.object({
        siteUrl: z
          .string()
          .optional()
          .describe(
            "Search Console property URL, e.g. https://example.com/ or sc-domain:example.com. Defaults to GSC_SITE_URL."
          ),
        startDate: z.string().describe("Start date in YYYY-MM-DD format."),
        endDate: z.string().describe("End date in YYYY-MM-DD format."),
        dimensions: z
          .array(z.enum(["query", "page", "country", "device", "date", "searchAppearance"]))
          .min(1)
          .max(5)
          .default(["query"]),
        pageFilter: z
          .string()
          .optional()
          .describe("Optional exact page URL filter, e.g. https://example.com/."),
        queryFilter: z
          .string()
          .optional()
          .describe("Optional query contains filter."),
        rowLimit: z.number().int().min(1).max(25000).default(1000),
        startRow: z.number().int().min(0).default(0),
      }),
    },
    async ({ siteUrl, startDate, endDate, dimensions, pageFilter, queryFilter, rowLimit, startRow }) => {
      const resolvedSiteUrl = siteUrl ?? defaultSearchConsoleSiteUrl;

      if (!resolvedSiteUrl) {
        throw new Error("Missing siteUrl argument or GSC_SITE_URL");
      }

      const filters = [];

      if (pageFilter) {
        filters.push({
          dimension: "page",
          operator: "equals",
          expression: pageFilter,
        });
      }

      if (queryFilter) {
        filters.push({
          dimension: "query",
          operator: "contains",
          expression: queryFilter,
        });
      }

      const authClient = await searchConsoleAuth.getClient();
      const encodedSiteUrl = encodeURIComponent(resolvedSiteUrl);
      const response = await authClient.request<SearchConsoleResponse>({
        url: `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodedSiteUrl}/searchAnalytics/query`,
        method: "POST",
        data: {
          startDate,
          endDate,
          dimensions,
          rowLimit,
          startRow,
          ...(filters.length > 0
            ? {
                dimensionFilterGroups: [
                  {
                    filters,
                  },
                ],
              }
            : {}),
        },
      });

      const rows =
        response.data.rows?.map((row) => {
          const out: Record<string, string | number> = {};

          dimensions.forEach((dimension, index) => {
            out[dimension] = row.keys?.[index] ?? "";
          });

          out.clicks = row.clicks ?? 0;
          out.impressions = row.impressions ?? 0;
          out.ctr = row.ctr ?? 0;
          out.position = row.position ?? 0;

          return out;
        }) ?? [];

      return {
        content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
        structuredContent: { rows },
      };
    }
  );

  console.error("Marketing analytics MCP server running on stdio");
  return server;
});
