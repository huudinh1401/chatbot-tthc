// Utility functions for the TTHC Assistant

// Format timestamp to readable format
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMs = now - date;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return 'Vừa xong';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  } else {
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};

// Generate chat title from first message
export const generateChatTitle = (message) => {
  if (!message) return 'Cuộc trò chuyện mới';
  
  // Remove special characters and limit length
  const cleanMessage = message.replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF]/gi, '').trim();
  return cleanMessage.length > 50 ? cleanMessage.substring(0, 50) + '...' : cleanMessage;
};

// Validate message content
export const validateMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Tin nhắn không hợp lệ' };
  }
  
  const trimmedMessage = message.trim();
  
  if (trimmedMessage.length === 0) {
    return { isValid: false, error: 'Tin nhắn không được để trống' };
  }
  
  if (trimmedMessage.length > 2000) {
    return { isValid: false, error: 'Tin nhắn quá dài (tối đa 2000 ký tự)' };
  }
  
  return { isValid: true, message: trimmedMessage };
};

// Extract procedure code from message
export const extractProcedureCode = (message) => {
  const codePattern = /\b\d+\.\d+\b/g;
  const matches = message.match(codePattern);
  return matches ? matches[0] : null;
};

// Check if message is asking for procedure details
export const isProcedureDetailQuery = (message) => {
  const detailKeywords = [
    'chi tiết',
    'thông tin',
    'hướng dẫn',
    'quy trình',
    'cách làm',
    'thủ tục',
    'giấy tờ',
    'hồ sơ'
  ];
  
  const lowerMessage = message.toLowerCase();
  return detailKeywords.some(keyword => lowerMessage.includes(keyword));
};

// Format procedure data for display
export const formatProcedureData = (procedure) => {
  return {
    code: procedure.ma_hoso || 'N/A',
    title: procedure.ten_thutuc || 'Không có tiêu đề',
    description: procedure.mo_ta || '',
    department: procedure.co_quan || 'Không xác định',
    level: procedure.cap_thuc_hien || 'Không xác định'
  };
};

// Debounce function for search input
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
      return false;
    }
  }
};

// Error handling helpers
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || error.message;
    
    switch (status) {
      case 401:
        return 'Không có quyền truy cập. Vui lòng kiểm tra API key.';
      case 403:
        return 'Truy cập bị từ chối.';
      case 404:
        return 'Không tìm thấy dịch vụ.';
      case 429:
        return 'Quá nhiều yêu cầu. Vui lòng thử lại sau.';
      case 500:
        return 'Lỗi server. Vui lòng thử lại sau.';
      default:
        return message || 'Có lỗi xảy ra khi kết nối đến server.';
    }
  } else if (error.request) {
    // Network error
    return 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.';
  } else {
    // Other error
    return error.message || 'Có lỗi không xác định xảy ra.';
  }
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      console.error('Failed to copy text:', fallbackError);
      return false;
    }
  }
};

// Generate unique ID
export const generateId = (prefix = '') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}${timestamp}-${random}`;
};

// Scroll to element smoothly
export const scrollToElement = (element, options = {}) => {
  if (!element) return;
  
  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };
  
  element.scrollIntoView({ ...defaultOptions, ...options });
};
