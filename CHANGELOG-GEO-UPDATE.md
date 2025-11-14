# GEO Analyzer Update - November 2025

## Changes Summary

### 1. Token Allocation Increased for Large Content Analysis

**Previous Limit:** 2,000 characters (~300-400 words)
**New Limit:** 70,000 characters (~10,000 words)

This allows the analyzer to process full-length articles and comprehensive content without truncation.

**Token Budget:**
- Input content: ~70,000 chars = ~17,500 tokens
- LLM response: 2,500 tokens (increased from 1,500)
- **Total per analysis: ~20,000 tokens**
- Well within Llama 3.3 70B's 128k context window

### 2. Enhanced LLM Prompt Based on GEO-16 Research

The prompt now aligns with empirical findings from "AI Answer Engine Citation Behavior: An Empirical Analysis of the GEO-16 Framework" (arXiv:2509.10762).

**Key Research Findings Integrated:**
- **Metadata & Freshness** (r=0.68) - Strongest citation predictor
- **Semantic HTML** (r=0.65) - Second strongest predictor  
- **Structured Data** (r=0.63) - Third strongest predictor
- Pages with GEO score ≥0.70 + ≥12 pillar hits achieve 78% citation rate

**New Analysis Focus Areas:**

1. **Question Answering**
   - Does content directly answer user questions?
   - Identifies questions covered vs. missing
   - Validates from video insight: content that answers questions ranks immediately

2. **Structure Quality**
   - Answer-first format detection (TL;DR/summary upfront)
   - Heading hierarchy assessment (H1 → H2 → H3 logic)
   - Semantic HTML evaluation

3. **Verifiable Claims**
   - Factual statements with source backing
   - Semantic triples extraction (subject-predicate-object)
   - Entity recognition with importance scoring

4. **Freshness Signals**
   - Recent information detection
   - Visible date markers

5. **Clarity & Scannability**
   - People-first content assessment
   - Self-contained coherence check

### 3. New Output Schema

**Added to LLM Response:**
```json
{
  "structureQuality": {
    "hasAnswerFirst": boolean,
    "headingHierarchy": "clear" | "partial" | "poor",
    "questionsCovered": ["question 1", "question 2", ...]
  }
}
```

### 4. Enhanced Recommendations

New high-priority recommendations based on structure analysis:

**1. Add Answer-First Summary**
- Priority: High
- Impact: +40% citation likelihood
- Guidance: Add 2-3 sentence summary at top

**2. Fix Heading Hierarchy**
- Priority: High  
- Impact: 2nd strongest citation predictor
- Guidance: Single H1, logical H2/H3 outline

**3. Answer More User Questions**
- Priority: High
- Guidance: Research SERP, explicitly answer common questions

**4. Address Content Gaps**
- Priority: Medium
- Lists specific missing topics/questions

### 5. Technical Changes

**Files Modified:**
- `packages/cloudflare-worker/src/analyzer/llm-analyzer.ts`
  - Increased truncation: 2000 → 70000 chars
  - Enhanced prompt with GEO-16 principles
  - Added StructureQuality interface
  - Increased max_tokens: 1500 → 2500
  - Added structure validation methods

- `packages/cloudflare-worker/src/analyzer/geo-analyzer.ts`
  - Added generateStructureRecommendations()
  - Integrates structure feedback into analysis

### 6. Research Foundation

**Primary Source:** arXiv:2509.10762
- 1,702 citations analyzed across Brave, Google AIO, Perplexity
- 1,100 unique URLs audited
- Identified 16 pillars affecting AI citation

**Supplementary Insight:** YouTube analysis
- Content that answers user questions ranks immediately
- Even DR0 sites rank for 23k volume keywords
- AI engines prioritize comprehensive question coverage

## Testing Recommendations

1. **Test with 10k word articles** to validate full content processing
2. **Compare recommendations** before/after for same content
3. **Verify structure detection** on pages with/without answer-first format
4. **Check question coverage** analysis accuracy
5. **Monitor token usage** with Cloudflare Workers AI

## Expected Improvements

- More actionable recommendations for content editors
- Better detection of structural issues
- Focus on proven citation factors (not just theory)
- Clearer guidance on what questions to answer
- Alignment with real AI engine behavior

## Breaking Changes

None - all changes are backwards compatible. Existing tools continue working with enhanced analysis.

## Next Steps

1. Restart MCP server to load changes
2. Test with sample 10k word content
3. Review new recommendations format
4. Validate structure quality detection
5. Monitor LLM token consumption