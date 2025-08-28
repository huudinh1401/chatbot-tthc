// Environment Configuration Helper
export const ENV = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://apttthc.nguyenluan.vn',
  API_KEY: import.meta.env.VITE_API_KEY || 'GIyBK7ge2fLWK8G6hXDh47xbm5sKVCZd',
  
  // API Endpoints
  ENDPOINTS: {
    CHAT: import.meta.env.VITE_API_CHAT_ENDPOINT || '/api/v1/chat',
    HEALTH: import.meta.env.VITE_API_HEALTH_ENDPOINT || '/api/v1/health',
    PROCEDURES: import.meta.env.VITE_API_PROCEDURES_ENDPOINT || '/api/v1/procedures'
  },
  
  // Development Configuration
  DEV_MODE: import.meta.env.VITE_DEV_MODE === 'true' || import.meta.env.DEV,
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
  
  // Environment Detection
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  MODE: import.meta.env.MODE
};

// Validation function
export const validateEnv = () => {
  const required = ['API_BASE_URL', 'API_KEY'];
  const missing = required.filter(key => !ENV[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    return false;
  }
  
  console.log('✅ Environment configuration loaded successfully');
  console.log('🔧 Current environment:', ENV.MODE);
  console.log('🌐 API Base URL:', ENV.API_BASE_URL);
  
  return true;
};

// Export for backward compatibility
export default ENV;
