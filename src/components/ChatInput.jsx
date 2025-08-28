import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ChatInput = ({ onSendMessage, loading, disabled, streaming }) => {
  const [message, setMessage] = useState('');
  const textAreaRef = useRef(null);

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
    overflowX: 'hidden'
  };

  const textAreaStyle = {
    height: '50px', // Cố định chiều cao bằng nút gửi
    maxHeight: '140px',
    resize: 'none',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    fontSize: '16px',
    lineHeight: '1.4', // Giảm line-height
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    padding: '14px 16px', // Điều chỉnh padding để vừa 50px
    flex: 1,
    boxSizing: 'border-box', // Đảm bảo padding tính trong height
    overflow: 'hidden', // Ẩn thanh cuộn
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400'
  };

  // Tính toán màu nút dựa trên trạng thái
  const isButtonDisabled = isDisabled || !message.trim();

  // Debug log
  console.log('🎨 Button state:', {
    isButtonDisabled,
    loading,
    streaming,
    disabled,
    hasMessage: !!message.trim(),
    expectedBg: isButtonDisabled ? '#bfbfbf' : '#52c41a',
    expectedText: '#ffffff'
  });

  const buttonStyle = {
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100px',
    flexShrink: 0,
    border: '1px solid',
    // DISABLE = XÁM, BÌNH THƯỜNG = XANH LÁ
    backgroundColor: isButtonDisabled ? '#bfbfbf' : '#52c41a',
    borderColor: isButtonDisabled ? '#999999' : '#52c41a',
    color: isButtonDisabled ? '#ffffff' : '#ffffff',
    fontWeight: 'bold'
  };

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
      
      {/* Quick suggestions */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {[
          'Đăng ký doanh nghiệp',
          'Cấp giấy phép kinh doanh',
          'Thủ tục xin visa',
          'Đăng ký kết hôn'
        ].map((suggestion, index) => (
          <Button
            key={index}
            size="small"
            type="text"
            onClick={() => setMessage(suggestion)}
            disabled={loading}
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              height: '32px',
              backgroundColor: 'var(--bg-secondary)',
              padding: '0 12px'
            }}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;
