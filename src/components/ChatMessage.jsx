import React from 'react';
import { Avatar, Card, Button, Space } from 'antd';
import { UserOutlined, RobotOutlined, FileTextOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessage = ({ message, onProcedureClick }) => {
  const isUser = message.type === 'user';

  // Utility function to render clickable links
  const renderClickableLinks = (text) => {
    if (typeof text !== 'string') return text;

    // Enhanced URL regex to catch more URL patterns
    const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#059669', // Xanh lá đậm
              textDecoration: 'underline',
              fontWeight: '600',
              fontSize: '16px', // Size lớn hơn
              cursor: 'pointer',
              wordBreak: 'break-all'
            }}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = 'none';
              e.target.style.backgroundColor = '#d1fae5'; // Light green background
              e.target.style.padding = '2px 6px';
              e.target.style.borderRadius = '4px';
              e.target.style.color = '#047857'; // Darker green on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = 'underline';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.padding = '0';
              e.target.style.borderRadius = '0';
              e.target.style.color = '#059669';
            }}
            title={`Mở link: ${part}`}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const messageStyle = {
    marginBottom: '20px',
    maxWidth: isUser ? '85%' : '95%',
    width: 'fit-content', // Cả user và bot đều fit-content
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    animation: 'slideUp 0.3s ease-out',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
    minWidth: isUser ? 'auto' : '300px', // User messages không cần min-width
    marginLeft: isUser ? 'auto' : '0', // User messages căn phải
    marginRight: isUser ? '0' : 'auto' // Bot messages căn trái
  };

  const cardStyle = {
    backgroundColor: isUser ? 'var(--primary-color)' : 'var(--bg-primary)',
    color: isUser ? '#ffffff' : 'var(--text-primary)',
    border: isUser ? 'none' : '1px solid var(--border-color)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-md)',
    width: '100%', // Thay đổi từ maxWidth thành width để Card fit với container
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    wordBreak: 'break-word'
  };

  const renderContent = () => {
    if (message.intent_type === 'search_procedures' && message.data?.procedures) {
      return (
        <div style={{
          textAlign: 'left',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }} data-intent="search_procedures">
          <p style={{
            marginBottom: '12px',
            textAlign: 'left',
            width: '100%',
            alignSelf: 'flex-start',
            fontSize: '16px' // ← Size chữ lớn hơn
          }}>{message.message}</p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            textAlign: 'left',
            width: '100%',
            alignItems: 'flex-start'
          }}>
            {message.data.procedures.map((procedure, index) => (
              <Button
                key={index}
                type="text"
                icon={<FileTextOutlined />}
                onClick={() => onProcedureClick(procedure)}
                style={{
                  textAlign: 'left',
                  height: 'auto',
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-chat)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  width: '100%',
                  justifyContent: 'flex-start',
                  display: 'flex',
                  alignItems: 'flex-start',
                  whiteSpace: 'normal',
                  minHeight: 'auto'
                }}
              >
                <div style={{ textAlign: 'left', width: '100%' }}>
                  <div style={{
                    fontWeight: '500',
                    fontSize: '16px',
                    textAlign: 'left',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    lineHeight: '1.4'
                  }}>
                    {procedure.ten_thutuc}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    marginTop: '2px',
                    textAlign: 'left',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                  }}>
                    Mã thủ tục: {procedure.ma_hoso}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      );
    }

    // Remove the loading state display since we stream individual messages now
    // if (message.intent_type === 'get_details' && message.auto_stream) {
    //   return (
    //     <div>
    //       <p>{message.message}</p>
    //       <Tag color="processing" style={{ marginTop: '8px' }}>
    //         Đang tải chi tiết...
    //       </Tag>
    //     </div>
    //   );
    // }

    // Render get_details messages with streaming
    if (message.intent_type === 'get_details') {
      return (
        <div style={{
          margin: 0,
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          maxWidth: '100%',
          minWidth: 0,
          hyphens: 'auto',
          lineHeight: '1.6',
          borderLeft: message.streaming ? '3px solid var(--primary-color)' : 'none',
          paddingLeft: message.streaming ? '12px' : '0',
          animation: message.streaming ? 'streamGlow 2s ease-in-out infinite' : 'none'
        }}>
          {message.streaming && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--primary-color)',
              fontWeight: '500',
              marginBottom: '8px',
              fontSize: '16px' // ← Size lớn hơn (14px → 16px)
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                border: '2px solid var(--primary-color)',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Đang tải...
            </div>
          )}

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h3 style={{
                  color: 'var(--primary-color)',
                  marginBottom: '12px',
                  marginTop: '8px',
                  fontSize: '20px', // ← Size lớn hơn (18px → 20px)
                  fontWeight: '600'
                }}>
                  {children}
                </h3>
              ),
              h2: ({ children }) => (
                <h4 style={{
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  marginTop: '16px',
                  fontSize: '18px', // ← Size lớn hơn (16px → 18px)
                  fontWeight: '600'
                }}>
                  {children}
                </h4>
              ),
              h3: ({ children }) => (
                <h5 style={{
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  marginTop: '12px',
                  fontSize: '17px', // ← Size lớn hơn (15px → 17px)
                  fontWeight: '500'
                }}>
                  {children}
                </h5>
              ),
              p: ({ children }) => (
                <p style={{
                  marginBottom: '8px',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)',
                  fontSize: '16px' // ← Size chữ lớn hơn
                }}>
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul style={{
                  marginLeft: '16px',
                  marginBottom: '12px',
                  paddingLeft: '4px'
                }}>
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li style={{
                  marginBottom: '4px',
                  lineHeight: '1.5',
                  color: 'var(--text-primary)',
                  fontSize: '16px' // ← Size chữ lớn hơn
                }}>
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong style={{
                  color: 'var(--primary-color)',
                  fontWeight: '600'
                }}>
                  {children}
                </strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#059669', // Xanh lá đậm
                    textDecoration: 'underline',
                    fontWeight: '600',
                    fontSize: '16px', // Size lớn hơn
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.backgroundColor = '#d1fae5'; // Light green background
                    e.target.style.padding = '2px 6px';
                    e.target.style.borderRadius = '4px';
                    e.target.style.color = '#047857'; // Darker green on hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.padding = '0';
                    e.target.style.borderRadius = '0';
                    e.target.style.color = '#059669';
                  }}
                  title={`Mở link: ${href}`}
                >
                  {children}
                </a>
              ),
              // Handle plain URLs that aren't in markdown link format
              text: ({ children }) => {
                return renderClickableLinks(children);
              }
            }}
          >
            {message.message || ''}
          </ReactMarkdown>
        </div>
      );
    }

    // Render tin nhắn với tên thủ tục có màu khác (không dùng markdown)
    const renderMessageWithHighlight = () => {
      if (message.procedureName) {
        // Tách tin nhắn để highlight "Chi tiết về thủ tục:" và tên thủ tục
        const prefixText = "Chi tiết về thủ tục: ";
        const remainingText = message.message.replace(prefixText, "").replace(message.procedureName, "");

        return (
          <span style={{
            margin: 0,
            lineHeight: '1.5',
            fontSize: '16px'
          }}>
            <span style={{
              color: isUser ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)', // Màu xám mờ
              fontWeight: '400'
            }}>
              {prefixText}
            </span>
            <span style={{
              color: isUser ? '#ffffff' : 'var(--text-primary)', // Màu trắng cho user, màu chính cho bot
              fontWeight: '600'
            }}>
              {message.procedureName}
            </span>
            {remainingText}
          </span>
        );
      }

      // Tin nhắn thường không có tên thủ tục
      return (
        <span style={{
          margin: 0,
          lineHeight: '1.5',
          color: isUser ? '#ffffff' : 'var(--text-primary)',
          fontSize: '16px'
        }}>
          {renderClickableLinks(message.message)}
        </span>
      );
    };

    return (
      <div style={{
        margin: 0,
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        maxWidth: '100%',
        minWidth: 0,
        hyphens: 'auto',
        lineHeight: '1.5',
        fontSize: '16px'
      }}>
        {renderMessageWithHighlight()}
      </div>
    );
  };

  return (
    <div
      style={messageStyle}
      className={`chat-message ${isUser ? 'user-message' : 'bot-message'} ${message.isStreamingMessage ? 'streaming-message' : ''}`}
    >
      <Card
        style={cardStyle}
        styles={{ body: { padding: '20px 24px' } }} // Tăng padding để to hơn
      >
        <Space align="start" size={12}>
          <Avatar
            size={32}
            icon={isUser ? <UserOutlined /> : <RobotOutlined />}
            style={{
              backgroundColor: isUser ? '#ffffff' : 'var(--primary-color)',
              color: isUser ? 'var(--primary-color)' : '#ffffff',
              flexShrink: 0
            }}
          />
          <div style={{
            flex: 1,
            minWidth: 0,
            maxWidth: '100%',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            hyphens: 'auto',
            textAlign: 'left' // Thẳng hàng trái, không căn giữa
          }}>
            {renderContent()}
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default ChatMessage;
