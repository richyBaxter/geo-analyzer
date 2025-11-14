# GEO Analyzer Enhancement Implementation Scope

## Project Overview
Enhance the GEO Analyzer LLM prompt and response handling to incorporate AI search optimization research best practices, add AI-generated content detection, and provide actionable feedback aligned with the document's tone of voice.

## Current State
- **File**: `C:\MCP\geo-analyzer\packages\cloudflare-worker\src\analyzer\llm-analyzer.ts`
- **Current prompt**: Lines 73-130
- **Current response interface**: Lines 1-30
- **Token allocation**: 70,000 chars input, 2,500 tokens output
- **Model**: Llama 3.3 70B via Cloudflare Workers AI

## Changes Required

### 1. Enhanced TypeScript Interfaces

**Location**: `llm-analyzer.ts` lines 1-30

**Add new interfaces**:
```typescript
interface DataPointMetrics {
  statisticsCount: number;
  numericalClaimsCount: number;
  researchCitationsCount: number;
  specificExamples: string[];
}

interface OriginalitySignals {
  hasPersonalInsights: boolean;
  hasOriginalResearch: boolean;
  hasUniqueData: boolean;
  hasExpertOpinion: boolean;
  originalityScore: number; // 0-1
  genericPhrases: string[]; // AI slop indicators
}

interface WritingQuality {
  passiveVoiceInstances: number;
  passiveVoiceExamples: string[];
  activeVoicePercentage: number;
  aiSlopIndicators: {
    detected: boolean;
    confidence: number; // 0-1
    problematicPhrases: Array<{
      phrase: string;
      context: string;
      suggestion: string;
      reason: string;
    }>;
  };
}

interface EEATSignals {
  hasAuthorAttribution: boolean;
  hasCredentials: boolean;
  hasExpertiseMarkers: boolean;
  authorDetails: {
    present: boolean;
    location: string; // "header", "footer", "inline", "missing"
  };
  trustSignals: string[];
}

interface ActionabilityAssessment {
  hasActionableSteps: boolean;
  implementationGuidancePresent: boolean;
  clearNextSteps: string[];
  actionabilityScore: number; // 0-1
}

interface EntityCoverageAnalysis {
  coreEntityPresent: boolean;
  relatedEntitiesFound: string[];
  missingRelatedEntities: string[];
  entityDensityScore: number;
}
```

**Update LLMAnalysisResult interface**:
```typescript
export interface LLMAnalysisResult {
  semanticTriples: SemanticTriple[];
  advancedEntities: AdvancedEntity[];
  chunkCoherence: ChunkCoherence;
  topicalRelevance: number;
  structureQuality: StructureQuality;
  dataPointMetrics: DataPointMetrics;        // NEW
  originalitySignals: OriginalitySignals;    // NEW
  writingQuality: WritingQuality;            // NEW
  eeatSignals: EEATSignals;                  // NEW
  actionability: ActionabilityAssessment;    // NEW
  entityCoverage: EntityCoverageAnalysis;    // NEW
}
```

### 2. Enhanced LLM Prompt

**Location**: `llm-analyzer.ts` buildUnifiedPrompt method (lines 73-130)

**New prompt structure**:

```typescript
private buildUnifiedPrompt(content: string, query: string): string {
  return `You are an AI search optimization expert analyzing content for citation by answer engines (Google AI Overviews, Perplexity, ChatGPT).

Target query: "${query}"

Content to analyze:
${content}

TASK: Comprehensive GEO analysis based on iPullRank AI Search Manual research and GEO-16 framework.

CRITICAL ANALYSIS AREAS:

1. SEMANTIC TRIPLES & ACTIVE VOICE
   - Extract 5-10 factual triples in subject-predicate-object format
   - FLAG any passive voice usage (reduces semantic clarity)
   - Example GOOD: "Lake houses provide rental income"
   - Example BAD: "Rental income is provided by lake houses"

2. DATA POINTS & SPECIFICITY
   - Count specific statistics, numbers, percentages
   - Identify research findings or data-backed claims
   - Flag generic statements lacking specificity
   - Example GOOD: "Analysis of 2,500 properties showed 18% appreciation"
   - Example BAD: "Properties might be a good investment"

3. ORIGINALITY & INFORMATION GAIN
   - Detect personal insights, original research, unique data
   - Identify AI-generated content patterns (AI slop detection)
   - Flag generic/boilerplate language common in AI content
   - Common AI slop phrases: "delve into", "in today's digital landscape", 
     "it's important to note", "comprehensive guide", "revolutionize", 
     "game-changer", "unlock the secrets", "in conclusion"

4. E-E-A-T SIGNALS (Experience, Expertise, Authority, Trust)
   - Check for author attribution and credentials
   - Detect expertise markers (certifications, experience, background)
   - Identify trust signals (sources cited, transparency, methodology)
   - Flag missing authorship information

5. ACTIONABILITY
   - Does content provide clear implementation steps?
   - Are there specific next actions readers can take?
   - Is guidance concrete vs. theoretical?

6. ENTITY COVERAGE
   - For the main topic, identify core entity
   - List related entities that should be present for completeness
   - Note missing entities that would strengthen context

7. WRITING QUALITY
   - Detect passive voice instances
   - Calculate active voice percentage
   - Provide rewrite suggestions for problematic phrases in document's tone

CRITICAL: Return ONLY valid JSON with this EXACT structure:

{
  "semanticTriples": [
    {"subject": "string", "predicate": "string", "object": "string", "confidence": 0.9}
  ],
  "entities": [
    {"text": "string", "type": "PERSON|ORGANIZATION|LOCATION|PRODUCT|TECHNOLOGY|METRIC", "context": "string", "importance": 0.8}
  ],
  "coherence": {
    "coherent": true,
    "missingContext": ["questions/topics not addressed"],
    "selfContained": true
  },
  "relevance": 0.85,
  "structureQuality": {
    "hasAnswerFirst": true,
    "headingHierarchy": "clear|partial|poor",
    "questionsCovered": ["questions content answers"]
  },
  "dataPoints": {
    "statisticsCount": 5,
    "numericalClaimsCount": 8,
    "researchCitationsCount": 2,
    "specificExamples": ["specific data examples found"]
  },
  "originality": {
    "hasPersonalInsights": true,
    "hasOriginalResearch": false,
    "hasUniqueData": true,
    "hasExpertOpinion": true,
    "originalityScore": 0.7,
    "genericPhrases": ["list of AI slop phrases found"]
  },
  "writingQuality": {
    "passiveVoiceInstances": 3,
    "passiveVoiceExamples": ["example passive sentences"],
    "activeVoicePercentage": 85,
    "aiSlopIndicators": {
      "detected": false,
      "confidence": 0.2,
      "problematicPhrases": [
        {
          "phrase": "in today's digital landscape",
          "context": "surrounding sentence",
          "suggestion": "Currently, businesses face",
          "reason": "Generic AI-generated opener"
        }
      ]
    }
  },
  "eeat": {
    "hasAuthorAttribution": true,
    "hasCredentials": false,
    "hasExpertiseMarkers": true,
    "authorDetails": {
      "present": true,
      "location": "header"
    },
    "trustSignals": ["signals found"]
  },
  "actionability": {
    "hasActionableSteps": true,
    "implementationGuidancePresent": true,
    "clearNextSteps": ["specific actions listed"],
    "actionabilityScore": 0.8
  },
  "entityCoverage": {
    "coreEntityPresent": true,
    "relatedEntitiesFound": ["entities present"],
    "missingRelatedEntities": ["entities missing"],
    "entityDensityScore": 0.7
  }
}

IMPORTANT:
- For AI slop detection, match document's tone when suggesting rewrites
- Be gentle but direct in feedback
- Provide specific alternatives, not generic advice
- Return ONLY JSON - NO markdown, NO explanations, NO preamble

Begin with { and end with }`
}
```

### 3. Response Parser Updates

**Location**: `llm-analyzer.ts` parseResponse method (around line 150)

**Add validation methods** for each new field:
- `validateDataPoints()`
- `validateOriginality()`
- `validateWritingQuality()`
- `validateEEAT()`
- `validateActionability()`
- `validateEntityCoverage()`

**Update parseResponse** to handle all new fields and create fallback values.

### 4. Fallback Result Updates

**Location**: `llm-analyzer.ts` createFallbackResult method

**Add default values** for all new analysis fields when LLM parsing fails.

### 5. GEO Analyzer Enhancements

**Location**: `C:\MCP\geo-analyzer\packages\cloudflare-worker\src\analyzer\geo-analyzer.ts`

**Update enhanceWithLLM method** (around line 195) to:
1. Incorporate new metrics into GEO scores
2. Generate recommendations based on:
   - Data point deficiency
   - Passive voice usage
   - AI slop detection
   - Missing E-E-A-T signals
   - Lack of actionability
   - Entity coverage gaps

**Add new recommendation generation methods**:
- `generateDataPointRecommendations()`
- `generateWritingQualityRecommendations()`
- `generateOriginalityRecommendations()`
- `generateEEATRecommendations()`
- `generateActionabilityRecommendations()`

### 6. Token Budget Adjustment

**Location**: `llm-analyzer.ts` callLLM method (around line 122)

**Consideration**: New prompt is longer and expects more detailed response.

**Current**: max_tokens: 2500
**Recommended**: max_tokens: 3500 (to accommodate additional analysis fields)

**Validation**: Monitor response truncation and adjust if needed.

## Implementation Priority

### Phase 1: Core Enhancements (High Priority)
1. Add TypeScript interfaces
2. Update LLM prompt with new analysis requirements
3. Add validation methods for new fields
4. Update parseResponse to handle new structure
5. Test with sample 10k word content

### Phase 2: Recommendation Generation (Medium Priority)
1. Update enhanceWithLLM to use new metrics
2. Add data point recommendations
3. Add writing quality recommendations (passive voice, AI slop)
4. Add E-E-A-T recommendations
5. Add actionability recommendations

### Phase 3: Testing & Refinement (Medium Priority)
1. Test AI slop detection accuracy
2. Validate rewrite suggestions match document tone
3. Verify all new metrics contribute meaningfully to scores
4. Adjust confidence thresholds
5. Add comprehensive error handling

## Testing Strategy

### Test Cases Required

1. **High-Quality Human Content**
   - Expected: Low AI slop, high originality, strong E-E-A-T
   
2. **AI-Generated Content**
   - Expected: Detected AI patterns, generic language flagged
   
3. **Mixed Content (AI-assisted)**
   - Expected: Nuanced detection, helpful suggestions
   
4. **Technical Content with Data**
   - Expected: High data point count, strong specificity scores
   
5. **Opinion/Editorial Content**
   - Expected: Personal insights detected, expertise markers found

### Validation Metrics

- AI slop detection accuracy (false positive rate <10%)
- Passive voice detection accuracy
- Data point identification precision
- E-E-A-T signal detection recall
- Recommendation relevance (human review)

## Files to Modify

1. **Primary**:
   - `packages/cloudflare-worker/src/analyzer/llm-analyzer.ts` (MAJOR)
   - `packages/cloudflare-worker/src/analyzer/geo-analyzer.ts` (MODERATE)

2. **Supporting**:
   - Update `packages/shared/src/types/geo.types.ts` if shared types needed
   - Update MCP server response formatting in `packages/mcp-server/src/index.ts`

## AI Slop Detection Patterns

**Common phrases to flag** (update regularly):
- "delve into", "dive deep into", "unpack"
- "in today's digital landscape", "in this day and age"
- "it's important to note that", "it's worth noting"
- "comprehensive guide to", "ultimate guide"
- "revolutionize", "transform", "game-changer", "game changing"
- "unlock the power of", "unlock the secrets"
- "harness the potential", "leverage the power"
- "seamlessly integrate", "seamlessly"
- "robust solution", "cutting-edge"
- "in conclusion", "to sum up" (at start of conclusion)
- Overuse of "ensure", "enhance", "optimize", "streamline"
- "It goes without saying"
- "At the end of the day"
- Excessive use of "innovative", "disruptive", "revolutionary"

**Structural AI patterns**:
- Lists that start with "Firstly", "Secondly", "Thirdly"
- Overuse of transition phrases
- Repetitive paragraph structures
- Lack of personal pronouns or anecdotes
- Overly formal or stilted language
- Missing contractions (always "do not" vs "don't")
- Perfect grammar with no natural flow breaks

## Expected Outcomes

### Enhanced Analysis Provides

1. **Data-Driven Feedback**
   - "Content contains only 2 statistics. Add 5-8 specific data points."
   - "Found 12 passive voice instances. Convert to active voice."

2. **Originality Assessment**
   - "No unique research detected. Consider adding proprietary insights."
   - "Generic AI phrase detected: 'delve into' → Suggest: 'explore' or 'examine'"

3. **E-E-A-T Improvements**
   - "Missing author attribution. Add byline with credentials."
   - "No expertise markers found. Include relevant experience/background."

4. **Actionability Score**
   - "Content is 40% actionable. Add 3-5 implementation steps."
   - "Theoretical discussion without practical guidance. Include examples."

5. **AI Slop Detection**
   - "15 AI-generated phrases detected (confidence: 0.8)"
   - "Suggested rewrites maintaining document tone"
   - "Passive construction reduces semantic clarity"

### Success Criteria

- ✅ All new analysis fields populated correctly
- ✅ AI slop detection >80% accuracy (validated on test set)
- ✅ Rewrite suggestions match document tone
- ✅ Recommendations are actionable and specific
- ✅ No performance degradation (still <60s for 10k words)
- ✅ Token budget remains within limits
- ✅ Backward compatible with existing tools

## Risks & Mitigation

### Risk 1: Response Token Overflow
**Mitigation**: Monitor actual token usage, implement graceful truncation with priority (keep critical analysis, drop examples if needed)

### Risk 2: LLM Refuses Detailed Analysis
**Mitigation**: Include instruction that analysis is for content improvement, not judgment

### Risk 3: False Positive AI Detection
**Mitigation**: Use confidence scores, allow human override, focus on patterns not single phrases

### Risk 4: Inconsistent Tone Matching
**Mitigation**: Include document tone in prompt context, test with diverse content types

## Documentation Updates Needed

1. Update README.md with new analysis features
2. Add AI slop detection explanation
3. Document new recommendation types
4. Update example outputs
5. Create troubleshooting guide for new features

## Future Enhancements (Out of Scope)

- Multi-language AI slop detection
- Custom phrase blacklists per user
- Machine learning model for slop detection (vs. rule-based)
- Historical tracking of AI slop trends
- Automated rewrite generation (not just suggestions)
- Integration with content creation tools
- Real-time analysis as user types

---

## Implementation Checklist

- [ ] Phase 1: Add TypeScript interfaces
- [ ] Phase 1: Update LLM prompt
- [ ] Phase 1: Add validation methods
- [ ] Phase 1: Update parseResponse
- [ ] Phase 1: Test with sample content
- [ ] Phase 2: Update enhanceWithLLM
- [ ] Phase 2: Add data point recommendations
- [ ] Phase 2: Add writing quality recommendations
- [ ] Phase 2: Add E-E-A-T recommendations
- [ ] Phase 2: Add actionability recommendations
- [ ] Phase 3: Test AI slop detection
- [ ] Phase 3: Validate tone matching
- [ ] Phase 3: Comprehensive error handling
- [ ] Update documentation
- [ ] Create test suite
- [ ] Deploy to Cloudflare Worker
- [ ] Update MCP server
- [ ] Restart Claude Desktop
- [ ] Final validation

---

## Estimated Implementation Time

- **Phase 1**: 3-4 hours (core enhancements)
- **Phase 2**: 2-3 hours (recommendation generation)
- **Phase 3**: 2-3 hours (testing & refinement)
- **Documentation**: 1 hour
- **Total**: 8-11 hours

## Success Validation

Test with these scenarios:
1. Obvious AI slop article → Should detect with high confidence
2. Academic research paper → Should score high on data points, low on slop
3. Personal blog post → Should detect expertise, personal insights
4. Corporate marketing copy → Should flag generic language, suggest specificity
5. Technical tutorial → Should score high on actionability

**Project is successful when all 5 scenarios return accurate, helpful feedback.**

---

## Next Steps for New Thread

1. Start with Phase 1 implementation
2. Implement one interface at a time
3. Test each addition before moving forward
4. Use `edit_block` for surgical updates (not full rewrites)
5. Validate JSON structure after each prompt change
6. Monitor token usage throughout
7. Deploy and test incrementally

**Ready to implement in new thread with this scope document as reference.**