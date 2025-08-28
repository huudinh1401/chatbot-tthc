import { ENV } from './env.js';

// API Configuration from Environment Variables
export const API_CONFIG = {
  BASE_URL: ENV.API_BASE_URL,
  API_KEY: ENV.API_KEY,
  ENDPOINTS: ENV.ENDPOINTS,
  DEV_MODE: ENV.DEV_MODE,
  LOG_LEVEL: ENV.LOG_LEVEL
};

// Conditional logging helper
const log = (level, message, data = {}) => {
  if (API_CONFIG.DEV_MODE && (API_CONFIG.LOG_LEVEL === 'debug' || level !== 'debug')) {
    console[level](message, data);
  }
};

// API Headers
export const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_CONFIG.API_KEY}`
});

// API Client
export class ApiClient {
  static async post(endpoint, data) {
    try {
      log('log', '🚀 API POST Request:', {
        url: `${API_CONFIG.BASE_URL}${endpoint}`,
        endpoint,
        data,
        headers: getHeaders(),
        timestamp: new Date().toISOString()
      });

      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
      });

      console.log('📡 API Response Status:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ API Success Response:', {
        data: result,
        timestamp: new Date().toISOString()
      });

      return result;
    } catch (error) {
      console.error('💥 API Error:', {
        message: error.message,
        stack: error.stack,
        endpoint,
        data,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }

  static async get(endpoint) {
    try {
      console.log('🚀 API GET Request:', {
        url: `${API_CONFIG.BASE_URL}${endpoint}`,
        endpoint,
        headers: getHeaders(),
        timestamp: new Date().toISOString()
      });

      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders()
      });

      console.log('📡 API GET Response Status:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API GET Error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ API GET Success:', {
        data: result,
        timestamp: new Date().toISOString()
      });

      return result;
    } catch (error) {
      console.error('💥 API GET Error:', {
        message: error.message,
        endpoint,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }

  // Stream endpoint for procedure details - theo mẫu demo HTML
  static async getStream(endpoint) {
    try {
      console.log('🚀 Stream API Request:', {
        url: `${API_CONFIG.BASE_URL}${endpoint}`,
        endpoint,
        timestamp: new Date().toISOString()
      });

      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          ...getHeaders(),
          'Accept': 'text/event-stream',
          'Cache-Control': 'no-cache'
        }
      });

      console.log('📡 Stream Response Status:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      console.error('💥 Stream API Error:', {
        message: error.message,
        endpoint,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }
}
