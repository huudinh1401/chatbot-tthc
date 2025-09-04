import React, { useEffect } from 'react';

import { Layout, App as AntdApp } from 'antd';

const { Content } = Layout;
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import { useChat, useUI } from './hooks/useChat';
import { ApiClient } from './config/api';
import { validateEnv } from './config/env';

function AppContent() {
  const { message } = AntdApp.useApp();
  
  const [quickActionMessage, setQuickActionMessage] = React.useState('');

  const {
    currentChat,
    createNewChat,
    updateChat,
    clearAllChats
  } = useChat();

  const {
    sidebarCollapsed,
    theme,
    isMobile,
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

  const handleGoHome = () => {
    clearAllChats();
  };

  const handleNewChat = (title = null) => {
    return createNewChat(title);
  };

  const handleQuickAction = (message) => {
    setQuickActionMessage(message);
  };

  const handleQuickActionConsumed = () => {
    setQuickActionMessage('');
  };

  // Handle mobile overlay click
  const handleOverlayClick = () => {
    if (isMobile && !sidebarCollapsed) {
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

          theme={theme}
          onToggleTheme={toggleTheme}

          onGoHome={handleGoHome}
          onQuickAction={handleQuickAction}
        />

        <Content>
          {/* Mobile overlay */}
          {isMobile && !sidebarCollapsed && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999,
                display: 'block'
              }}
              onClick={handleOverlayClick}
            />
          )}

          <ChatContainer
            collapsed={sidebarCollapsed}
            onToggleSidebar={toggleSidebar}
            currentChat={currentChat}
            onUpdateChat={handleUpdateChat}
            onNewChat={handleNewChat}
            theme={theme}
            quickActionMessage={quickActionMessage}
            onQuickActionConsumed={handleQuickActionConsumed}
          />
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
