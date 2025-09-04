import { useState, useEffect } from 'react';

// Custom hook for managing chat state
export const useChat = () => {
  
  const [currentChat, setCurrentChat] = useState(null);

  

  const createNewChat = (title = null) => {
    const newChat = {
      id: `chat-${Date.now()}`,
      title: title, // Có thể nhận title từ parameter
      messages: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    setCurrentChat(newChat);

    return newChat;
  };

  const updateChat = (updatedChat) => {
    setCurrentChat({ ...updatedChat, lastUpdated: new Date().toISOString() });
  };

  const clearAllChats = () => {
    setCurrentChat(null);
  };

  return {
    currentChat,
    createNewChat,
    updateChat,
    clearAllChats
  };
};

// Custom hook for managing UI state
export const useUI = () => {
  // Check if mobile on initial load
  const isMobile = () => window.innerWidth <= 768;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile());
  const [theme, setTheme] = useState('dark');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Load UI preferences from localStorage and handle mobile
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('tthc-sidebar-collapsed');
    const savedTheme = localStorage.getItem('tthc-theme');

    // On mobile, always start collapsed
    if (isMobile()) {
      setSidebarCollapsed(true);
    } else if (savedCollapsed !== null) {
      setSidebarCollapsed(JSON.parse(savedCollapsed));
    }

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Set dark mode as default if no saved preference
      setTheme('dark');
    }
  }, []);

  // Save UI preferences to localStorage
  useEffect(() => {
    localStorage.setItem('tthc-sidebar-collapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    localStorage.setItem('tthc-theme', theme);
  }, [theme]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      if (newWidth <= 768) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return {
    sidebarCollapsed,
    theme,
    windowWidth,
    isMobile: windowWidth <= 768,
    toggleSidebar,
    toggleTheme
  };
};
