import { useState, useEffect } from 'react';

// Custom hook for managing chat state
export const useChat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('tthc-chat-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setChatHistory(parsedHistory);

        // KHÔNG tự động select chat - để user tự chọn hoặc tạo mới
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('tthc-chat-history', JSON.stringify(chatHistory));
    } else {
      // Xóa localStorage khi không có chat nào
      localStorage.removeItem('tthc-chat-history');
    }
  }, [chatHistory]);

  // Update current chat when currentChatId changes
  useEffect(() => {
    if (currentChatId) {
      const chat = chatHistory.find(c => c.id === currentChatId);
      setCurrentChat(chat || null);
    } else {
      setCurrentChat(null);
    }
  }, [currentChatId, chatHistory]);

  const createNewChat = (title = null) => {
    const newChat = {
      id: `chat-${Date.now()}`,
      title: title, // Có thể nhận title từ parameter
      messages: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    setChatHistory(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setCurrentChat(newChat);

    return newChat;
  };

  const updateChat = (updatedChat) => {
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === updatedChat.id 
          ? { ...updatedChat, lastUpdated: new Date().toISOString() }
          : chat
      )
    );

    // Update current chat if it's the one being updated
    if (currentChatId === updatedChat.id) {
      setCurrentChat({ ...updatedChat, lastUpdated: new Date().toISOString() });
    }
  };

  const selectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const deleteChat = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    
    if (currentChatId === chatId) {
      const remainingChats = chatHistory.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id);
      } else {
        setCurrentChatId(null);
        setCurrentChat(null);
      }
    }
  };

  const clearAllChats = () => {
    setChatHistory([]);
    setCurrentChatId(null);
    setCurrentChat(null);
    localStorage.removeItem('tthc-chat-history');
  };

  return {
    chatHistory,
    currentChatId,
    currentChat,
    createNewChat,
    updateChat,
    selectChat,
    deleteChat,
    clearAllChats
  };
};

// Custom hook for managing UI state
export const useUI = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Load UI preferences from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('tthc-sidebar-collapsed');
    const savedTheme = localStorage.getItem('tthc-theme');

    if (savedCollapsed !== null) {
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

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return {
    sidebarCollapsed,
    theme,
    toggleSidebar,
    toggleTheme
  };
};
