#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const GEO_API_URL = process.env.GEO_WORKER_URL;
const JINA_API_KEY = process.env.JINA_API_KEY;

if (!GEO_API_URL) {
  console.error('\n❌ ERROR: GEO_WORKER_URL environment variable is required.\n');
  console.error('The GEO Analyzer MCP requires you to deploy your own Cloudflare Worker.');
  console.error('There is no public endpoint to protect your privacy and prevent abuse.\n');
  console.error('To fix this:');
  console.error('1. Deploy your own Cloudflare Worker (free tier works):');
  console.error('   cd packages/cloudflare-worker');
  console.error('   npx wrangler deploy\n');
  console.error('2. Add your Worker URL to Claude Desktop config:');
  console.error('   {');
  console.error('     "mcpServers": {');
  console.error('       "geo-analyzer": {');
  console.error('         "command": "...",');
  console.error('         "env": {');
  console.error('           "GEO_WORKER_URL": "https://your-worker.your-subdomain.workers.dev"');
  console.error('         }');
  console.error('       }');
  console.error('     }');
  console.error('   }\n');
  console.error('See README.md for full deployment instructions.');
  console.error('');
  process.exit(1);
}

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
            aiModel: {
              type: 'string',
              description: 'Optional: AI model for semantic analysis (default: @cf/meta/llama-3.3-70b-instruct-fp8-fast)',
              enum: [
                '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
                '@cf/meta/llama-3-8b-instruct',
                '@cf/meta/llama-3.1-8b-instruct',
                '@cf/mistral/mistral-7b-instruct-v0.1'
              ],
            },
          },
          required: ['url', 'query'],
        },
      },
      {
        name: 'compare_extractability',
        description: 'Compare GEO extractability scores across 2-5 URLs side-by-side. Identifies the winner and provides key insights on differences.',
        inputSchema: {
          type: 'object',
          properties: {
            urls: {
              type: 'array',
              items: { type: 'string' },
              minItems: 2,
              maxItems: 5,
              description: 'URLs to compare (minimum 2, maximum 5)',
            },
            query: {
              type: 'string',
              description: 'Target search query for context',
            },
            aiModel: {
              type: 'string',
              description: 'Optional: AI model for semantic analysis (default: @cf/meta/llama-3.3-70b-instruct-fp8-fast)',
              enum: [
                '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
                '@cf/meta/llama-3-8b-instruct',
                '@cf/meta/llama-3.1-8b-instruct',
                '@cf/mistral/mistral-7b-instruct-v0.1'
              ],
            },
          },
          required: ['urls', 'query'],
        },
      },
      {
        name: 'validate_rewrite',
        description: 'Compare original content (from URL) vs optimized content (text) to prove GEO improvements. Shows before/after scores with clear improvement metrics and percentage changes.',
        inputSchema: {
          type: 'object',
          properties: {
            originalUrl: {
              type: 'string',
              description: 'URL of the original content to compare against',
            },
            optimizedContent: {
              type: 'string',
              description: 'The rewritten, optimized content as text',
            },
            targetQuery: {
              type: 'string',
              description: 'The target search query to optimize for',
            },
            title: {
              type: 'string',
              description: 'Optional: Title for the optimized content',
            },
            aiModel: {
              type: 'string',
              description: 'Optional: AI model for semantic analysis (default: @cf/meta/llama-3.3-70b-instruct-fp8-fast)',
              enum: [
                '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
                '@cf/meta/llama-3-8b-instruct',
                '@cf/meta/llama-3.1-8b-instruct',
                '@cf/mistral/mistral-7b-instruct-v0.1'
              ],
            },
          },
          required: ['originalUrl', 'optimizedContent', 'targetQuery'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'analyze_url') {
    const { url, query, competitorUrls, autoDiscoverCompetitors, aiModel } = request.params.arguments as {
      url: string;
      query: string;
      competitorUrls?: string[];
      autoDiscoverCompetitors?: boolean;
      aiModel?: string;
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
          aiModel,
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

  if (request.params.name === 'compare_extractability') {
    const { urls, query, aiModel } = request.params.arguments as {
      urls: string[];
      query: string;
      aiModel?: string;
    };

    if (!urls || !Array.isArray(urls) || urls.length < 2) {
      throw new Error('Must provide at least 2 URLs to compare');
    }

    if (urls.length > 5) {
      throw new Error('Maximum 5 URLs allowed for comparison');
    }

    if (!query) {
      throw new Error('Missing required parameter: query');
    }

    try {
      const results = [];
      const errors = [];

      for (const url of urls) {
        try {
          const response = await fetch(`${GEO_API_URL}/api/analyze`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url,
              query,
              jinaApiKey: JINA_API_KEY,
              aiModel,
            }),
          });

          if (!response.ok) {
            const error = await response.text();
            errors.push({ url, error: `API error: ${response.status}` });
            continue;
          }

          const result = await response.json();
          results.push({
            url,
            scores: result.geoAnalysis?.scores || {
              overall: 0,
              extractability: 0,
              readability: 0,
              citability: 0,
            },
            metrics: result.geoAnalysis?.metrics,
            recommendations: result.geoAnalysis?.recommendations,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error';
          errors.push({ url, error: message });
        }
      }

      if (results.length < 2) {
        throw new Error(
          `Not enough successful analyses (minimum 2 required). Errors: ${JSON.stringify(errors)}`
        );
      }

      results.sort((a, b) => b.scores.overall - a.scores.overall);
      const winner = results[0];
      
      const scores = results.map(r => r.scores.overall);
      const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

      const keyDifferences = [];
      if (winner.scores.extractability > results[results.length - 1].scores.extractability + 1) {
        keyDifferences.push(
          `Winner has significantly better extractability (${winner.scores.extractability} vs ${results[results.length - 1].scores.extractability})`
        );
      }
      if (winner.scores.readability > results[results.length - 1].scores.readability + 1) {
        keyDifferences.push(
          `Winner has better readability score (${winner.scores.readability} vs ${results[results.length - 1].scores.readability})`
        );
      }
      if (winner.scores.citability > results[results.length - 1].scores.citability + 1) {
        keyDifferences.push(
          `Winner has higher citability (${winner.scores.citability} vs ${results[results.length - 1].scores.citability})`
        );
      }

      const comparison = {
        comparison: {
          query,
          analyzedAt: new Date().toISOString(),
          urlCount: results.length,
          failedCount: errors.length,
        },
        results: results.map((r, index) => ({
          url: r.url,
          rank: index + 1,
          isWinner: index === 0,
          scores: r.scores,
          topRecommendation: r.recommendations?.[0]?.method,
        })),
        winner: {
          url: winner.url,
          overallScore: winner.scores.overall,
          reason: keyDifferences.length > 0 
            ? keyDifferences.join('; ') 
            : 'Highest overall GEO score',
        },
        insights: {
          scoreRange: {
            min: Math.min(...scores),
            max: Math.max(...scores),
          },
          averageScore: Math.round(avgScore * 10) / 10,
          keyDifferences,
        },
        errors: errors.length > 0 ? errors : undefined,
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(comparison, null, 2),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to compare URLs: ${message}`);
    }
  }

  if (request.params.name === 'validate_rewrite') {
    const { originalUrl, optimizedContent, targetQuery, title, aiModel } = request.params.arguments as {
      originalUrl: string;
      optimizedContent: string;
      targetQuery: string;
      title?: string;
      aiModel?: string;
    };

    if (!originalUrl || !optimizedContent || !targetQuery) {
      throw new Error('Missing required parameters: originalUrl, optimizedContent, and targetQuery');
    }

    try {
      const originalResponse = await fetch(`${GEO_API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: originalUrl,
          query: targetQuery,
          jinaApiKey: JINA_API_KEY,
          aiModel,
        }),
      });

      if (!originalResponse.ok) {
        const error = await originalResponse.text();
        throw new Error(`Failed to analyze original URL: ${originalResponse.status} - ${error}`);
      }

      const originalResult = await originalResponse.json();

      const optimizedResponse = await fetch(`${GEO_API_URL}/api/analyze-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: optimizedContent,
          query: targetQuery,
          title: title || 'Optimized Content',
          url: originalUrl,
          aiModel,
        }),
      });

      if (!optimizedResponse.ok) {
        const error = await optimizedResponse.text();
        throw new Error(`Failed to analyze optimized content: ${optimizedResponse.status} - ${error}`);
      }

      const optimizedResult = await optimizedResponse.json();

      const beforeScores = originalResult.geoAnalysis?.scores || {};
      const afterScores = optimizedResult.geoAnalysis?.scores || {};

      const calculateDelta = (before: number, after: number) => {
        const delta = after - before;
        const deltaPercent = before > 0 ? Math.round((delta / before) * 100) : 0;
        return {
          delta: Math.round(delta * 10) / 10,
          deltaPercent,
          improved: delta > 0,
        };
      };

      const overallChange = calculateDelta(beforeScores.overall || 0, afterScores.overall || 0);
      const extractabilityChange = calculateDelta(beforeScores.extractability || 0, afterScores.extractability || 0);
      const readabilityChange = calculateDelta(beforeScores.readability || 0, afterScores.readability || 0);
      const citabilityChange = calculateDelta(beforeScores.citability || 0, afterScores.citability || 0);

      const beforeMetrics = originalResult.geoAnalysis?.metrics || {};
      const afterMetrics = optimizedResult.geoAnalysis?.metrics || {};

      const metricComparisons: any = {};
      
      const compareMetric = (metricName: string, beforeVal: number, afterVal: number) => {
        const delta = afterVal - beforeVal;
        const deltaPercent = beforeVal > 0 ? Math.round((delta / beforeVal) * 100) : 0;
        return {
          before: Math.round(beforeVal * 10) / 10,
          after: Math.round(afterVal * 10) / 10,
          improvement: delta > 0 ? `+${deltaPercent}%` : `${deltaPercent}%`,
        };
      };

      if (beforeMetrics.claimDensity && afterMetrics.claimDensity) {
        metricComparisons.claimDensity = compareMetric(
          'claimDensity',
          beforeMetrics.claimDensity.claimsPerSentence || 0,
          afterMetrics.claimDensity.claimsPerSentence || 0
        );
      }

      if (beforeMetrics.sentenceLength && afterMetrics.sentenceLength) {
        metricComparisons.avgSentenceLength = compareMetric(
          'avgSentenceLength',
          beforeMetrics.sentenceLength.avgLength || 0,
          afterMetrics.sentenceLength.avgLength || 0
        );
      }

      if (beforeMetrics.structure && afterMetrics.structure) {
        metricComparisons.listStructures = compareMetric(
          'listStructures',
          beforeMetrics.structure.listStructures || 0,
          afterMetrics.structure.listStructures || 0
        );
      }

      if (beforeMetrics.entities && afterMetrics.entities) {
        metricComparisons.entityDensity = compareMetric(
          'entityDensity',
          beforeMetrics.entities.density || 0,
          afterMetrics.entities.density || 0
        );
      }

      const regressions = [];
      if (!overallChange.improved) regressions.push('Overall score decreased');
      if (!extractabilityChange.improved) regressions.push('Extractability decreased');
      if (!readabilityChange.improved) regressions.push('Readability decreased');
      if (!citabilityChange.improved) regressions.push('Citability decreased');

      const validation = {
        comparison: {
          query: targetQuery,
          analyzedAt: new Date().toISOString(),
          improved: overallChange.improved,
        },
        before: {
          url: originalUrl,
          scores: beforeScores,
        },
        after: {
          title: title || 'Optimized Content',
          scores: afterScores,
        },
        improvements: {
          overallDelta: overallChange.delta,
          overallDeltaPercent: overallChange.deltaPercent,
          extractabilityDelta: extractabilityChange.delta,
          extractabilityDeltaPercent: extractabilityChange.deltaPercent,
          readabilityDelta: readabilityChange.delta,
          readabilityDeltaPercent: readabilityChange.deltaPercent,
          citabilityDelta: citabilityChange.delta,
          citabilityDeltaPercent: citabilityChange.deltaPercent,
        },
        metrics: metricComparisons,
        regressions: regressions.length > 0 ? regressions : undefined,
        recommendations: {
          before: originalResult.geoAnalysis?.recommendations?.slice(0, 3),
          after: optimizedResult.geoAnalysis?.recommendations?.slice(0, 3),
        },
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(validation, null, 2),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to validate rewrite: ${message}`);
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
