# GEO Analyzer MCP

AI-powered content analysis tool for Generative Engine Optimization (GEO). Analyses web pages for AI search engine discoverability using semantic analysis, entity extraction and extractability scoring.

## 🎯 What is GEO?

Generative Engine Optimization (GEO) is the practice of optimizing content to appear in AI-generated responses from systems like ChatGPT, Claude, Perplexity and other LLM-based search engines.

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

✅ **Privacy**: Your analysis requests go through your own Worker  
✅ **No Shared Costs**: Each user pays for their own usage (free tier sufficient for most)  
✅ **Scalability**: No central bottleneck as the project grows  
✅ **Security**: No shared credentials or authentication complexity  
✅ **Control**: You control rate limits and usage

### Your Data

- **No Storage**: Content is analysed in real-time, nothing is persisted
- **No Tracking**: No analytics or usage tracking
- **Your Infrastructure**: Runs on your Cloudflare account
- **Your Logs**: Only you can access Worker logs and metrics

---

## 🏗️ Architecture

- **MCP Server** (`packages/mcp-server`): Claude Desktop integration via Model Context Protocol
- **Cloudflare Worker** (`packages/cloudflare-worker`): Serverless API with Cloudflare Workers AI
- **Shared Types** (`packages/shared`): TypeScript definitions

### Technology Stack

- **LLM Analysis**: Cloudflare Workers AI (Llama 3.3 70B)
- **Content Fetching**: Jina AI Reader API
- **Pattern Analysis**: Custom regex-based extractability scoring
- **MCP Protocol**: Claude Desktop tool integration

---

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Claude Desktop with MCP support
- Cloudflare account (free tier works)
- Jina AI API key (optional, free tier: https://jina.ai/)

### Step 1: Clone or Install

**Option A: Install from NPM** (when published):
```bash
npm install -g @houtini/geo-analyzer
```

**Option B: Clone for Development**:
```bash
git clone https://github.com/yourusername/geo-analyzer.git
cd geo-analyzer
npm install
npm run build
```

### Step 2: Deploy Your Cloudflare Worker

**⚠️ CRITICAL**: You must deploy your own Cloudflare Worker. There is no public endpoint.

#### Get Cloudflare Credentials

1. Sign up at https://cloudflare.com (free tier is sufficient)
2. Go to **Workers & Pages** > **Overview**
3. Note your **Account ID**
4. Create an **API token** with "Edit Workers" permissions

#### Deploy the Worker

```bash
cd packages/cloudflare-worker

# Login to Cloudflare
npx wrangler login

# Deploy the Worker
npx wrangler deploy
```

After deployment, you'll see:
```
✨ https://geo-analyzer.YOUR-SUBDOMAIN.workers.dev
```

**Save this URL** - you'll need it for MCP configuration.

### Step 3: Configure Claude Desktop (MCP)

Edit your Claude Desktop config file:
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**For NPM Installation**:
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

**For Local Development**:
```json
{
  "mcpServers": {
    "geo-analyzer": {
      "command": "node",
      "args": ["C:\\path\\to\\geo-analyzer\\packages\\mcp-server\\build\\index.js"],
      "env": {
        "GEO_WORKER_URL": "https://geo-analyzer.YOUR-SUBDOMAIN.workers.dev"
      }
    }
  }
}
```

### Step 4: Restart Claude Desktop

Completely quit Claude Desktop and restart it. The GEO Analyzer tools should now be available.

---

## 🎮 Usage

### Available MCP Tools

1. **analyze_url**: Analyse any web page for GEO optimization
2. **compare_extractability**: Compare multiple URLs side-by-side
3. **validate_rewrite**: Compare original versus optimized content

### Example: Analyse a URL

In Claude Desktop, ask:
```
Analyse https://notion.so for the query "project management software"
```

Claude will use the `analyze_url` tool and return:

- **Overall GEO Score**: Weighted average of extractability, readability and citability
- **Extractability Score**: How easily AI can extract facts
- **Readability Score**: Structural quality (headings, lists, chunking)
- **Citability Score**: Semantic richness (triples, entities, diversity)
- **Recommendations**: Specific improvements to increase GEO score

### Example: Compare Competitors

```
Compare GEO extractability scores for:
- https://notion.so
- https://asana.com
- https://monday.com

Query: "project management software"
```

### Example: Validate Content Optimization

```
I've rewritten this page to improve GEO. Can you validate the improvements?

Original URL: https://example.com/old-page
Optimized content: [paste your new content]
Query: "best running shoes"
```

---

## 🔧 Configuration

### Environment Variables

**Required**:
- `GEO_WORKER_URL`: Your deployed Cloudflare Worker URL

**Optional**:
- `JINA_API_KEY`: Your Jina AI API key (passed in API requests)

### Cloudflare Worker Settings

Edit `packages/cloudflare-worker/wrangler.toml` if needed:

```toml
name = "geo-analyzer"
main = "src/index.ts"
compatibility_date = "2025-01-01"

[ai]
binding = "AI"  # Cloudflare Workers AI binding
```

### AI Model Selection

The tool supports multiple Cloudflare AI models. Pass `aiModel` parameter in API requests:

- `@cf/meta/llama-3.3-70b-instruct-fp8-fast` (default - most capable)
- `@cf/meta/llama-3-8b-instruct` (faster, less capable)
- `@cf/meta/llama-3.1-8b-instruct` (alternative)
- `@cf/mistral/mistral-7b-instruct-v0.1` (Mistral alternative)

---

## 💰 Cost & Limits

### Cloudflare Workers AI (Free Tier)
- **10,000 neurons/day** free
- Each GEO analysis uses **~50 neurons**
- **~200 analyses per day** on free tier
- After free tier: £0.01 per 1,000 neurons

### Jina AI Reader (Free Tier)
- **1 million tokens/month** free
- Average page: **~4,000 tokens**
- **~250 pages per day** on free tier

### Cost Estimates

**Hobby Use** (10 analyses/day):
- Free tier covers everything
- £0/month

**Professional Use** (100 analyses/day):
- Cloudflare: £0 (under free tier)
- Jina: £0 (under free tier)
- Total: £0/month

**Heavy Use** (500 analyses/day):
- Cloudflare: ~£4/month (over free tier)
- Jina: £0 (under free tier)
- Total: ~£4/month

---

## 🛠️ Development

### Project Structure

```
geo-analyzer/
├── packages/
│   ├── cloudflare-worker/    # Serverless API + AI analysis
│   │   ├── src/
│   │   │   ├── index.ts       # Main API endpoint
│   │   │   ├── analyzer/      # GEO analysis logic
│   │   │   ├── jina/          # Jina AI client
│   │   │   └── types/         # TypeScript types
│   │   └── wrangler.toml      # Cloudflare config
│   ├── mcp-server/            # Claude Desktop integration
│   │   └── src/index.ts       # MCP tool definitions
│   └── shared/                # Shared TypeScript types
└── README.md
```

### Building Locally

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Deploy Cloudflare Worker
cd packages/cloudflare-worker
npm run deploy

# Test MCP server locally
cd packages/mcp-server
npm run build
node build/index.js
```

### Running Tests

```bash
# Test Cloudflare Worker locally
cd packages/cloudflare-worker
npx wrangler dev

# Test API endpoint
curl -X POST http://localhost:8787/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://notion.so",
    "query": "project management software"
  }'
```

---

## 🐛 Troubleshooting

### "GEO_WORKER_URL environment variable is required"

**Problem**: MCP server can't find your Cloudflare Worker URL.

**Solution**: Add `GEO_WORKER_URL` to your Claude Desktop config (see Installation Step 3).

### "LLM analysis failed"

**Problem**: Cloudflare Workers AI is returning errors.

**Solutions**:
- Check Cloudflare dashboard for Worker errors
- Verify AI binding is configured in `wrangler.toml`
- Check if you've exceeded free tier (10,000 neurons/day)
- View logs: `npx wrangler tail`

### "neuronsUsed: 0" in response

**Problem**: LLM is not being called.

**Solution**: 
- Check Worker logs: `npx wrangler tail`
- Verify AI binding is active
- Redeploy Worker: `npx wrangler deploy`

### MCP tools not appearing in Claude Desktop

**Solutions**:
1. Verify Claude Desktop config JSON is valid
2. Check paths and environment variables are correct
3. Restart Claude Desktop completely (quit, not just close window)
4. Check Claude logs for MCP errors

### Worker deployment fails

**Solutions**:
- Ensure you've run `npx wrangler login`
- Check your Cloudflare account has Workers enabled
- Verify your API token has "Edit Workers" permissions
- Try deploying from a different terminal/shell

---

## 📚 Understanding the Metrics

### Overall Score (0-10)
Weighted average of extractability, readability and citability. Higher scores indicate content optimized for AI citation.

### Extractability Score (0-10)
Measures how easily AI can extract discrete facts:
- **Sentence length**: Shorter sentences (15-20 words) = easier parsing
- **Claim density**: More factual statements per 100 words = more citable facts
- **Temporal markers**: Dates provide context and freshness signals

### Readability Score (0-10)
Measures structural quality:
- **Heading hierarchy**: Clear structure helps AI understand content organization
- **Lists and formatting**: Structured data is easier to parse
- **Section length**: Manageable chunks improve comprehension

### Citability Score (0-10)
Measures semantic richness:
- **Semantic triples**: Subject-predicate-object relationships for knowledge graphs
- **Entity diversity**: Variety of named entities (people, organizations, products)
- **Generic references**: Fewer "it", "this", "that" = clearer citations

### Recommendations

Each recommendation includes:
- **Method**: The optimization technique (e.g., "Claim Density Enhancement")
- **Priority**: High, medium or low
- **Current state**: What the analysis found
- **Suggested change**: Actionable improvement
- **Rationale**: Why this matters to AI systems

---

## 🔬 Research Methodology

The GEO research paper (Aggarwal et al., 2024) evaluated optimization methods across three categories:

### Content Enhancement
- Adding citations from credible sources
- Including statistical data and quantitative claims
- Adding quotations from authoritative sources

### Stylistic Optimization
- Improving fluency and readability
- Simplifying language
- Using authoritative tone
- Adding technical terminology

### Structural Improvements
- Breaking long sentences (target: 15-20 words)
- Adding temporal markers to claims
- Creating clear hierarchical structure

**Key Finding**: Traditional SEO methods like "keyword stuffing" performed poorly, while methods focused on **extractability** (claim density, semantic triples, entity extraction) performed best in the research study.

**Important**: Our tool provides **methodology-based analysis**, not performance predictions. We measure what the research identified as important factors, but do not guarantee specific outcomes for your content.

---

## 📄 Licence

MIT Licence - See LICENCE file for details

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Submit a pull request

### Development Guidelines

- Follow existing TypeScript patterns
- Add JSDoc comments for public APIs
- Update README for new features
- Test with multiple AI models
- Consider free tier limits in designs

---

## 📞 Support

- **Issues**: https://github.com/yourusername/geo-analyzer/issues
- **Discussions**: https://github.com/yourusername/geo-analyzer/discussions
- **Documentation**: https://github.com/yourusername/geo-analyzer/wiki

---

## ⚡ Quick Start Summary

1. Clone repository or install from npm
2. Deploy your own Cloudflare Worker (free tier works):
   ```bash
   cd packages/cloudflare-worker
   npx wrangler login
   npx wrangler deploy
   ```
3. Add Worker URL to Claude Desktop config
4. Restart Claude Desktop
5. Ask Claude: "Analyse https://example.com for the query 'your topic'"

**Remember**: Your Cloudflare Worker URL is private. Never share it publicly or commit it to repositories.

---

## 🎯 Roadmap

### Planned Features

- [ ] Multi-model support: GPT-4, Claude, Gemini analysis
- [ ] Batch processing: Analyse entire sitemaps
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

This project implements research methodologies from "GEO: Generative Engine Optimization" by Aggarwal et al. (2024). The research was conducted at Princeton University and IIT Delhi, with support from the National Science Foundation (Grant No. 2107048).

We thank the researchers for making their findings publicly available and contributing to the understanding of content optimization for AI systems.

---

**Built with ❤️ for the creator economy**
