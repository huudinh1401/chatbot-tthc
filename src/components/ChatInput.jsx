import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ChatInput = ({ onSendMessage, loading, disabled, streaming }) => {
  const [message, setMessage] = useState('');
  const textAreaRef = useRef(null);
  
  // Detect mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDisabled = disabled || loading || streaming;

  const handleSend = () => {
    if (message.trim() && !isDisabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textAreaRef.current && textAreaRef.current.resizableTextArea) {
      const textArea = textAreaRef.current.resizableTextArea.textArea;
      if (textArea) {
        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;
      }
    }
  }, [message]);

  const inputStyle = {
    position: 'sticky',
    bottom: 0,
    backgroundColor: 'var(--bg-primary)',
    padding: '20px 24px',
    borderTop: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-md)',
    maxWidth: '100%',
    overflowX: 'hidden',
    zIndex: 100,
    width: '100%',
    left: 0,
    right: 0
  };

  const textAreaStyle = {
    height: '50px',
    maxHeight: '140px',
    resize: 'none',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    fontSize: '16px',
    lineHeight: '1.4',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    padding: '14px 16px',
    flex: 1,
    boxSizing: 'border-box',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400'
  };

  const isButtonDisabled = isDisabled || !message.trim();

  const buttonStyle = {
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100px',
    flexShrink: 0,
    border: '1px solid',
    backgroundColor: isButtonDisabled ? '#bfbfbf' : '#52c41a',
    borderColor: isButtonDisabled ? '#999999' : '#52c41a',
    color: isButtonDisabled ? '#ffffff' : '#ffffff',
    fontWeight: 'bold'
  };

  // Mobile emergency input
  if (isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '0px',
          left: '0px',
          right: '0px',
          width: '100vw',
          height: '80px',
          //backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          zIndex: 500,
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          gap: '10px',
          boxSizing: 'border-box',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <input
          type="text"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu hỏi về thủ tục hành chính..."
          disabled={isDisabled}
          style={{
            flex: '1',
            height: '50px',
            padding: '12px 16px',
            fontSize: '18px',
            color: '#fff',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            outline: 'none',
            fontFamily: 'Inter, sans-serif',
            backgroundColor: 'var(--bg-primary)',
          }}
        />
        <button
          onClick={!isButtonDisabled ? handleSend : undefined}
          disabled={isButtonDisabled}
          style={{
            height: '50px',
            width: '80px',
            backgroundColor: isButtonDisabled ? '#ccc' : '#52c41a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Gửi
        </button>
      </div>
    );
  }

  // Desktop input
  return (
    <div className="chat-input-container" style={inputStyle}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <TextArea
          ref={textAreaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu hỏi về thủ tục hành chính..."
          disabled={isDisabled}
          style={textAreaStyle}
          className="chat-input-textarea"
          autoSize={false}
          rows={1}
        />
        <div
          className="chat-send-button"
          onClick={!isButtonDisabled ? handleSend : undefined}
          style={{
            ...buttonStyle,
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
            transition: 'all 0.2s',
            '--send-bg': isButtonDisabled ? '#bfbfbf' : '#52c41a',
            '--send-border': isButtonDisabled ? '#999999' : '#52c41a',
            '--send-text': '#ffffff'
          }}
        >
          <SendOutlined style={{
            marginRight: '6px',
            fontSize: '16px',
            fontWeight: 'bold'
          }} />
          <span style={{
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.3px'
          }}>
            Gửi
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;