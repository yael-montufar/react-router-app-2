import type { HandlerEvent } from "@netlify/functions";
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: ['read_orders'],
  hostName: process.env.HOST_NAME!,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false
});

export async function handler(event: HandlerEvent) {
  try {
    const { shop } = event.queryStringParameters || {};
    
    if (!shop) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing shop parameter' })
      };
    }

    // Begin OAuth
    const authRoute = await shopify.auth.begin({
      shop,
      callbackPath: '/auth/callback',
      isOnline: false,
      rawRequest: event
    });

    return {
      statusCode: 302,
      headers: {
        Location: authRoute.destinationUrl
      },
      body: ''
    };
  } catch (error) {
    console.error('Installation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Installation failed' })
    };
  }
} 