import { Env, AnalyzeRequest, HealthResponse } from './types';
import { GeoApiResponse } from '@geo-analyzer/shared';
import { JinaClient } from './jina/client';
import { GeoAnalyzer } from './analyzer/geo-analyzer';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    try {
      // Health check endpoint
      if (path === '/health' && request.method === 'GET') {
        const health: HealthResponse = {
          status: 'healthy',
          version: '1.0.0',
          timestamp: new Date().toISOString(),
          worker: {
            environment: env.ENVIRONMENT || 'unknown',
            aiBinding: !!env.AI,
          },
        };
        return new Response(JSON.stringify(health), {
          status: 200,
          headers: corsHeaders,
        });
      }

      // Analyze endpoint
      if (path === '/api/analyze' && request.method === 'POST') {
        const body = await request.json() as AnalyzeRequest;
        
        if (!body.url || !body.query) {
          return new Response(
            JSON.stringify({ error: 'Missing required fields: url, query' }),
            { status: 400, headers: corsHeaders }
          );
        }

        const startTime = Date.now();
        
        // Initialize clients
        const jinaClient = new JinaClient(body.jinaApiKey);
        const analyzer = new GeoAnalyzer(env.AI, jinaClient);
        
        // Perform analysis
        const result = await analyzer.analyze(
          body.url,
          body.query,
          {
            competitorUrls: body.competitorUrls,
            autoDiscoverCompetitors: body.autoDiscoverCompetitors,
          }
        );
        
        const response: GeoApiResponse = {
          ...result,
          meta: {
            ...result.meta,
            processingTime: Date.now() - startTime,
          },
        };

        return new Response(JSON.stringify(response), {
          status: 200,
          headers: corsHeaders,
        });
      }

      // Not found
      return new Response(
        JSON.stringify({ error: 'Not found' }),
        { status: 404, headers: corsHeaders }
      );

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return new Response(
        JSON.stringify({ error: message }),
        { status: 500, headers: corsHeaders }
      );
    }
  },
};
