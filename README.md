# 🚀 GEO Analyzer MCP

<div align="center">

[![npm version](https://img.shields.io/npm/v/@houtini/geo-analyzer.svg)](https://www.npmjs.com/package/@houtini/geo-analyzer)
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/houtini-ai/geo-analyzer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Optimize content for AI search engines with research-backed analysis**

Model Context Protocol (MCP) server that analyzes how well your content performs in AI-generated responses. Get citation-likelihood scores, structural recommendations, and actionable insights—powered by empirical research and your own private infrastructure.

[Quick Start](#-quick-start) • [Features](#-what-you-get) • [Research](#-the-science-behind-geo) • [Installation](#-installation) • [Usage](#-usage-examples)

</div>

---

## 🌟 What You Get

### Research-Backed Analysis

Built on **GEO-16 framework** from "AI Answer Engine Citation Behavior" (arXiv:2509.10762) and AI search optimization research:
- Analyzed 1,702 citations across Brave, Google AI Overviews, and Perplexity
- Identified 16 pillars affecting AI citation behavior
- Found pages with GEO ≥0.70 achieve 78% citation rate
- Enhanced with AI content detection and writing quality analysis

**Top Predictors of AI Citation:**
1. **Metadata & Freshness** (r=0.68) - Strongest predictor
2. **Semantic HTML** (r=0.65) - Structure matters
3. **Structured Data** (r=0.63) - Machine-readable signals
4. **Active Voice & Originality** - New: AI slop detection + writing quality

### Advanced Content Quality Analysis

**🎯 AI Slop Detection** - Identify generic AI-generated language patterns
- Detects phrases like "delve into", "in today's digital landscape", "game-changer"
- Confidence scoring (0-1) for AI-generated content likelihood
- Contextual suggestions matching your document's tone
- Reduces generic language that hurts citation rates

**✍️ Writing Quality Assessment**
- Passive vs. active voice analysis
- Active voice percentage calculation (target: 80%+)
- Specific rewrite suggestions for passive constructions
- Active voice improves semantic extraction by 40%

**📊 Data Point Analysis**
- Statistics count and density measurement
- Research citation detection
- Numerical claims identification
- Specific examples extraction

**🔍 E-E-A-T Signal Detection** (Experience, Expertise, Authority, Trust)
- Author attribution and credentials
- Expertise markers identification
- Trust signals discovery
- Author location assessment (header/footer/inline)

**⚡ Actionability Scoring**
- Implementation steps detection
- Clear next actions identification
- Practical guidance assessment
- Actionability score (0-1) calculation

### Three Powerful MCP Tools

**`analyze_url`** - Comprehensive page analysis
- Citation likelihood scoring (0-10 scale)
- Semantic analysis: triples, entities, relationships
- Structure quality: answer-first, heading hierarchy
- Question coverage: what queries does content answer?
- Writing quality: passive voice, AI slop indicators
- Data points: statistics, research, numerical claims
- E-E-A-T signals: author, credentials, expertise
- Actionability: steps, guidance, next actions
- Prioritized recommendations with before/after examples

**`compare_extractability`** - Competitive benchmarking
- Side-by-side comparison of 2-5 URLs
- Identify winner and performance gaps
- Cross-engine citation patterns
- Domain-level insights
- Writing quality comparison

**`validate_rewrite`** - Prove your optimizations work
- Before/after comparison with original URL
- Percentage improvements across all metrics
- Identifies regressions and wins
- Validates content changes quantitatively
- Shows improvements in AI slop reduction

### Technology That Respects Your Privacy

**🔐 Self-Hosted**: Deploy your own Cloudflare Worker—your data never touches third-party servers  
**🧠 AI-Powered**: Llama 3.3 70B analyzes up to 10,000 words per page  
**📊 MCP Native**: Built-in Claude Desktop integration via Model Context Protocol  
**⚡ Edge Computing**: Cloudflare Workers AI—fast, scalable, cost-effective  

---

## 🎯 The Science Behind GEO

### What is Generative Engine Optimization?

GEO is optimizing content to be cited by AI answer engines (ChatGPT, Perplexity, Claude, Google AI Overviews). Unlike traditional SEO focused on link clicks, GEO focuses on **citation likelihood**—will AI systems reference your content when answering user questions?

### Research Foundation

This tool implements findings from peer-reviewed studies and industry best practices:

#### Primary: GEO-16 Framework (2025)
**Kumar, A. & Palkhouski, L.** *AI Answer Engine Citation Behavior: An Empirical Analysis of the GEO-16 Framework*  
arXiv:2509.10762 | September 2025

**Key Findings:**
- **16 pillars** predict AI citation behavior
- **Metadata & Freshness** strongest predictor (r=0.68)
- **Semantic HTML** second strongest (r=0.65)  
- **Structured Data** third strongest (r=0.63)
- Pages with **GEO ≥0.70 + ≥12 pillar hits = 78% citation rate**
- Engines differ in quality preferences (Brave: 0.727, Google: 0.687, Perplexity: 0.300)

#### Secondary: Optimization Methods (2024)
**Aggarwal, P. et al.** *GEO: Generative Engine Optimization*  
ACM SIGKDD 2024 | DOI: 10.1145/3637528.3671900

**Key Findings:**
- Tested 9 optimization methods across 10,000 queries
- Traditional SEO (keyword stuffing) **reduced** AI citations
- Best methods focused on **extractability**:
  - Cite authoritative sources (+40% citations)
  - Add quotable statistics (+30% citations)  
  - Include relevant statistics (+26% citations)

#### iPullRank AI Search Manual (2024)
Industry best practices for AI search optimization:
- Active voice improves semantic extraction by 40%
- Original research and unique data increase citation likelihood
- E-E-A-T signals (Experience, Expertise, Authority, Trust) are critical
- AI-generated content patterns reduce originality scores
- Data-driven claims improve trustworthiness

### What This Tool Analyzes

**Structure Quality (GEO-16)**
- ✅ Answer-first format detection
- ✅ Heading hierarchy (H1 → H2 → H3)
- ✅ Question coverage analysis
- ✅ Content gap identification

**Extractability Metrics (ACM SIGKDD)**
- ✅ Claim density (target: 4+ per 100 words)
- ✅ Semantic triples (subject-predicate-object)
- ✅ Entity recognition and diversity
- ✅ Sentence length optimization (15-20 words)

**Writing Quality (iPullRank)**
- ✅ Active voice percentage (target: 80%+)
- ✅ Passive voice detection and examples
- ✅ AI slop detection (generic phrases)
- ✅ Problematic phrase identification with suggestions

**Data Point Analysis**
- ✅ Statistics and numerical claims counting
- ✅ Research citation detection
- ✅ Specific examples extraction
- ✅ Data density scoring

**E-E-A-T Signals**
- ✅ Author attribution detection
- ✅ Credentials identification
- ✅ Expertise markers recognition
- ✅ Trust signals discovery

**Actionability Assessment**
- ✅ Implementation steps detection
- ✅ Clear next actions identification
- ✅ Practical guidance scoring
- ✅ Actionable elements extraction

**Citation Signals (GEO-16)**
- ✅ Source citations and provenance
- ✅ Temporal markers and freshness
- ✅ Verifiable factual statements
- ✅ Self-contained coherence

### Real-World Validation

From supplementary case study (YouTube analysis):
- DR0 site ranked #6 for 23,000 volume keyword
- Content that answers user questions ranks immediately
- Even new sites get AI citations with proper structure
- Google AI Overviews and ChatGPT cited the content

**Bottom Line:** Content that comprehensively answers questions, uses clear structure, cites sources, maintains active voice, and provides original data performs better in AI search engines.

---

## ⚡ Quick Start

### Prerequisites

- **Cloudflare Account** - Free tier works ([Sign up](https://dash.cloudflare.com/sign-up))
- **Claude Desktop** - Latest version with MCP ([Download](https://claude.ai/download))
- **Node.js 20+** - For package manager ([Download](https://nodejs.org/))
- **Jina AI Key** - Optional but recommended ([Get free key](https://jina.ai/))

### Three Installation Methods

#### Option 1: Deploy Button (Fastest)

1. Click **"Deploy to Cloudflare"** button above ☝️
2. Sign in to Cloudflare
3. Fork repository (automatic)
4. Worker deploys to your account
5. Copy Worker URL from deployment
6. Add to Claude Desktop config:

```json
{
  "mcpServers": {
    "geo-analyzer": {
      "command": "npx",
      "args": ["-y", "@houtini/geo-analyzer"],
      "env": {
        "GEO_WORKER_URL": "https://geo-analyzer.YOUR-SUBDOMAIN.workers.dev",
        "JINA_API_KEY": "your-optional-jina-key"
      }
    }
  }
}
```

7. Restart Claude Desktop
8. Ask: `"Analyze https://example.com for 'topic'"`

#### Option 2: NPX (Simplest)

```bash
# Install globally
npm install -g @houtini/geo-analyzer

# Deploy worker
cd $(npm root -g)/@houtini/geo-analyzer/packages/cloudflare-worker
npx wrangler login
npx wrangler deploy

# Copy Worker URL, add to Claude config (see above)
```

#### Option 3: Manual Clone

```bash
git clone https://github.com/houtini/geo-analyzer.git
cd geo-analyzer
npm install
npm run build

cd packages/cloudflare-worker
npx wrangler login
npx wrangler deploy

# Copy Worker URL, add to Claude config (see above)
```

### Configuration File Locations

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

### Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GEO_WORKER_URL` | ✅ Yes | Your Cloudflare Worker endpoint |
| `JINA_API_KEY` | 🟡 Recommended | Clean content extraction (1M tokens free/month) |

**Without Jina:** Basic extraction works but Jina provides cleaner, more accurate markdown—recommended for production.

---

## 💡 Usage Examples

### Example 1: Comprehensive Content Analysis

```
Analyze https://yoursite.com/blog/guide-to-seo for "SEO best practices"
```

**Claude Response:**
```json
{
  "summary": {
    "overall_score": 7.2,
    "rating": "Good",
    "primary_issues": [
      "Missing answer-first summary",
      "High passive voice usage (15 instances)",
      "AI-generated language detected (confidence: 0.7)",
      "Missing author credentials"
    ],
    "quick_wins": [
      "Add 2-3 sentence TL;DR at top",
      "Convert passive to active voice",
      "Replace generic AI phrases",
      "Add author byline with credentials"
    ]
  },
  "scores": {
    "overall": 7.2,
    "extractability": 7.8,
    "readability": 7.5,
    "citability": 6.3
  },
  "metrics": {
    "dataPoints": {
      "statisticsCount": 2,
      "numericalClaims": 5,
      "researchCitations": 0
    },
    "writingQuality": {
      "activeVoicePercentage": 65,
      "passiveVoiceCount": 15,
      "aiSlopDetected": true,
      "aiSlopConfidence": 0.7
    },
    "originality": {
      "score": 0.45,
      "hasOriginalResearch": false,
      "hasUniqueData": false
    },
    "eeat": {
      "hasAuthor": false,
      "hasCredentials": false,
      "hasExpertise": true,
      "trustSignalsCount": 2
    },
    "actionability": {
      "score": 0.6,
      "hasImplementationSteps": true
    }
  },
  "recommendations": {
    "high_priority": [
      {
        "method": "Add Answer-First Summary",
        "details": "Place clear 2-3 sentence answer at top",
        "rationale": "Increases AI citation by 40%"
      },
      {
        "method": "Reduce Passive Voice",
        "details": "Found 15 passive voice instances. Convert to active voice.",
        "examples": [
          "SEO is considered important → SEO matters significantly",
          "Results were obtained → Our analysis found"
        ],
        "rationale": "Active voice improves semantic extraction by 40%"
      },
      {
        "method": "Remove AI-Generated Language Patterns",
        "details": "AI-generated language detected (confidence: 70%)",
        "suggestions": [
          "\"delve into\" → \"explore\"",
          "\"in today's digital landscape\" → \"Currently\"",
          "\"it's important to note\" → Remove entirely"
        ],
        "rationale": "Generic AI language reduces originality and citation rates"
      },
      {
        "method": "Add Author Attribution",
        "details": "No author attribution found. Add clear byline with credentials.",
        "rationale": "Author attribution is critical for E-E-A-T signals"
      },
      {
        "method": "Add More Statistical Data",
        "details": "Content contains only 2 statistics. Add 5-8 specific data points.",
        "rationale": "Data-driven content is 35% more likely to be cited"
      }
    ]
  }
}
```

### Example 2: AI Slop Detection

The analyzer detects common AI-generated language patterns and provides specific rewrites:

**Detected AI Slop Examples:**
- "delve into" → Suggestion: "explore" or "examine"
- "in today's digital landscape" → Suggestion: "Currently, businesses face"
- "it's important to note that" → Suggestion: Remove or rephrase naturally
- "comprehensive guide to" → Suggestion: "guide to" or specific topic name
- "revolutionize your business" → Suggestion: "improve your business processes"
- "game-changing solution" → Suggestion: "effective solution"
- "unlock the secrets" → Suggestion: "learn the methods"

**Confidence Scoring:**
- 0.0-0.3: Natural human writing
- 0.3-0.5: Some AI patterns but acceptable
- 0.5-0.7: Likely AI-generated, needs revision
- 0.7-1.0: High confidence AI content, major revision needed

### Example 3: Writing Quality Analysis

```
Analyze https://example.com/article for "content strategy"
```

**Writing Quality Metrics:**
```json
{
  "writingQuality": {
    "passiveVoiceInstances": 8,
    "passiveVoiceExamples": [
      "Content was created by the team",
      "Results were analyzed by researchers",
      "Strategy is developed through research"
    ],
    "activeVoicePercentage": 72,
    "aiSlopIndicators": {
      "detected": true,
      "confidence": 0.65,
      "problematicPhrases": [
        {
          "phrase": "in today's fast-paced digital world",
          "context": "In today's fast-paced digital world, content strategy matters.",
          "suggestion": "Content strategy significantly impacts business growth.",
          "reason": "Generic AI-generated opening removes specificity"
        },
        {
          "phrase": "leverage cutting-edge solutions",
          "context": "Businesses should leverage cutting-edge solutions for growth.",
          "suggestion": "Businesses should adopt proven strategies for growth.",
          "reason": "Vague buzzwords reduce credibility"
        }
      ]
    }
  }
}
```

**Recommendations:**
1. **Convert Passive to Active Voice** - Target: 80%+ active voice
2. **Remove AI Patterns** - Replace 5+ generic phrases with specific language
3. **Increase Specificity** - Add concrete examples and data

### Example 4: Data Point Analysis

```
Analyze https://yoursite.com/research for "market trends"
```

**Data Point Metrics:**
```json
{
  "dataPointMetrics": {
    "statisticsCount": 12,
    "numericalClaimsCount": 18,
    "researchCitationsCount": 4,
    "specificExamples": [
      "18% annual growth rate",
      "2,500 property analysis",
      "Study of 10,000 websites",
      "35% improvement in citations"
    ]
  }
}
```

**Recommendations:**
- ✅ Excellent data density (12 statistics)
- ✅ Strong numerical backing (18 claims)
- ✅ Research citations present (4 sources)
- Consider: Add more industry-specific metrics

### Example 5: E-E-A-T Assessment

```
Analyze https://example.com/expert-guide for "financial planning"
```

**E-E-A-T Signals:**
```json
{
  "eeatSignals": {
    "hasAuthorAttribution": true,
    "hasCredentials": true,
    "hasExpertiseMarkers": true,
    "authorDetails": {
      "present": true,
      "location": "header"
    },
    "trustSignals": [
      "CFA certification mentioned",
      "20 years experience cited",
      "Published research referenced",
      "Industry awards listed"
    ]
  }
}
```

**Recommendations:**
- ✅ Strong E-E-A-T signals present
- ✅ Author credentials clearly displayed
- ✅ Multiple trust indicators
- Consider: Link to author's published work

### Example 6: Actionability Scoring

```
Analyze https://yoursite.com/tutorial for "email marketing"
```

**Actionability Assessment:**
```json
{
  "actionability": {
    "hasActionableSteps": true,
    "implementationGuidancePresent": true,
    "clearNextSteps": [
      "Step 1: Build email list",
      "Step 2: Segment audience",
      "Step 3: Create campaign",
      "Step 4: Analyze results",
      "Next: Download template"
    ],
    "actionabilityScore": 0.85
  }
}
```

**Recommendations:**
- ✅ Excellent actionability (score: 0.85)
- ✅ Clear implementation steps
- ✅ Practical examples provided
- Consider: Add more before/after examples

### Example 7: Compare Against Competitors

```
Compare GEO extractability for:
- https://yoursite.com/guide
- https://competitor1.com/tutorial  
- https://competitor2.com/article

Query: "content marketing strategies"
```

**Claude Response:**
```json
{
  "winner": {
    "url": "https://competitor1.com/tutorial",
    "overallScore": 8.4,
    "reason": "Superior semantic structure, lower AI slop, better E-E-A-T"
  },
  "results": [
    {
      "url": "https://competitor1.com/tutorial",
      "rank": 1,
      "scores": {"overall": 8.4, "citability": 8.8},
      "writingQuality": {
        "activeVoicePercentage": 87,
        "aiSlopConfidence": 0.2
      },
      "eeat": {
        "hasAuthor": true,
        "hasCredentials": true
      }
    },
    {
      "url": "https://yoursite.com/guide",
      "rank": 2,
      "scores": {"overall": 7.2, "citability": 7.0},
      "writingQuality": {
        "activeVoicePercentage": 65,
        "aiSlopConfidence": 0.7
      },
      "eeat": {
        "hasAuthor": false,
        "hasCredentials": false
      }
    }
  ],
  "insights": {
    "keyDifferences": [
      "Winner has 87% active voice (you: 65%)",
      "Winner has low AI slop (0.2) vs your 0.7",
      "Winner has clear author with credentials",
      "Winner answers 12 questions (you answer 7)",
      "Winner has 15 statistics (you have 2)"
    ],
    "recommendations": [
      "Convert passive voice to active",
      "Remove AI-generated phrases",
      "Add author attribution",
      "Include more data points"
    ]
  }
}
```

### Example 8: Validate Content Rewrite

```
I optimized this article. Compare it to https://site.com/original

[Your 10,000-word optimized content here]

Target query: "AI search optimization"
```

**Claude Response:**
```json
{
  "comparison": {
    "improved": true
  },
  "before": {
    "scores": {"overall": 6.5, "citability": 5.2},
    "writingQuality": {
      "activeVoicePercentage": 58,
      "aiSlopConfidence": 0.8
    },
    "dataPoints": {"statisticsCount": 1},
    "eeat": {"hasAuthor": false}
  },
  "after": {
    "scores": {"overall": 8.1, "citability": 7.8},
    "writingQuality": {
      "activeVoicePercentage": 82,
      "aiSlopConfidence": 0.2
    },
    "dataPoints": {"statisticsCount": 12},
    "eeat": {"hasAuthor": true, "hasCredentials": true}
  },
  "improvements": {
    "overallDelta": 1.6,
    "overallDeltaPercent": 25,
    "citabilityDelta": 2.6,
    "citabilityDeltaPercent": 50,
    "writingQualityImprovements": {
      "activeVoiceIncrease": 24,
      "aiSlopReduction": 0.6,
      "statisticsAdded": 11
    },
    "eeatImprovements": {
      "authorAdded": true,
      "credentialsAdded": true
    }
  },
  "next_steps": [
    "✅ Content successfully optimized",
    "✅ AI slop reduced by 75%",
    "✅ Active voice increased by 41%",
    "✅ E-E-A-T signals added",
    "Consider: A/B test changes",
    "Consider: Monitor citation rates"
  ]
}
```

### Example 9: AI Model Selection

```
Analyze https://example.com for "machine learning"

Use the faster Llama 3.1 8B model for this analysis.
```

Claude will pass `aiModel: "@cf/meta/llama-3.1-8b-instruct"` to speed up analysis.

---

## 🛠️ Features Deep Dive

### Content Analysis Capabilities

**Processes up to 10,000 words** per analysis (70,000 characters)

**Structure Assessment:**
- Detects answer-first format (TL;DR at top)
- Evaluates heading hierarchy quality
- Identifies questions content answers
- Lists missing questions/content gaps
- Measures self-contained coherence

**Semantic Intelligence:**
- Extracts 5-10 semantic triples per page
- Recognizes 8-15 named entities
- Calculates entity diversity scores
- Maps relationships between concepts
- Assesses claim verifiability

**Writing Quality Analysis:**
- **Passive Voice Detection**: Identifies passive constructions that reduce semantic clarity
- **Active Voice Calculation**: Measures percentage (target: 80%+)
- **AI Slop Detection**: Recognizes generic AI-generated language patterns
- **Problematic Phrase Identification**: Lists specific phrases with context
- **Rewrite Suggestions**: Provides alternatives matching document tone
- **Confidence Scoring**: 0-1 scale for AI content likelihood

**Data Point Analysis:**
- **Statistics Counting**: Specific numbers, percentages, metrics
- **Numerical Claims**: Quantitative statements and data-backed claims
- **Research Citations**: Academic or industry research references
- **Specific Examples**: Concrete data points and case studies
- **Data Density**: Overall data richness assessment

**E-E-A-T Signal Detection:**
- **Author Attribution**: Byline, author name detection
- **Credentials Identification**: Qualifications, certifications, titles
- **Expertise Markers**: Experience mentions, background indicators
- **Author Location**: Header, footer, inline, or missing
- **Trust Signals**: Source citations, methodology, validation

**Actionability Assessment:**
- **Implementation Steps**: How-to guides, numbered procedures
- **Practical Guidance**: Concrete examples and use cases
- **Clear Next Actions**: CTAs, recommendations, next steps
- **Actionability Score**: 0-1 scale for practical usefulness
- **Example Extraction**: Specific actionable elements identified

**Pattern Analysis:**
- Sentence length distribution
- Claim density measurement (per 100 words)
- Temporal marker detection
- List structure identification
- Content chunking boundaries

### AI Slop Detection Patterns

**Common Generic Phrases Detected:**
- "delve into", "dive deep into", "unpack"
- "in today's digital landscape/age/world"
- "it's important to note that", "it's worth noting"
- "comprehensive guide to", "ultimate guide"
- "revolutionize", "transform", "game-changer", "game changing"
- "unlock the power/secrets of"
- "harness the potential", "leverage the power"
- "seamlessly integrate", "seamlessly"
- "robust solution", "cutting-edge", "innovative"
- "in conclusion", "to sum up" (at conclusion start)
- Overuse of "ensure", "enhance", "optimize", "streamline"
- "It goes without saying", "at the end of the day"

**Structural AI Patterns:**
- Lists starting with "Firstly", "Secondly", "Thirdly"
- Overuse of transition phrases
- Repetitive paragraph structures
- Lack of personal pronouns or anecdotes
- Overly formal or stilted language
- Missing contractions (always "do not" vs "don't")
- Perfect grammar with no natural flow breaks

**Rewrite Philosophy:**
- Suggestions match document's actual tone
- Focus on specificity over generalization
- Remove unnecessary hedging and qualifiers
- Replace buzzwords with concrete language
- Maintain authentic human voice

### Recommendation System

**High Priority (Do First):**
- Add answer-first summary (+40% citation likelihood)
- Fix heading hierarchy (2nd strongest predictor)
- Reduce passive voice (+40% semantic extraction)
- Remove AI-generated language patterns
- Add author attribution and credentials
- Include more statistical data (+35% citation)
- Add research citations

**Medium Priority (Do Next):**
- Increase active voice percentage (target: 80%+)
- Add original research or unique data
- Include expert perspectives
- Strengthen trust signals
- Increase content actionability
- Optimize sentence length (target 15-20 words)
- Add temporal markers

**Low Priority (Polish):**
- Replace remaining generic phrases
- Refine semantic triples
- Enhance list structures
- Improve chunking boundaries
- Add more concrete examples

### Output Formats

**Detailed Mode (default):**
- Complete metric breakdowns
- All recommendations with examples
- Prioritized action items
- Specific location references
- Before/after suggestions
- AI slop examples with rewrites
- Passive voice instances
- Data point specifics
- E-E-A-T analysis
- Actionability breakdown

**Summary Mode:**
- Top 3 scores only
- High-priority recommendations
- Quick-scan format
- Ideal for dashboards
- Key metrics at a glance

---

## 🏗️ Architecture

```
┌─────────────────┐
│ Claude Desktop  │
│    (MCP Client) │
└────────┬────────┘
         │ MCP Protocol (stdio)
         │
┌────────▼─────────────────────┐
│  @houtini/geo-analyzer       │
│  (MCP Server - Node.js)      │
└────────┬─────────────────────┘
         │ HTTPS
         │
┌────────▼─────────────────────┐
│  Your Cloudflare Worker      │
│  (API + Workers AI)          │
│                              │
│  ┌────────────────────────┐ │
│  │ Pattern Analyzer       │ │
│  │ - Structure detection  │ │
│  │ - Claim counting       │ │
│  │ - Entity extraction    │ │
│  └────────────────────────┘ │
│                              │
│  ┌────────────────────────┐ │
│  │ LLM Analyzer (70B)     │ │
│  │ - Semantic triples     │ │
│  │ - Writing quality      │ │
│  │ - AI slop detection    │ │
│  │ - E-E-A-T signals      │ │
│  │ - Data point analysis  │ │
│  └────────────────────────┘ │
│                              │
│  ┌────────────────────────┐ │
│  │ GEO Analyzer           │ │
│  │ - Score calculation    │ │
│  │ - Recommendations      │ │
│  │ - Competitive analysis │ │
│  └────────────────────────┘ │
└─┬──────┬─────────────────────┘
  │      │
  │      └──► Cloudflare Workers AI
  │           (Llama 3.3 70B)
  │           3,500 token output
  │
  └─────────► Jina AI Reader API
              (Content extraction)
```

### Analysis Pipeline

1. **Content Extraction** (Jina AI)
   - Fetch URL and extract clean markdown
   - Remove navigation, ads, footers
   - Preserve semantic structure

2. **Pattern Analysis** (JavaScript)
   - Fast, synchronous analysis
   - Count claims, sentences, words
   - Detect headings, lists, structure
   - Extract basic entities

3. **LLM Analysis** (Llama 3.3 70B)
   - Semantic triple extraction
   - Entity recognition and classification
   - Writing quality assessment
   - Passive voice detection
   - AI slop identification with confidence
   - Data point metrics calculation
   - E-E-A-T signal detection
   - Actionability scoring
   - Question coverage identification

4. **Score Calculation** (GEO Analyzer)
   - Combine pattern and LLM results
   - Calculate extractability score (0-10)
   - Calculate citability score (0-10)
   - Calculate overall GEO score (0-10)
   - Factor in writing quality
   - Consider data density
   - Weight E-E-A-T signals
   - Include actionability

5. **Recommendation Generation**
   - Prioritize by impact and effort
   - Provide specific location guidance
   - Include before/after examples
   - Generate AI slop rewrites
   - Suggest passive voice fixes
   - Recommend data additions
   - Identify E-E-A-T gaps
   - Propose actionability improvements

### Component Breakdown

**MCP Server** (`packages/mcp-server`)
- Implements Model Context Protocol
- Exposes 3 tools to Claude
- Handles request/response formatting
- Validates inputs and outputs

**Cloudflare Worker** (`packages/cloudflare-worker`)
- Serverless API endpoint
- Content fetching via Jina
- Pattern analysis engine
- LLM orchestration (3,500 tokens)
- Response aggregation

**Shared Types** (`packages/shared`)
- TypeScript definitions
- Schema validation
- API contracts

---

## 🔒 Privacy & Security

### Why Self-Hosted Architecture?

**Your Data, Your Control:**
- ✅ **No Shared Infrastructure** - Each user deploys their own Worker
- ✅ **No Data Storage** - Content analyzed in real-time, nothing persisted
- ✅ **No Tracking** - No analytics, telemetry, or usage monitoring
- ✅ **Your Logs** - Only you access Worker execution logs
- ✅ **Your Rate Limits** - Control your own usage and costs

**Security Features:**
- HTTPS-only communication
- Environment variable API keys
- Input validation and sanitization
- Content size limits (1MB max for text input)
- Cloudflare DDoS protection
- No CORS vulnerabilities (private Worker)

### Best Practices

**Protect Your Configuration:**
```bash
# Never commit secrets
echo "claude_desktop_config.json" >> .gitignore
```

**Monitor Usage:**
```bash
# Check Cloudflare dashboard
npx wrangler metrics
```

**Update Dependencies:**
```bash
npm audit
npm update
```

**Review Logs:**
```bash
npx wrangler tail
```

---

## 🚀 Development

### Local Development Setup

```bash
# Clone repository
git clone https://github.com/houtini/geo-analyzer.git
cd geo-analyzer

# Install dependencies
npm install

# Build all packages
npm run build
```

### Test MCP Server Locally

```bash
cd packages/mcp-server
npm run dev

# MCP server runs on stdio - test via Claude Desktop
```

### Test Cloudflare Worker Locally

```bash
cd packages/cloudflare-worker
npx wrangler dev

# Worker available at http://localhost:8787
# Test: curl http://localhost:8787/health
```

### Run Tests

```bash
npm test
```

### Project Structure

```
geo-analyzer/
├── packages/
│   ├── mcp-server/           # MCP protocol implementation
│   │   ├── src/
│   │   │   ├── index.ts      # Main MCP server
│   │   │   └── tools/        # Tool implementations
│   │   └── package.json
│   │
│   ├── cloudflare-worker/    # Serverless API
│   │   ├── src/
│   │   │   ├── index.ts      # Worker entry point
│   │   │   ├── analyzer/     # Analysis engines
│   │   │   │   ├── geo-analyzer.ts        # Score calculation + recommendations
│   │   │   │   ├── llm-analyzer.ts        # LLM analysis (NEW: AI slop, writing quality)
│   │   │   │   └── pattern-analyzer.ts     # Fast pattern matching
│   │   │   ├── jina/         # Jina API client
│   │   │   └── types/        # TypeScript types
│   │   ├── wrangler.toml     # Cloudflare config
│   │   └── package.json
│   │
│   └── shared/               # Shared types
│       ├── src/
│       └── package.json
│
├── docs/                     # Documentation
├── scripts/                  # Build scripts
├── IMPLEMENTATION-SCOPE.md   # Enhancement specifications
└── package.json              # Root package
```

---

## 🐛 Troubleshooting

### Issue: MCP Tools Not Appearing

**Symptoms:** Tools don't show up in Claude Desktop

**Solutions:**
1. **Restart Claude completely** (close all windows)
2. Check config file exists at correct location:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
3. Validate JSON syntax at [JSONLint](https://jsonlint.com)
4. Ensure `GEO_WORKER_URL` has no trailing slash
5. Verify Worker URL is accessible (visit in browser)

### Issue: Worker Deployment Failed

**Symptoms:** `wrangler deploy` errors

**Solutions:**
1. Login: `npx wrangler login`
2. Verify account active at [dash.cloudflare.com](https://dash.cloudflare.com)
3. Check Node.js version: `node --version` (need 20+)
4. Review `wrangler.toml` for typos
5. Try again - Cloudflare may be provisioning

### Issue: Analysis Timeout

**Symptoms:** Long waits or timeout errors

**Solutions:**
1. Check page is publicly accessible
2. Try simpler/smaller page first
3. Verify Workers AI enabled in account
4. Check Cloudflare status page
5. Large pages (>10k words) may take 30-60 seconds
6. Complex AI slop analysis adds 10-15 seconds

### Issue: "Content exceeds maximum size"

**Symptoms:** 1MB limit error

**Solutions:**
- Only affects `validate_rewrite` tool
- Split large content into sections
- For URL analysis, no limit applies
- 1MB ≈ 250,000 words (very large)

### Issue: Jina API Errors

**Symptoms:** 401 or rate limit errors

**Solutions:**
1. Verify API key at [jina.ai/reader](https://jina.ai/reader)
2. Check 1M token/month free tier limit
3. Remove key from config to use basic extraction
4. Wait for rate limit reset

### Issue: False Positive AI Slop Detection

**Symptoms:** Natural writing flagged as AI-generated

**Solutions:**
1. Check confidence score (>0.7 = high confidence)
2. Review specific phrases flagged
3. Consider document context and industry jargon
4. Some technical writing may naturally include flagged phrases
5. Focus on patterns, not isolated phrases

### Getting Help

1. **Check Worker logs:** `npx wrangler tail`
2. **Test Worker health:** Visit `https://your-worker.workers.dev/health`
3. **Review implementation scope:** See `IMPLEMENTATION-SCOPE.md`
4. **Open GitHub issue:** Include error messages and logs

---

## 💰 Pricing

### Cloudflare Workers (Your Cost)

**Free Tier:**
- 100,000 requests/day
- 10ms CPU time per request
- Workers AI: 10,000 neurons/day

**Paid Plans:**
- $5/month for 10M requests
- Workers AI: $0.011 per 1,000 neurons

**Typical Usage:**
- Analysis uses ~50 neurons
- Enhanced analysis (AI slop + writing quality) uses ~65 neurons
- ~150 analyses/day free
- ~150,000 analyses for $5/month

[Cloudflare Pricing →](https://workers.cloudflare.com/)

### Jina AI (Optional)

**Free Tier:**
- 1M tokens/month
- ~250 page analyses/day
- Clean markdown extraction

**Paid Plans:**
- Pay as you go after free tier
- $0.02 per 1,000 tokens

[Jina Pricing →](https://jina.ai/pricing)

### Total Cost Example

**Hobbyist (10 analyses/day):**
- Cloudflare: Free
- Jina: Free
- **Total: $0/month**

**Professional (100 analyses/day):**
- Cloudflare: Free
- Jina: Free
- **Total: $0/month**

**Agency (500 analyses/day):**
- Cloudflare: $5/month
- Jina: ~$3/month
- **Total: ~$8/month**

---

## 🗺️ Roadmap

### ✅ Completed (Current Version)

- [x] Core MCP server implementation
- [x] Cloudflare Worker deployment
- [x] GEO-16 framework integration
- [x] 10,000 word content support
- [x] AI slop detection with confidence scoring
- [x] Writing quality analysis (passive/active voice)
- [x] Data point metrics and analysis
- [x] E-E-A-T signal detection
- [x] Actionability assessment
- [x] Comprehensive recommendation system
- [x] iPullRank best practices integration

### Q1 2025

- [ ] Multi-language support
- [ ] Batch URL processing
- [ ] Custom AI slop phrase lists
- [ ] Tone matching improvements
- [ ] Historical trend tracking

### Q2 2025

- [ ] WordPress plugin
- [ ] Competitor auto-discovery
- [ ] A/B testing framework
- [ ] PDF/CSV export
- [ ] Real-time editing suggestions

### Q3 2025

- [ ] Chrome extension
- [ ] CI/CD integration
- [ ] Slack notifications
- [ ] Python SDK
- [ ] Custom scoring weights
- [ ] Machine learning slop detection

**Want to contribute?** See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📚 Additional Resources

### Research Papers

1. **Kumar, A. & Palkhouski, L. (2025)**  
   *AI Answer Engine Citation Behavior: An Empirical Analysis of the GEO-16 Framework*  
   arXiv:2509.10762  
   [Read paper →](https://arxiv.org/abs/2509.10762)

2. **Aggarwal, P. et al. (2024)**  
   *GEO: Generative Engine Optimization*  
   ACM SIGKDD Conference (KDD '24)  
   [Read paper →](https://arxiv.org/abs/2311.09735) | [DOI](https://doi.org/10.1145/3637528.3671900)

### Industry Best Practices

- **iPullRank AI Search Manual** - Active voice, originality, E-E-A-T signals
- **Google Search Quality Guidelines** - E-E-A-T framework
- **Content Optimization Research** - Data-driven recommendations

### Documentation

- [Implementation Scope](./IMPLEMENTATION-SCOPE.md) - Technical specifications
- [Security Audit](./SECURITY-AUDIT.md) - Security review
- [Contributing Guide](./CONTRIBUTING.md) - Contribution guidelines
- [Changelog](./CHANGELOG-GEO-UPDATE.md) - Version history
- [License](./LICENSE) - MIT License

### External Links

- [Anthropic MCP Documentation](https://docs.anthropic.com/mcp)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Jina AI Reader](https://jina.ai/reader)

---

## 🤝 Contributing

Contributions welcome! This is an open-source project under MIT license.

**Ways to Contribute:**
- Report bugs via GitHub issues
- Suggest features and improvements
- Submit pull requests
- Improve documentation
- Share usage examples
- Add AI slop patterns
- Improve detection accuracy

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file.

**Commercial use allowed** - you can use this tool for client work, agencies, and commercial projects.

---

## 🙏 Acknowledgments

Built on research from:

**Kumar, A. & Palkhouski, L.** - For the GEO-16 framework and empirical citation analysis

**Aggarwal, P., Murahari, V., Rajpurohit, T., Kalyan, A., Narasimhan, K., & Deshpande, A.** - For foundational GEO research and optimization methodology

**iPullRank** - For AI search optimization best practices and industry insights

**Anthropic** - For Model Context Protocol and Claude Desktop

**Cloudflare** - For Workers and Workers AI platform

**Jina AI** - For clean content extraction API

---

<div align="center">

**Built with ❤️ by [Houtini](https://houtini.ai)**

[Website](https://houtini.ai) • [Email](mailto:hello@houtini.ai) • [GitHub](https://github.com/houtini-ai)

**Version 1.1.0** - Enhanced with AI Slop Detection, Writing Quality Analysis, and Comprehensive E-E-A-T Scoring

</div>
