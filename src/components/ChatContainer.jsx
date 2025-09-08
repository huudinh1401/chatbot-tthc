import React, { useState, useEffect, useRef } from 'react';
import { Space, Button, Alert } from 'antd';
import { MenuOutlined, ReloadOutlined } from '@ant-design/icons';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import LoadingMessage from './LoadingMessage';
import WelcomeScreen from './WelcomeScreen';
import { ApiClient } from '../config/api';
import { generateChatTitle, handleApiError } from '../utils/helpers';


const ChatContainer = ({

  onToggleSidebar,
  currentChat,
  onUpdateChat,
  onNewChat,
  theme,
  quickActionMessage,
  onQuickActionConsumed
}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Simple and reliable scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  useEffect(() => {
    // Always scroll to show new messages
    const timer = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timer);
  }, [messages]);

  // Load messages when chat changes
  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.messages || []);
    } else {
      setMessages([]);
    }
  }, [currentChat]);

  useEffect(() => {
    if (quickActionMessage) {
      handleSendMessage(quickActionMessage);
      onQuickActionConsumed();
    }
  }, [quickActionMessage]);

  const handleSendMessage = async (messageText, options = {}) => {
    if (!messageText.trim()) return;

    console.log('💬 Sending message:', {
      message: messageText,
      timestamp: new Date().toISOString()
    });

    // Tạo chat mới nếu chưa có (câu hỏi đầu tiên)
    let chatToUpdate = currentChat;
    if (!currentChat) {
      console.log('🆕 Creating new chat for first message');
      const chatTitle = generateChatTitle(messageText);
      chatToUpdate = onNewChat(chatTitle); // Tạo chat mới với title ngay
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: messageText,
      timestamp: new Date().toISOString(),
      procedureName: options.procedureName // Thêm tên thủ tục nếu có
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    // Cập nhật chat với message đầu tiên NGAY LẬP TỨC để hiển thị trong sidebar
    const currentMessages = [...messages, userMessage];
    onUpdateChat({
      ...chatToUpdate,
      messages: currentMessages,
      lastUpdated: new Date().toISOString()
    });

    try {
      console.log('📤 Making API call to /api/v1/chat...');
      const response = await ApiClient.post('/api/v1/chat', {
        message: messageText
      });

      console.log('📥 Received API response:', response);

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: response.message,
        intent_type: response.intent_type,
        data: response.data,
        auto_stream: response.auto_stream,
        stream_endpoint: response.stream_endpoint,
        timestamp: new Date().toISOString()
      };

      console.log('🤖 Created bot message:', botMessage);
      setMessages(prev => [...prev, botMessage]);

      // Handle auto-streaming for procedure details
      if (response.auto_stream && response.stream_endpoint) {
        console.log('🔄 Auto-streaming detected:', {
          intent_type: response.intent_type,
          auto_stream: response.auto_stream,
          stream_endpoint: response.stream_endpoint,
          botMessageId: botMessage.id
        });
        handleAutoStream(response.stream_endpoint, botMessage.id);
      } else {
        console.log('❌ No auto-streaming:', {
          intent_type: response.intent_type,
          auto_stream: response.auto_stream,
          stream_endpoint: response.stream_endpoint
        });
      }

      // Update chat history với bot response
      const finalMessages = [...messages, userMessage, botMessage];
      onUpdateChat({
        ...chatToUpdate,
        messages: finalMessages,
        lastUpdated: new Date().toISOString()
      });

    } catch (error) {
      console.error('💥 Chat error:', {
        error: error.message,
        stack: error.stack,
        userMessage: messageText,
        timestamp: new Date().toISOString()
      });

      const errorMsg = handleApiError(error);
      setError(errorMsg);

      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này. Vui lòng thử lại sau.',
        timestamp: new Date().toISOString()
      };

      console.log('❌ Created error message:', errorMessage);
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      console.log('🏁 Chat request completed, setting loading to false');
      setLoading(false);
    }
  };

  const handleAutoStream = async (streamEndpoint, messageId) => {
    try {
      console.log('🚀 Starting streaming for:', streamEndpoint);

      // Initialize streaming message với accumulatedContent
      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? {
            ...msg,
            message: '',
            streaming: true,
            accumulatedContent: '' // Initialize accumulated content
          }
          : msg
      ));

      setStreaming(true);

      const response = await ApiClient.getStream(streamEndpoint);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Split by SSE format (\n\n) - theo demo HTML
        const sseBlocks = buffer.split('\n\n');
        buffer = sseBlocks.pop() || ''; // Keep incomplete block

        for (const block of sseBlocks) {
          if (block.trim()) {
            handleSSEBlock(block.trim(), messageId);

            // Small delay for smooth rendering
            await new Promise(resolve => setTimeout(resolve, 50));
          }
        }
      }

      // Process remaining buffer
      if (buffer.trim()) {
        handleSSEBlock(buffer.trim(), messageId);
      }

      // Mark streaming as complete
      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, streaming: false }
          : msg
      ));

      setStreaming(false);
      console.log('✅ Streaming completed');

    } catch (error) {
      console.error('❌ Streaming error:', error);
      setStreaming(false);

      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? {
            ...msg,
            message: `❌ Lỗi tải chi tiết: ${error.message}`,
            streaming: false
          }
          : msg
      ));
    }
  };

  // Handle SSE block - copy chính xác từ demo HTML
  const handleSSEBlock = (block, messageId) => {
    console.log('Processing SSE block:', block);

    const lines = block.split('\n');
    let eventType = null;
    let data = null;

    // Parse event và data - theo demo HTML
    for (const line of lines) {
      if (line.startsWith('event:')) {
        eventType = line.substring(6).trim();
      } else if (line.startsWith('data:')) {
        try {
          data = JSON.parse(line.substring(5).trim());
        } catch (error) {
          console.log('JSON parse error:', error);
          return;
        }
      }
    }

    if (!data) {
      console.log('No data found in SSE block');
      return;
    }

    console.log('SSE Event:', eventType, 'Data:', data);

    switch (eventType) {
      case 'start':
      case 'StreamEventType.START':
        console.log('🚀 Streaming started');
        break;

      case 'chunk':
      case 'StreamEventType.CHUNK':
        if (data.delta !== undefined) {
          // Chỉ append delta - theo demo HTML
          setMessages(prev => prev.map(msg => {
            if (msg.id === messageId) {
              const newAccumulatedContent = (msg.accumulatedContent || '') + data.delta;
              console.log('➕ Appending delta, total length:', newAccumulatedContent.length);
              return {
                ...msg,
                message: newAccumulatedContent,
                accumulatedContent: newAccumulatedContent,
                streaming: true
              };
            }
            return msg;
          }));
        }
        break;

      case 'metadata':
      case 'StreamEventType.METADATA':
        console.log('📊 Metadata received:', data);
        break;

      case 'end':
      case 'StreamEventType.END':
        console.log('✅ Streaming completed');
        setMessages(prev => prev.map(msg =>
          msg.id === messageId
            ? { ...msg, streaming: false }
            : msg
        ));
        break;

      case 'error':
      case 'StreamEventType.ERROR':
        console.error('❌ Streaming error:', data);
        setMessages(prev => prev.map(msg =>
          msg.id === messageId
            ? {
              ...msg,
              message: `❌ ${data.error || 'Có lỗi xảy ra trong streaming'}`,
              streaming: false
            }
            : msg
        ));
        break;

      default:
        console.log('Unknown SSE event type:', eventType);
        break;
    }
  };

  const handleProcedureClick = (procedure) => {
    const message = `Chi tiết về thủ tục: ${procedure.ten_thutuc}`;
    handleSendMessage(message, { procedureName: procedure.ten_thutuc });
  };

  const handleRetry = () => {
    setError(null);
  };

  const containerStyle = {
    height: '100dvh', // Dynamic viewport height for mobile
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--bg-primary)',
    overflowX: 'hidden',
    width: '100%',
    position: 'relative'
  };

  const headerStyle = {
    padding: '12px 20px',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 10
  };

  const messagesStyle = {
    flex: 1,
    padding: '24px 20px 24px 24px',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '100%',
    margin: '0 auto',
    width: '100%',
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--border-color) var(--bg-secondary)',
    minHeight: 0, // Important for flex scrolling
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
  };



  return (
    <div style={containerStyle}>
      {/* Header */}
      <div className="chat-header" style={headerStyle}>
        <Space align="center">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onToggleSidebar}
            style={{
              marginRight: '8px',
              padding: '4px 8px',
              borderRadius: '4px',
              color: theme === 'light' ? '#006600' : '#00FFFF',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          />
          <h4 style={{
            margin: 0,
            color: theme === 'light' ? '#006600' : '#00FFFF',
            fontWeight: '600',
            fontSize: '16px',
            fontFamily: 'Poppins, Inter, sans-serif',
            letterSpacing: '0.3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '200px'
          }}>
            {currentChat?.title || 'Trợ lý AI Thủ tục Hành chính'}
          </h4>
        </Space>

        <Space>
          {error && (
            <Button
              type="text"
              icon={<ReloadOutlined />}
              onClick={handleRetry}
              size="small"
            >
              Thử lại
            </Button>
          )}
        </Space>
      </div>

      {/* Messages Area */}
      <div style={messagesStyle} className="messages-container">
        {error && (
          <Alert
            message="Lỗi kết nối"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: '16px' }}
          />
        )}

        {!currentChat ? (
          <WelcomeScreen />
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onProcedureClick={handleProcedureClick}
              />
            ))}
            {loading && <LoadingMessage />}
            {streaming && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} style={{ height: '1px', flexShrink: 0 }} />
      </div>

      {/* Input Area */}
      <ChatInput
        onSendMessage={handleSendMessage}
        loading={loading}
        streaming={streaming}
        disabled={!!error}
      />
    </div>
  );
};

export default ChatContainer;
