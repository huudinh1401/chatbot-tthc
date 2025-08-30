import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import nlTechLogo from '../assets/nltech.png';

const { Title, Paragraph } = Typography;

const WelcomeScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
      padding: '20px',
      marginTop: '-100px'
    }}>
      <img
        src={nlTechLogo}
        alt="NLTECH Logo"
        style={{
          width: '80px',
          height: '80px',
          marginBottom: '24px',
          objectFit: 'contain',
          animation: 'rotateY 10s linear infinite',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.5)',
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }}
      />
      <Title level={1} style={{
        marginBottom: '10px',
        fontSize: '1.8rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #FFFACD 0%, #FFD700 50%, #FFA500 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'all 0.6s ease-out 150ms',
      }}>
        TTHC ASSISTANT NLTECH
      </Title>
      <Paragraph style={{
        fontSize: '18px',
        color: 'var(--text-primary)',
        maxWidth: '600px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
        transition: 'all 0.6s ease-out 150ms',
      }}>
        Trợ lý AI thông minh hỗ trợ tra cứu và tư vấn thủ tục hành chính Việt Nam.
        Hỏi tôi bất cứ điều gì về các thủ tục, quy trình và yêu cầu cụ thể.
      </Paragraph>
    </div>
  );
};

export default WelcomeScreen;
