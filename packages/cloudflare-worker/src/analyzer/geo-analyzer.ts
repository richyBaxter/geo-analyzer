import { JinaClient } from '../jina/client';
import { JinaContent, JinaSearchResult } from '../types/jina.types';
import {
  GeoScores,
  GeoAnalysis,
  CompetitorAnalysis,
  SentenceLengthMetrics,
  ClaimDensityMetrics,
  DateMarkerMetrics,
  StructureMetrics,
  EntityMetrics,
  QueryAlignmentMetrics,
  SemanticTripleMetrics,
} from '../types/geo.types';
import { PatternAnalyzer } from './pattern-analyzer';

interface AnalyzeOptions {
  competitorUrls?: string[];
  autoDiscoverCompetitors?: boolean;
}

interface GeoApiResponsePartial {
  request: {
    url: string;
    query: string;
    competitorUrls?: string[];
    analyzedAt: string;
  };
  jinaContent: JinaContent;
  geoAnalysis: GeoAnalysis;
  competitors?: {
    jinaResults: JinaSearchResult;
    analyses: CompetitorAnalysis[];
  };
  usage: {
    neuronsUsed: number;
    jinaTokensUsed: number;
    dailyRemaining: number;
    cacheHit: boolean;
  };
  meta: {
    version: string;
    processingTime: number;
    featuresUsed: string[];
  };
}

export class GeoAnalyzer {
  private ai: Ai;
  private jinaClient: JinaClient;
  private patternAnalyzer: PatternAnalyzer;

  constructor(ai: Ai, jinaClient: JinaClient) {
    this.ai = ai;
    this.jinaClient = jinaClient;
    this.patternAnalyzer = new PatternAnalyzer();
  }

  async analyze(
    url: string,
    targetQuery: string,
    options: AnalyzeOptions = {}
  ): Promise<Omit<GeoApiResponsePartial, 'meta'>> {
    const jinaContent = await this.jinaClient.read(url, {
      withImageCaptions: true,
      withLinksSummary: true,
      returnFormat: 'json',
      useReaderLM: true,
    });

    let competitors: JinaSearchResult | undefined;
    if (options.autoDiscoverCompetitors) {
      const competitorResults = await this.jinaClient.search(targetQuery, {
        returnFormat: 'json',
      });
      competitors = {
        query: targetQuery,
        results: competitorResults,
        retrievedAt: new Date().toISOString(),
      };
    } else if (options.competitorUrls) {
      const competitorContents = await this.jinaClient.readBatch(
        options.competitorUrls,
        { returnFormat: 'json' }
      );
      competitors = {
        query: targetQuery,
        results: competitorContents,
        retrievedAt: new Date().toISOString(),
      };
    }

    const geoAnalysis = await this.runGeoAnalysis(
      jinaContent,
      targetQuery,
      competitors
    );

    return {
      request: {
        url,
        query: targetQuery,
        competitorUrls: options.competitorUrls,
        analyzedAt: new Date().toISOString(),
      },
      jinaContent,
      geoAnalysis,
      competitors: competitors
        ? {
            jinaResults: competitors,
            analyses: await this.analyzeCompetitors(competitors.results),
          }
        : undefined,
      usage: {
        neuronsUsed: 0,
        jinaTokensUsed: jinaContent.usage?.tokens || 0,
        dailyRemaining: 10000,
        cacheHit: false,
      },
      meta: {
        version: '1.0.0',
        processingTime: 0,
        featuresUsed: ['pattern-analysis'],
      },
    };
  }

  private async runGeoAnalysis(
    content: JinaContent,
    query: string,
    competitors?: JinaSearchResult
  ): Promise<GeoAnalysis> {
    const patternMetrics = this.patternAnalyzer.analyze(content.content, query);

    return {
      analyzedAt: new Date().toISOString(),
      version: '1.0.0',
      targetQuery: query,
      scores: patternMetrics.scores,
      metrics: patternMetrics.metrics,
      chunking: patternMetrics.chunking,
      recommendations: patternMetrics.recommendations,
    };
  }

  private async analyzeCompetitors(
    competitors: JinaContent[]
  ): Promise<CompetitorAnalysis[]> {
    return competitors.map((competitor) => ({
      source: competitor,
      score: 7.5,
      strengths: ['Clear structure', 'Good examples'],
    }));
  }
}
