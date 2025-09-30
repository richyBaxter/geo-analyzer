# 🚀 GEO Analyzer MCP

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/houtini/geo-analyzer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)

AI-powered content analysis for Generative Engine Optimization (GEO). Analyze how well your content performs in Claude, ChatGPT, and Perplexity responses.

**Built on peer-reviewed research** from ACM SIGKDD 2024.

![GEO Analysis Demo](docs/demo.jpg)
*Claude analyzing a page and providing actionable GEO recommendations*

---

## ⚡ Quick Start

### Option 1: One-Click Deploy (Recommended)

1. **Click "Deploy to Cloudflare" above** ☝️
2. **Sign in** to your Cloudflare account
3. **Fork repository** (done automatically)
4. **Worker deploys** automatically to your account
5. **Copy your Worker URL** (shown after deployment)
6. **Configure Claude Desktop** - Add to your config:
   ```json
   {
     "mcpServers": {
       "geo-analyzer": {
         "command": "npx",
         "args": ["-y", "@houtini/geo-analyzer"],
         "env": {
           "GEO_WORKER_URL": "https://geo-analyzer.YOUR-SUBDOMAIN.workers.dev"
         }
       }
     }
   }
   ```
7. **Restart Claude Desktop**
8. **Test it**: Ask Claude `"Analyze https://example.com for 'your topic'"`

### Option 2: Manual Setup

**[See detailed manual setup guide below ↓](#installation)**

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ **Cloudflare Account** - Free tier is sufficient ([Sign up](https://dash.cloudflare.com/sign-up))
- ✅ **Claude Desktop** - With MCP support ([Download](https://claude.ai/download))
- ✅ **Node.js 20+** - For local development ([Download](https://nodejs.org/))
- ⏩ **Jina AI API Key** - Optional, free tier available ([Get key](https://jina.ai/))

---

## 🎯 What is GEO?

Generative Engine Optimization (GEO) is the practice of optimizing content to appear in AI-generated responses from systems like ChatGPT, Claude, Perplexity and other LLM-based search engines.

### Key Metrics Analyzed

| Metric | Target | What It Measures |
|--------|--------|------------------|
| **Claim Density** | 4.0+ claims per 100 words | Factual statements AI can extract and cite |
| **Sentence Length** | ~20 words average | Optimal length for AI parsing |
| **Semantic Triples** | High density | Subject-predicate-object relationships |
| **Entity Diversity** | Multiple types | Breadth of named entities (PERSON, ORG, PRODUCT) |
| **Date Markers** | Present | Temporal context for freshness signals |

### The Research Behind GEO

This tool implements methodologies from academic GEO research, focusing on:

**Extractability Metrics:**
- **Claim Density**: Factual statements per 100 words (target: 4.0+)
- **Sentence Length**: Optimal length for AI parsing (target: ~20 words)
- **Date Markers**: Temporal context for freshness signals

**Semantic Analysis:**
- **Semantic Triples**: Subject-predicate-object relationships
- **Entity Extraction**: Named entities (PERSON, ORGANIZATION, PRODUCT, etc.)
- **Entity Diversity**: Breadth of entity types for rich context

**Structural Factors:**
- **Chunking**: How content breaks into digestible units
- **Coherence**: Self-contained versus requires external context
- **Query Alignment**: Relevance to target search queries

### Key Difference from SEO

Traditional SEO optimizes for search engine ranking algorithms. GEO optimizes for:
- LLM citation and summarization
- AI-generated answer inclusion
- Semantic understanding and knowledge extraction

The methodology focuses on making content more "extractable" by AI systems through objective analysis of structural and semantic patterns.

### Research Foundation

This tool is based on research from:

**Aggarwal, P., Murahari, V., Rajpurohit, T., Kalyan, A., Narasimhan, K., & Deshpande, A. (2024).**  
*GEO: Generative Engine Optimization.*  
Proceedings of the 30th ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD '24),  
August 25–29, 2024, Barcelona, Spain.  
DOI: [10.1145/3637528.3671900](https://doi.org/10.1145/3637528.3671900)  
arXiv: [2311.09735](https://arxiv.org/abs/2311.09735)

The research evaluated 9 optimization methods across 10,000 diverse queries, identifying key factors that influence visibility in generative engine responses. Our implementation provides objective measurement of these factors without making performance guarantees.

---

## 🔒 Security & Privacy Model

**Important**: This tool has NO public API endpoint. You must deploy your own Cloudflare Worker to use it.

### Why This Approach?

| Benefit | Explanation |
|---------|-------------|
| ✅ **Privacy** | Your analysis requests go through your own Worker |
| ✅ **No Shared Costs** | Each user pays for their own usage (free tier sufficient) |
| ✅ **Scalability** | No central bottleneck as the project grows |
| ✅ **Security** | No shared credentials or authentication complexity |
| ✅ **Control** | You control rate limits and usage |

### Your Data

- **No Storage**: Content is analyzed in real-time, nothing is persisted
- **No Tracking**: No analytics or usage tracking
- **Your Infrastructure**: Runs on your Cloudflare account
- **Your Logs**: Only you can access Worker logs and metrics

---

## 🏗️ Architecture

```mermaid
graph LR
    A[Claude Desktop] -->|MCP Protocol| B[MCP Server]
    B -->|HTTPS| C[Your Cloudflare Worker]
    C -->|Content Fetch| D[Jina AI API]
    C -->|Semantic Analysis| E[Workers AI - Llama 3.3]
    E -->|Scores & Recommendations| F[GEO Analysis Results]
    F -->|JSON Response| A
```

### Components

- **MCP Server** (`packages/mcp-server`): Claude Desktop integration via Model Context Protocol
- **Cloudflare Worker** (`packages/cloudflare-worker`): Serverless API with Workers AI
- **Shared Types** (`packages/shared`): TypeScript definitions

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **LLM Analysis** | Cloudflare Workers AI (Llama 3.3 70B) | Semantic triple extraction |
| **Content Fetching** | Jina AI Reader API | Clean content extraction |
| **Pattern Analysis** | Custom regex scoring | Extractability metrics |
| **MCP Protocol** | Anthropic MCP SDK | Claude Desktop integration |

---

## 📦 Installation

### Manual Setup (Alternative to Deploy Button)

#### Prerequisites

- Node.js 20+ and npm
- Claude Desktop with MCP support
- Cloudflare account (free tier works)
- Jina AI API key (optional, free tier: https://jina.ai/)

#### Step 1: Clone or Install

**Option A: Install from NPM** (when published):
```bash
npm install -g @houtini/geo-analyzer
```

**Option B: Clone for Development**:
```bash
git clone https://github.com/houtini/geo-analyzer.git
cd geo-analyzer
npm install
npm run build
```

#### Step 2: Deploy Your Cloudflare Worker

```bash
cd packages/cloudflare-worker

# Login to Cloudflare (first time only)
npx wrangler login

# Deploy your worker
npx wrangler deploy
```

**Save the Worker URL** displayed after deployment. It will look like:
```
https://geo-analyzer.YOUR-SUBDOMAIN.workers.dev
```

#### Step 3: Configure Claude Desktop

**Location of config file:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Add this configuration**:

```json
{
  "mcpServers": {
    "geo-analyzer": {
      "command": "npx",
      "args": ["-y", "@houtini/geo-analyzer"],
      "env": {
        "GEO_WORKER_URL": "https://geo-analyzer.YOUR-SUBDOMAIN.workers.dev",
        "JINA_API_KEY": "your-jina-key-here"
      }
    }
  }
}
```

**Configuration Variables:**

| Variable | Required | Description |
|----------|----------|-------------|
| `GEO_WORKER_URL` | ✅ Yes | Your deployed Worker URL |
| `JINA_API_KEY` | ⏩ Optional | Free tier: 1M tokens/month - [Get key](https://jina.ai/) |

**Without Jina API Key:**
- Analysis still works but uses basic content extraction
- Jina Reader provides cleaner, more accurate content parsing
- Recommended for production use

#### Step 4: Restart Claude Desktop

Close and reopen Claude Desktop completely for the MCP server to connect.

#### Step 5: Test It

Ask Claude:
```
Analyze https://example.com for the query "best practices"
```

Claude will use the GEO Analyzer tool to provide detailed extractability metrics and recommendations.

---

## 🎨 Usage Examples

### Basic Analysis

```
Analyze https://yoursite.com/blog/article for "content marketing"
```

### Compare Multiple URLs

```
Compare GEO scores for these URLs:
- https://site1.com/page
- https://site2.com/page
- https://site3.com/page

Target query: "your topic"
```

### Validate Content Improvements

```
I rewrote this content. Compare it to the original at https://site.com/original

[Your optimized content here]

Target query: "your topic"
```

---

## 🌟 Features

### Three Powerful Tools

| Tool | Purpose | Use Case |
|------|---------|----------|
| **analyze_url** | Single page analysis | Audit existing content |
| **compare_extractability** | Side-by-side comparison (2-5 URLs) | Competitor analysis |
| **validate_rewrite** | Before/after comparison | Prove optimization works |

### AI Model Selection

The tool supports multiple Cloudflare AI models:

| Model | Speed | Capability | Best For |
|-------|-------|------------|----------|
| `@cf/meta/llama-3.3-70b-instruct-fp8-fast` | Fast | Highest | **Production (default)** |
| `@cf/meta/llama-3-8b-instruct` | Faster | Good | Quick analysis |
| `@cf/meta/llama-3.1-8b-instruct` | Fastest | Basic | Development |
| `@cf/mistral/mistral-7b-instruct-v0.1` | Fast | Alternative | Comparison testing |

**Usage:**
Pass `aiModel` parameter in API requests or tool calls.

### Detailed Metrics Provided

#### Overall Scores (0-10 scale)
- **Overall Score**: Combined weighted average
- **Extractability**: How easily AI can pull facts
- **Readability**: How well-structured for AI parsing
- **Citability**: How quotable and attributable

#### Granular Analysis
- Sentence length distribution
- Claim density measurements
- Semantic triple identification
- Entity extraction and diversity
- Temporal marker detection
- Content chunking analysis
- Query alignment scoring

#### Actionable Recommendations
- Prioritized by impact (high/medium/low)
- Specific location references
- Before/after examples
- Clear rationale for each suggestion

---

## 🔧 Advanced Configuration

### Custom Worker Configuration

Edit `packages/cloudflare-worker/wrangler.toml`:

```toml
name = "my-geo-analyzer"
main = "src/index.ts"
compatibility_date = "2025-01-01"

[observability]
enabled = true

[ai]
binding = "AI"
```

### MCP Server Development

```bash
cd packages/mcp-server
npm run dev
```

### Local Testing

```bash
# Test MCP server locally
cd packages/mcp-server
npm run build
node dist/index.js

# Test Worker locally
cd packages/cloudflare-worker
npx wrangler dev
```

---

## 🔍 Troubleshooting

### Common Issues

#### ❌ "Worker deployment failed"

**Symptoms:** Error during `wrangler deploy`

**Solutions:**
1. Ensure you're logged in: `npx wrangler login`
2. Check Cloudflare account is active and verified
3. Verify Node.js version: `node --version` (should be 20+)
4. Check for typos in `wrangler.toml`
5. Try deploying again - Cloudflare may be provisioning resources

#### ❌ "MCP server not connecting"

**Symptoms:** Tools don't appear in Claude Desktop

**Solutions:**
1. **Restart Claude Desktop completely** (close all windows)
2. Check config file location:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
3. Verify JSON syntax is valid (use [JSONLint](https://jsonlint.com/))
4. Check `GEO_WORKER_URL` has no trailing slash
5. Ensure Worker URL is accessible (open in browser - should show `{"error":"Not found"}`)
6. Look for errors in Claude Desktop logs

#### ❌ "API error: 401"

**Symptoms:** Analysis fails with authentication error

**Solutions:**
1. Check `JINA_API_KEY` is correctly set in Claude config
2. Verify API key at [Jina AI dashboard](https://jina.ai/)
3. Ensure no extra spaces or quotes in API key
4. Try without Jina API key (analysis will use basic extraction)

#### ❌ "Analysis timing out"

**Symptoms:** Long wait times or timeout errors

**Solutions:**
1. Check page is publicly accessible (not behind login/paywall)
2. Try a smaller/simpler page first
3. Verify Cloudflare Workers AI is enabled in your account
4. Check Cloudflare dashboard for any service issues
5. Consider the page size - very large pages may take longer

#### ❌ "Content exceeds maximum size"

**Symptoms:** Error about 1MB limit

**Solutions:**
1. This only affects the `validate_rewrite` tool
2. Content must be under 1MB (roughly 250,000 words)
3. For normal URL analysis, there's no size limit
4. Try analyzing the original URL instead

#### ❌ "Invalid Worker URL"

**Symptoms:** MCP server fails to start

**Solutions:**
1. URL must include `https://` protocol
2. URL must be a `.workers.dev` domain or custom domain
3. No trailing slashes
4. Copy exactly from Wrangler deployment output

### Getting Help

If you're stuck:

1. **Check Worker logs**: `npx wrangler tail` in worker directory
2. **Test Worker directly**: Visit Worker URL in browser
3. **Verify MCP connection**: Look for "Connected" status in Claude
4. **Review security audit**: See `SECURITY-AUDIT.md` for security best practices

---

## 🔒 Security & Best Practices

### Security Features

- **No public endpoints**: You deploy your own private Cloudflare Worker
- **API key protection**: Jina API key handled securely via environment variables
- **Input validation**: All inputs validated and sanitised
- **Content size limits**: Maximum 1MB per analyze request
- **Rate limiting**: Cloudflare provides automatic DDoS protection
- **HTTPS only**: All communication encrypted via TLS

### Best Practices

#### Protecting Your Worker URL

```bash
# Never commit your Worker URL to version control
# Add to .gitignore:
echo "claude_desktop_config.json" >> .gitignore
```

#### Dependency Security

```bash
# Regularly audit dependencies
npm audit
npm audit fix

# Update dependencies
npm update
```

#### Monitoring Usage

```bash
# Check your Cloudflare Workers usage
npx wrangler metrics
```

For detailed security information, see [SECURITY-AUDIT.md](./SECURITY-AUDIT.md).

---

## 🎯 Roadmap

### Planned Features

- [ ] Multi-model support: GPT-4, Claude, Gemini analysis
- [ ] Batch processing: Analyze entire sitemaps
- [ ] Historical tracking: Track GEO scores over time
- [ ] Competitor monitoring: Automated competitor analysis
- [ ] WordPress plugin: Direct CMS integration
- [ ] Export reports: PDF/CSV report generation
- [ ] Cost calculator: Estimate monthly costs
- [ ] Rate limiting: Built-in request throttling

### Research Extensions

- [ ] Image optimization: Alt text and caption analysis
- [ ] Voice search: Conversational query optimization
- [ ] Video content: Transcript and caption analysis
- [ ] Structured data: Schema.org markup validation
- [ ] Multi-language: Support for non-English content

---

## 🙏 Acknowledgements

This project is built on research from:

**Aggarwal, P., Murahari, V., Rajpurohit, T., Kalyan, A., Narasimhan, K., & Deshpande, A. (2024).**  
*GEO: Generative Engine Optimization.*  
ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD '24)  
[DOI: 10.1145/3637528.3671900](https://doi.org/10.1145/3637528.3671900) | [arXiv: 2311.09735](https://arxiv.org/abs/2311.09735)

We thank the researchers for making their findings publicly available and contributing to the understanding of content optimization for AI systems.

---

**Built with ❤️ for the creator economy by [Houtini](https://houtini.ai)**

**Contact:** hello@houtini.ai
