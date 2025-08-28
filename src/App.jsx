import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, App as AntdApp } from 'antd';

const { Content } = Layout;
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import { useChat, useUI } from './hooks/useChat';
import { ApiClient } from './config/api';
import { validateEnv } from './config/env';

function AppContent() {
  const { message } = AntdApp.useApp();

  const {
    chatHistory,
    currentChatId,
    currentChat,
    createNewChat,
    updateChat,
    selectChat,
    deleteChat,
    clearAllChats
  } = useChat();

  const {
    sidebarCollapsed,
    theme,
    toggleSidebar,
    toggleTheme
  } = useUI();

  // Validate environment and check API health on app start
  useEffect(() => {
    // Validate environment configuration
    if (!validateEnv()) {
      message.error('Cấu hình môi trường không hợp lệ. Vui lòng kiểm tra file .env');
      return;
    }

    const checkApiHealth = async () => {
      try {
        await ApiClient.get('/api/v1/health');
        // Tắt thông báo thành công - chỉ log console
        console.log('✅ API Health Check: Connected successfully');
      } catch (error) {
        console.error('API Health Check failed:', error);
        message.error('Không thể kết nối đến server. Vui lòng kiểm tra lại.');
      }
    };

    checkApiHealth();
  }, [message]);

  // Không tự động tạo chat - chỉ tạo khi user hỏi câu đầu tiên

  const handleNewChat = (title = null) => {
    return createNewChat(title); // Return chat object với title để ChatContainer có thể sử dụng
  };

  const handleSelectChat = (chatId) => {
    selectChat(chatId);
  };

  const handleGoHome = () => {
    // Về màn hình home - không chọn chat nào
    selectChat(null);
  };

  // Handle mobile overlay click
  const handleOverlayClick = () => {
    if (window.innerWidth <= 768 && !sidebarCollapsed) {
      toggleSidebar();
    }
  };

  const handleUpdateChat = (updatedChat) => {
    updateChat(updatedChat);
  };

  const appStyle = {
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-primary)',
    margin: 0,
    padding: 0
  };

  return (
    <div style={appStyle} data-theme={theme}>
      <Layout
        hasSider
        style={{
          height: '100vh',
          width: '100vw',
          margin: 0,
          padding: 0
        }}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onNewChat={handleNewChat}
          chatHistory={chatHistory}
          onSelectChat={handleSelectChat}
          currentChatId={currentChatId}
          theme={theme}
          onToggleTheme={toggleTheme}
          onClearAllChats={clearAllChats}
          onGoHome={handleGoHome}
        />

        <Content>
          {/* Mobile overlay */}
          {!sidebarCollapsed && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999,
                display: window.innerWidth <= 768 ? 'block' : 'none'
              }}
              onClick={handleOverlayClick}
            />
          )}

          <Routes>
            <Route
              path="/"
              element={
                <ChatContainer
                  collapsed={sidebarCollapsed}
                  onToggleSidebar={toggleSidebar}
                  currentChat={currentChat}
                  onUpdateChat={handleUpdateChat}
                  onNewChat={handleNewChat}
                  theme={theme}
                />
              }
            />
            <Route
              path="/chat/:chatId"
              element={
                <ChatContainer
                  collapsed={sidebarCollapsed}
                  onToggleSidebar={toggleSidebar}
                  currentChat={currentChat}
                  onUpdateChat={handleUpdateChat}
                  onNewChat={handleNewChat}
                  theme={theme}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Layout>
    </div>
  );
}

function App() {
  return (
    <AntdApp>
      <AppContent />
    </AntdApp>
  );
}

export default App;
