# GEO Analyzer

**Optimize your content for AI search engines like Perplexity, SearchGPT, and Google AI Overviews.**

GEO Analyzer is an MCP (Model Context Protocol) server that enables Claude to analyze web content using Generative Engine Optimization (GEO) principles. Chat with Claude to get actionable recommendations backed by peer-reviewed research.

## Features

- **Research-Validated**: Based on methods proven to increase AI search visibility by +41%
- **MCP Integration**: Works directly in Claude Desktop - no separate UI needed
- **Free Tier**: Analyze 246 URLs per day at zero cost
- **Edge Computing**: Lightning-fast analysis via Cloudflare Workers
- **Auto-Discovery**: Optionally find and analyze competitors automatically
- **Pattern-Based**: Core analysis works without API keys

## Quick Start

```bash
npm install -g @houtini/geo-analyzer
```

Add to Claude Desktop config (`~/.config/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "geo-analyzer": {
      "command": "npx",
      "args": ["@houtini/geo-analyzer"]
    }
  }
}
```

Chat with Claude:
```
"Analyze https://example.com for the query 'best CRM software'"
```

## Architecture

```
Claude Desktop → MCP Server (local) → Cloudflare Worker (edge) → Jina APIs
```

## Documentation

- [Installation Guide](docs/installation.md)
- [Usage Examples](docs/usage.md)
- [API Reference](docs/api.md)
- [GEO Principles](docs/geo-principles.md)

## Development

```bash
git clone https://github.com/houtini/geo-analyzer.git
cd geo-analyzer
npm install
npm run dev:worker  # Start Cloudflare Worker locally
npm run dev:mcp     # Build MCP server
```

## License

MIT - see [LICENSE](LICENSE)

## Credits

Built by [Houtini](https://houtini.ai)

Powered by:
- Cloudflare Workers & Workers AI
- Jina AI (Reader, Search APIs)
- Anthropic MCP SDK
