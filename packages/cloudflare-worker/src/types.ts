export interface Env {
  AI: Ai;
  ENVIRONMENT?: string;
}

export interface AnalyzeRequest {
  url: string;
  query: string;
  competitorUrls?: string[];
  autoDiscoverCompetitors?: boolean;
  jinaApiKey?: string;
}

export interface HealthResponse {
  status: 'healthy';
  version: string;
  timestamp: string;
  worker: {
    environment: string;
    aiBinding: boolean;
  };
}
