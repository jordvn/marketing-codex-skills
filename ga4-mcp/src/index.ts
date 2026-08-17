import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { GoogleAuth } from "google-auth-library";
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

const propertyId = process.env.GA4_PROPERTY_ID;
const defaultSearchConsoleSiteUrl = process.env.GSC_SITE_URL;
const pageSpeedApiKey = process.env.PAGESPEED_API_KEY;

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

type PageSpeedMetric = {
  percentile?: number;
  category?: string;
};

type PageSpeedExperience = {
  id?: string;
  overall_category?: string;
  origin_fallback?: boolean;
  metrics?: Record<string, PageSpeedMetric>;
};

type LighthouseAudit = {
  id?: string;
  title?: string;
  score?: number | null;
  scoreDisplayMode?: string;
  numericValue?: number;
  numericUnit?: string;
  displayValue?: string;
  details?: {
    type?: string;
    overallSavingsMs?: number;
    overallSavingsBytes?: number;
  };
};

type PageSpeedResponse = {
  id?: string;
  loadingExperience?: PageSpeedExperience;
  originLoadingExperience?: PageSpeedExperience;
  lighthouseResult?: {
    requestedUrl?: string;
    finalUrl?: string;
    fetchTime?: string;
    lighthouseVersion?: string;
    categories?: Record<string, { title?: string; score?: number | null }>;
    audits?: Record<string, LighthouseAudit>;
  };
};

const labMetricIds = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "speed-index",
  "interactive",
];

function summarizeExperience(experience?: PageSpeedExperience) {
  if (!experience) return null;

  return {
    id: experience.id ?? null,
    overallCategory: experience.overall_category ?? null,
    originFallback: experience.origin_fallback ?? false,
    metrics: Object.fromEntries(
      Object.entries(experience.metrics ?? {}).map(([name, metric]) => [
        name,
        {
          percentile: metric.percentile ?? null,
          category: metric.category ?? null,
        },
      ])
    ),
  };
}

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

  server.registerTool(
    "run_pagespeed_insights",
    {
      description:
        "Run a read-only Google PageSpeed Insights API v5 analysis and return compact Lighthouse scores, lab metrics, available field data, and prioritized audits.",
      inputSchema: z.object({
        url: z.string().url().describe("Public HTTP or HTTPS page URL to analyze."),
        strategy: z.enum(["mobile", "desktop"]).default("mobile"),
        categories: z
          .array(z.enum(["performance", "accessibility", "best-practices", "seo"]))
          .min(1)
          .max(4)
          .default(["performance", "accessibility", "best-practices", "seo"]),
        locale: z.string().min(2).max(12).default("en"),
        auditLimit: z.number().int().min(1).max(50).default(15),
      }),
    },
    async ({ url, strategy, categories, locale, auditLimit }) => {
      const targetUrl = new URL(url);
      if (!["http:", "https:"].includes(targetUrl.protocol)) {
        throw new Error("PageSpeed Insights requires an HTTP or HTTPS URL");
      }

      const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
      endpoint.searchParams.set("url", targetUrl.toString());
      endpoint.searchParams.set("strategy", strategy);
      endpoint.searchParams.set("locale", locale);
      categories.forEach((category) => endpoint.searchParams.append("category", category));
      if (pageSpeedApiKey) endpoint.searchParams.set("key", pageSpeedApiKey);

      const response = await fetch(endpoint, { signal: AbortSignal.timeout(120_000) });
      if (!response.ok) {
        const errorBody = (await response.text()).slice(0, 2_000);
        if (response.status === 429 && !pageSpeedApiKey) {
          throw new Error(
            "PageSpeed Insights API quota was exceeded for an unauthenticated request. Set PAGESPEED_API_KEY for repeatable use."
          );
        }
        throw new Error(`PageSpeed Insights API returned ${response.status}: ${errorBody}`);
      }

      const data = (await response.json()) as PageSpeedResponse;
      const lighthouse = data.lighthouseResult;
      const audits = lighthouse?.audits ?? {};

      const categoryScores = Object.fromEntries(
        Object.entries(lighthouse?.categories ?? {}).map(([id, category]) => [
          id,
          {
            title: category.title ?? id,
            score: category.score == null ? null : Math.round(category.score * 100),
          },
        ])
      );

      const labMetrics = Object.fromEntries(
        labMetricIds.flatMap((id) => {
          const audit = audits[id];
          if (!audit) return [];
          return [
            [
              id,
              {
                title: audit.title ?? id,
                value: audit.numericValue ?? null,
                unit: audit.numericUnit ?? null,
                displayValue: audit.displayValue ?? null,
                score: audit.score == null ? null : Math.round(audit.score * 100),
              },
            ],
          ];
        })
      );

      const prioritizedAudits = Object.entries(audits)
        .filter(([, audit]) => audit.title && audit.score != null && audit.score < 0.9)
        .sort(([, a], [, b]) => {
          const savingsMs = (b.details?.overallSavingsMs ?? 0) - (a.details?.overallSavingsMs ?? 0);
          if (savingsMs !== 0) return savingsMs;
          const savingsBytes =
            (b.details?.overallSavingsBytes ?? 0) - (a.details?.overallSavingsBytes ?? 0);
          if (savingsBytes !== 0) return savingsBytes;
          return (a.score ?? 1) - (b.score ?? 1);
        })
        .slice(0, auditLimit)
        .map(([id, audit]) => ({
          id,
          title: audit.title ?? id,
          score: audit.score == null ? null : Math.round(audit.score * 100),
          displayValue: audit.displayValue ?? null,
          savingsMs: audit.details?.overallSavingsMs ?? null,
          savingsBytes: audit.details?.overallSavingsBytes ?? null,
        }));

      const result = {
        requestedUrl: lighthouse?.requestedUrl ?? url,
        finalUrl: lighthouse?.finalUrl ?? data.id ?? url,
        fetchTime: lighthouse?.fetchTime ?? null,
        strategy,
        lighthouseVersion: lighthouse?.lighthouseVersion ?? null,
        categories: categoryScores,
        labMetrics,
        pageFieldData: summarizeExperience(data.loadingExperience),
        originFieldData: summarizeExperience(data.originLoadingExperience),
        prioritizedAudits,
      };

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );

  console.error("Marketing analytics MCP server running on stdio");
  return server;
});
