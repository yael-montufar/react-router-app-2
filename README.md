# Shopify OAuth App

A minimal Shopify app that implements the OAuth flow for app installation using Netlify Functions.

## Setup

1. Create a new app in your Shopify Partner dashboard
2. Set up environment variables in a `.env` file:
   ```
   SHOPIFY_API_KEY=your_api_key
   SHOPIFY_API_SECRET=your_api_secret
   HOST_NAME=your-app-domain.netlify.app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

1. Install the Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```

3. Set up the environment variables in your Netlify dashboard

4. Update your app's URLs in the Shopify Partner dashboard:
   - App URL: `https://your-app-domain.netlify.app`
   - Allowed redirection URL(s): `https://your-app-domain.netlify.app/auth/callback`

## OAuth Flow

1. Shop visits the app installation URL: `https://your-app-domain.netlify.app?shop=your-shop.myshopify.com`
2. App redirects to Shopify's OAuth page
3. After authorization, Shopify redirects back to the callback URL
4. App verifies the request and receives the access token

## Features

- Minimal implementation of Shopify's OAuth flow
- Serverless functions using Netlify Functions
- TypeScript support
- No frontend - API only 