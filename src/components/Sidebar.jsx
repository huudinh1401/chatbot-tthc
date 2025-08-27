import React from 'react';
import { Layout, Menu, Button, Space, Typography, Divider } from 'antd';
import {
  MessageOutlined,
  PlusOutlined,
  HistoryOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  SunOutlined,
  MoonOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import nlTechLogo from '../assets/nltech.png';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ collapsed, onNewChat, chatHistory, onSelectChat, currentChatId, theme, onToggleTheme, onClearAllChats, onGoHome }) => {
  const headerStyle = {
    padding: '16px 16px 12px 16px',
    borderBottom: '1px solid var(--border-color)'
  };

  const menuItems = [
    {
      key: 'new-chat',
      icon: <PlusOutlined />,
      label: 'Cuộc trò chuyện mới',
      onClick: onNewChat
    },
    {
      type: 'divider'
    },
    {
      key: 'recent',
      label: 'Gần đây',
      type: 'group',
      children: chatHistory.slice(0, 10).map((chat, index) => ({
        key: chat.id,
        icon: <MessageOutlined />,
        label: (
          <div style={{ 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            maxWidth: collapsed ? '0' : '180px'
          }}>
            {chat.title || `Cuộc trò chuyện ${index + 1}`}
          </div>
        ),
        onClick: () => onSelectChat(chat.id)
      }))
    }
  ];

  const bottomMenuItems = [
    {
      key: 'theme-toggle',
      icon: theme === 'dark' ? <SunOutlined /> : <MoonOutlined />,
      label: theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối',
      onClick: onToggleTheme
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: 'Trợ giúp'
    },
    {
      key: 'clear-history',
      icon: <DeleteOutlined />,
      label: 'Xóa tất cả lịch sử',
      onClick: onClearAllChats
    }
  ];

  return (
    <Sider
      width={280}
      collapsedWidth={80}
      collapsed={collapsed}
      trigger={null}
      theme="light"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        {/* Main Content - takes remaining space */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={headerStyle}>
          <Space direction="vertical" size={2} style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '0px 6px 4px',
                borderRadius: '6px',
                transition: 'background-color 0.2s ease'
              }}
              onClick={onGoHome}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--bg-chat)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <img
                src={nlTechLogo}
                alt="NLTECH Logo"
                style={{
                  width: collapsed ? '32px' : '40px',
                  height: collapsed ? '32px' : '40px',
                  objectFit: 'contain',
                  animation: 'rotateY 10s linear infinite'
                }}
              />
              {!collapsed && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: theme === 'light' ? '#006600' : '#00FFFF',
                    fontWeight: '700',
                    lineHeight: '1.2',
                    fontFamily: 'Poppins, Inter, sans-serif',
                    letterSpacing: '0.5px',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>
                    TTHC ASSISTANT
                  </span>
                  <span style={{
                    fontSize: '10px',
                    color: theme === 'light' ? '#666' : '#ccc',
                    fontWeight: '400',
                    lineHeight: '1.2',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.2px',
                    whiteSpace: 'nowrap',
                    animation: 'breathe 3s ease-in-out infinite'
                  }}>
                    NLTECH - Hỗ trợ thủ tục hành chính
                  </span>
                </div>
              )}
            </div>
          </Space>
        </div>

        {/* New Chat Button */}
        <div style={{ padding: '16px' }}>
          <div
            onClick={onGoHome}
            style={{
              width: '100%',
              height: '40px',
              borderRadius: '8px',
              background: '#006600',
              border: '1px solid #006600',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              gap: '8px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}
          >
            <PlusOutlined style={{ color: 'white', fontSize: '14px' }} />
            {!collapsed && 'Cuộc trò chuyện mới'}
          </div>
        </div>

        {/* Chat History */}
        <div style={{ flex: 1, overflow: 'auto', padding: '0' }}>
        {!collapsed && (
          <div style={{ padding: '8px 16px' }}>
            <Text type="secondary" style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>
              LỊCH SỬ TRƯỚC ĐÂY
            </Text>
          </div>
        )}

        <div style={{ marginBottom: '16px', padding: '0 4px' }}>
          {chatHistory.slice(0, 10).map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              style={{
                padding: '8px 12px',
                margin: '2px 4px',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: currentChatId === chat.id ? 'var(--bg-chat)' : 'transparent',
                border: currentChatId === chat.id ? '1px solid var(--primary-color)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center', // Căn giữa theo chiều dọc
                justifyContent: 'flex-start', // Thẳng hàng trái
                gap: '8px',
                boxSizing: 'border-box', // Đảm bảo border không tràn
                maxWidth: '100%', // Không vượt quá container
                overflow: 'hidden' // Ẩn nội dung tràn
              }}
              onMouseEnter={(e) => {
                if (currentChatId !== chat.id) {
                  e.target.style.backgroundColor = 'var(--bg-chat)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentChatId !== chat.id) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <MessageOutlined style={{ fontSize: '14px', color: 'var(--text-secondary)' }} />
              {!collapsed && (
                <div style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '14px',
                  color: currentChatId === chat.id ? 'var(--primary-color)' : 'var(--text-primary)',
                  textAlign: 'left', // Thẳng hàng trái
                  flex: 1 // Chiếm hết không gian còn lại
                }}>
                  {chat.title
                    ? (chat.title.length > 50 ? chat.title.substring(0, 50) + '...' : chat.title)
                    : (chat.messages && chat.messages.length > 0
                        ? chat.messages.find(msg => msg.type === 'user')?.message?.substring(0, 50) + (chat.messages.find(msg => msg.type === 'user')?.message?.length > 50 ? '...' : '') || `Cuộc trò chuyện ${index + 1}`
                        : `Cuộc trò chuyện ${index + 1}`)
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

        {/* Bottom Menu */}
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '16px 8px' }}>
        {bottomMenuItems.map(item => (
          <div
            key={item.key}
            onClick={item.onClick}
            style={{
              padding: '8px 16px',
              margin: '2px 0',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start', // Thẳng hàng trái
              gap: '8px',
              color: item.key === 'clear-history' ? '#ff4d4f' : 'var(--text-secondary)', // Màu đỏ cho xóa lịch sử
              fontSize: '14px',
              transition: 'all 0.2s ease',
              width: '100%', // Chiếm full width
              fontWeight: item.key === 'clear-history' ? '500' : 'normal' // Bold cho xóa lịch sử
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = item.key === 'clear-history'
                ? 'rgba(255, 77, 79, 0.1)'
                : 'var(--bg-chat)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            {item.icon}
            {!collapsed && item.label}
          </div>
        ))}
        </div>
        </div>

        {/* Settings - Fixed at bottom */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          padding: '12px 8px 16px 8px'
        }}>
        <div
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--bg-chat)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          <SettingOutlined />
          {!collapsed && 'Cài đặt'}
        </div>
      </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
