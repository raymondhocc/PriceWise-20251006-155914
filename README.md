# PriceWise AI

An AI-powered price scraping and analysis solution with a conversational UI for real-time market insights and strategic pricing decisions.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/Price-Scrapping-20250930-053437)

PriceWise AI is an intelligent price scraping and market analysis platform. It leverages a conversational AI agent to automate the extraction of pricing data from specified web pages. The AI is designed to understand and parse dynamic web structures, ensuring reliable data collection. The platform then processes this data to compute key metrics like cross-market pricing indexes and analyzes the potential impact of price changes on gross margins. All insights are presented in a clean, intuitive, and visually stunning dashboard, featuring interactive charts and data tables.

## Key Features

- **AI-Powered Data Extraction**: Leverages an LLM-powered conversational agent to reliably scrape pricing data from dynamic web pages.
- **Conversational Command Bar**: Interact with the platform using natural language commands to initiate scrapes, request analysis, and manage targets.
- **Advanced Analytics**: Automatically computes cross-market pricing indexes and analyzes the impact of price changes on gross margins.
- **Interactive Dashboard**: Visualize market trends, competitor pricing, and product data through a beautiful and responsive dashboard.
- **Real-time Monitoring**: Keep a constant pulse on the market by managing and monitoring a list of target websites.

## Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, Recharts, Framer Motion, Zustand
- **Backend**: Cloudflare Workers, Hono
- **AI & State Management**: Cloudflare Agents (Durable Objects), Cloudflare Agents SDK

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- A [Cloudflare account](https://dash.cloudflare.com/sign-up).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd pricewise_ai
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Configure Environment Variables:**

    Create a `.dev.vars` file in the root of the project and add your Cloudflare AI Gateway credentials. You can get these from your Cloudflare Dashboard.

    ```ini
    # .dev.vars

    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

    > **Note**: The AI features will not work without valid credentials.

### Running Locally

Start the development server, which includes the Vite frontend and the Cloudflare Worker backend:

```bash
bun dev
```

The application will be available at `http://localhost:3000`.

## Usage

Once the application is running, you can interact with it through the command bar on the dashboard.

- **Monitor a new product:**
  `monitor https://example.com/product-page`

- **Request an analysis:**
  `calculate price index for Product X`

- **Simulate a price change:**
  `show margin impact for a 10% price drop on Product Y`

The dashboard components (KPI cards, charts, and data table) will update to reflect the results of your commands.

## Development

The project is structured into two main parts:

-   `src/`: Contains the React frontend application code.
-   `worker/`: Contains the Cloudflare Worker backend code, including the Hono router and the ChatAgent Durable Object.

### Scripts

-   `bun dev`: Starts the local development server.
-   `bun lint`: Lints the codebase.
-   `bun build`: Builds the frontend and worker for production.
-   `bun deploy`: Deploys the application to Cloudflare Workers.

## Deployment

This project is designed for easy deployment to Cloudflare's global network.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/Price-Scrapping-20250930-053437)

### Manual Deployment Steps

1.  **Login to Wrangler:**
    ```bash
    bunx wrangler login
    ```

2.  **Configure Secrets:**
    Before deploying, you must set your Cloudflare AI secrets in your Worker's settings via the Cloudflare dashboard or using the command line:
    ```bash
    bunx wrangler secret put CF_AI_API_KEY
    ```
    You will also need to update the `CF_AI_BASE_URL` in `wrangler.jsonc` with your actual AI Gateway endpoint.

3.  **Deploy the application:**
    ```bash
    bun deploy
    ```

This command will build and deploy your application, making it available at the URL provided in the output.

## Important Note on AI Capabilities

Please be aware that while this project is fully equipped with AI capabilities, it does not come pre-configured with API keys for security reasons. To enable AI inferencing, you must:

1.  Fork or clone this repository.
2.  Obtain your own API keys from Cloudflare AI Gateway.
3.  Add them as secrets to your Cloudflare Worker environment as described in the deployment section.

Without these steps, the AI-powered features will not function.