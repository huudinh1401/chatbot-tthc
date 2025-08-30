import React from 'react';
import { Layout, Space } from 'antd';
import {
  PlusOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  SunOutlined,
  MoonOutlined,
  FileTextOutlined,
  RocketOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  IdcardOutlined,
  CarOutlined,
  HomeOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import nlTechLogo from '../assets/nltech.png';

const { Sider } = Layout;


const Sidebar = ({ collapsed, theme, onToggleTheme, onQuickAction, onGoHome }) => {
  const quickActions = [
    {
      title: 'Đăng ký doanh nghiệp',
      icon: <RocketOutlined style={{ color: '#1677ff' }} />,
    },
    {
      title: 'Cấp giấy phép kinh doanh',
      icon: <SafetyOutlined style={{ color: '#52c41a' }} />,
    },
    {
      title: 'Thủ tục xin visa',
      icon: <FileTextOutlined style={{ color: '#faad14' }} />,
    },
    {
      title: 'Đăng ký kết hôn',
      icon: <ThunderboltOutlined style={{ color: '#f5222d' }} />,
    },
    {
      title: 'Cấp thẻ căn cước công dân',
      icon: <IdcardOutlined style={{ color: '#722ed1' }} />,
    },
    {
      title: 'Đăng ký xe',
      icon: <CarOutlined style={{ color: '#13c2c2' }} />,
    },
    {
      title: 'Thông tin cư trú',
      icon: <HomeOutlined style={{ color: '#eb2f96' }} />,
    },
    {
      title: 'Quyền sử dụng đất',
      icon: <EnvironmentOutlined style={{ color: '#fa8c16' }} />,
    }
  ];
  const headerStyle = {
    padding: '16px 16px 12px 16px',
    borderBottom: '1px solid var(--border-color)'
  };



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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Top Section */}
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
              onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--bg-chat)'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
            >
              <img
                src={nlTechLogo}
                alt="NLTECH Logo"
                style={{
                  width: collapsed ? '32px' : '40px',
                  height: collapsed ? '32px' : '40px',
                  objectFit: 'contain',

                }}
              />
              {!collapsed && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center' }}>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      lineHeight: '1.2',
                      fontFamily: 'Poppins, Inter, sans-serif',
                      letterSpacing: '0.5px',
                      animation: 'pulse 2s ease-in-out infinite',
                      background: 'linear-gradient(135deg, #FFFACD 0%, #FFD700 50%, #FFA500 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    TTHC ASSISTANT
                  </span>
                  <span style={{ fontSize: '10px', color: theme === 'light' ? '#666' : '#ccc', fontWeight: '400', lineHeight: '1.2', fontFamily: 'Inter, sans-serif', letterSpacing: '0.2px', whiteSpace: 'nowrap', animation: 'breathe 3s ease-in-out infinite' }}>
                    NLTECH - Hỗ trợ thủ tục hành chính
                  </span>
                </div>
              )}
            </div>
          </Space>
        </div>
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

        {/* Scrollable Middle Section */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
          {!collapsed && (
            <div style={{ padding: '8px 8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                GỢI Ý
              </span>
            </div>
          )}
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={() => onQuickAction(action.title)}
              style={{
                padding: '10px 16px',
                margin: '4px 0',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-chat)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <span style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>{action.icon}</span>
              {!collapsed && <span style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{action.title}</span>}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div style={{ marginTop: 'auto' }}>
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
                  justifyContent: 'flex-start',
                  gap: '8px',
                  color: 'var(--text-secondary)',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  width: '100%',
                  fontWeight: 'normal'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--bg-chat)'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
              >
                {item.icon}
                {!collapsed && item.label}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border-color)', padding: '12px 8px 16px 8px' }}>
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
              onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--bg-chat)'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
            >
              <SettingOutlined />
              {!collapsed && 'Cài đặt'}
            </div>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
