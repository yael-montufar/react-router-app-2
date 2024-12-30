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
    const callback = await shopify.auth.callback({
      rawRequest: event
    });

    // Here you would typically store the access token securely
    // For this minimal example, we'll just return a success message
    console.log('Authentication successful - Access Token:', callback.session.accessToken);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Authentication successful',
        shop: callback.session.shop
      })
    };
  } catch (error) {
    console.error('Auth callback error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication failed' })
    };
  }
} 