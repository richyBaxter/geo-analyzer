#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const GEO_API_URL = process.env.GEO_API_URL || 'https://geo-analyzer.workers.dev';
const JINA_API_KEY = process.env.JINA_API_KEY;

const server = new Server(
  {
    name: 'geo-analyzer',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'analyze_url',
        description: 'Analyze a URL for AI search engine optimization using GEO principles. Returns detailed metrics, recommendations, and actionable insights.',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'The URL to analyze',
            },
            query: {
              type: 'string',
              description: 'The target search query to optimize for',
            },
            competitorUrls: {
              type: 'array',
              items: { type: 'string' },
              description: 'Optional: URLs of competitor pages to compare against',
            },
            autoDiscoverCompetitors: {
              type: 'boolean',
              description: 'Optional: Automatically discover and analyze top-ranking competitors (requires JINA_API_KEY)',
            },
          },
          required: ['url', 'query'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'analyze_url') {
    const { url, query, competitorUrls, autoDiscoverCompetitors } = request.params.arguments as {
      url: string;
      query: string;
      competitorUrls?: string[];
      autoDiscoverCompetitors?: boolean;
    };

    if (!url || !query) {
      throw new Error('Missing required parameters: url and query');
    }

    try {
      const response = await fetch(`${GEO_API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          query,
          competitorUrls,
          autoDiscoverCompetitors,
          jinaApiKey: JINA_API_KEY,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`API error: ${response.status} - ${error}`);
      }

      const result = await response.json();

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to analyze URL: ${message}`);
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  process.exit(1);
});
