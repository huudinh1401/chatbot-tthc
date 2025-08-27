import React from 'react';
import { Avatar, Card, Space } from 'antd';
import { RobotOutlined } from '@ant-design/icons';

const TypingIndicator = () => {
  const messageStyle = {
    marginBottom: '16px',
    maxWidth: '80%',
    alignSelf: 'flex-start',
    animation: 'slideUp 0.3s ease-out'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    color: '#1f2937',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#9ca3af',
    display: 'inline-block',
    margin: '0 2px',
    animation: 'typing 1.4s infinite ease-in-out'
  };

  return (
    <div style={messageStyle}>
      <Card
        style={cardStyle}
        styles={{ body: { padding: '12px 16px' } }}
      >
        <Space align="start" size={12}>
          <Avatar
            size={32}
            icon={<RobotOutlined />}
            style={{
              backgroundColor: '#1677ff',
              color: '#ffffff',
              flexShrink: 0
            }}
          />
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '8px 0',
            minHeight: '24px'
          }}>
            <span style={{ ...dotStyle, animationDelay: '0s' }}></span>
            <span style={{ ...dotStyle, animationDelay: '0.2s' }}></span>
            <span style={{ ...dotStyle, animationDelay: '0.4s' }}></span>
          </div>
        </Space>
      </Card>

    </div>
  );
};

export default TypingIndicator;
