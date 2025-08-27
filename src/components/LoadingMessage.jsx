import React from 'react';
import { Avatar, Card, Space, Spin } from 'antd';
import { RobotOutlined, LoadingOutlined } from '@ant-design/icons';

const LoadingMessage = () => {
  const messageStyle = {
    marginBottom: '20px',
    maxWidth: '95%',
    alignSelf: 'flex-start',
    animation: 'slideUp 0.3s ease-out',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
    minWidth: '200px',
    width: 'fit-content'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    color: '#1f2937',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  const loadingIcon = (
    <LoadingOutlined 
      style={{ 
        fontSize: 16, 
        color: '#1677ff',
        marginRight: '8px'
      }} 
      spin 
    />
  );

  return (
    <div style={messageStyle} className="chat-message loading-message">
      <Card
        style={cardStyle}
        styles={{ body: { padding: '20px 24px' } }}
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
            flex: 1,
            minWidth: 0,
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 0',
            minHeight: '24px'
          }}>
            <Spin 
              indicator={loadingIcon}
              size="small"
            />
            <span style={{
              color: '#6b7280',
              fontSize: '14px',
              fontStyle: 'italic'
            }}>
              Đang xử lý câu hỏi của bạn...
            </span>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default LoadingMessage;
