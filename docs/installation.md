# Installation Guide

## Prerequisites

- Node.js 18 or later
- Claude Desktop
- (Optional) Jina AI API key for enhanced features

## Quick Install

### Option 1: NPM Global Install (Recommended)

```bash
npm install -g @houtini/geo-analyzer
```

### Option 2: Use with npx (No Install)

```bash
npx @houtini/geo-analyzer
```

## Claude Desktop Configuration

Add to your Claude Desktop config file:

**macOS/Linux:** `~/.config/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

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

### With Jina API Key (Enhanced Features)

```json
{
  "mcpServers": {
    "geo-analyzer": {
      "command": "npx",
      "args": ["@houtini/geo-analyzer"],
      "env": {
        "JINA_API_KEY": "your_jina_api_key_here"
      }
    }
  }
}
```

### Custom Worker URL (Development)

```json
{
  "mcpServers": {
    "geo-analyzer": {
      "command": "npx",
      "args": ["@houtini/geo-analyzer"],
      "env": {
        "GEO_API_URL": "http://localhost:8787",
        "JINA_API_KEY": "your_jina_api_key_here"
      }
    }
  }
}
```

## Getting a Jina API Key

1. Visit https://jina.ai
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Add to your Claude Desktop config

**Free Tier:**
- 10M tokens per month
- ~246 analyses per day
- All features available

## Verify Installation

Restart Claude Desktop, then chat:

```
"Is the geo-analyzer MCP server available?"
```

Claude should confirm the tool is available.

## First Analysis

```
"Analyze https://example.com for the query 'best project management software'"
```

## Troubleshooting

### Tool Not Available

1. Check config file syntax (valid JSON)
2. Restart Claude Desktop completely
3. Check Claude Desktop logs for errors

### API Errors

1. Verify your Jina API key is correct
2. Check you haven't exceeded rate limits
3. Ensure the URL is accessible

### Connection Issues

1. Check internet connection
2. Verify Cloudflare Worker is accessible
3. Try custom worker URL if needed

## Next Steps

- [Usage Examples](usage.md)
- [API Reference](api.md)
- [GEO Principles](geo-principles.md)
