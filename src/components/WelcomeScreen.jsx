import React, { useState, useEffect } from 'react';
import { Typography, Space, Button, Card } from 'antd';
import {
  MessageOutlined,
  SearchOutlined,
  FileTextOutlined,
  RocketOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  IdcardOutlined,
  CarOutlined,
  HomeOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const WelcomeScreen = ({ onSendMessage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Animation classes for different icons - chỉ phóng to thu nhỏ
  const iconAnimations = [
    'icon-pulse-gentle', 'icon-pulse-medium', 'icon-pulse-subtle', 'icon-breathe-soft',
    'icon-glow-soft', 'icon-heartbeat-soft', 'icon-pulse-glow', 'icon-zoom-soft'
  ];

  const quickActions = [
    {
      title: 'Đăng ký doanh nghiệp',
      description: 'Hướng dẫn thủ tục thành lập doanh nghiệp',
      icon: <RocketOutlined className={`animated-icon ${iconAnimations[0]} icon-delay-1`} />,
      color: '#1677ff'
    },
    {
      title: 'Cấp giấy phép kinh doanh',
      description: 'Quy trình xin cấp giấy phép',
      icon: <SafetyOutlined className={`animated-icon ${iconAnimations[1]} icon-delay-2`} />,
      color: '#52c41a'
    },
    {
      title: 'Thủ tục xin visa',
      description: 'Hướng dẫn làm visa du lịch, công tác',
      icon: <FileTextOutlined className={`animated-icon ${iconAnimations[2]} icon-delay-3`} />,
      color: '#faad14'
    },
    {
      title: 'Đăng ký kết hôn',
      description: 'Thủ tục đăng ký kết hôn tại Việt Nam',
      icon: <ThunderboltOutlined className={`animated-icon ${iconAnimations[3]} icon-delay-4`} />,
      color: '#f5222d'
    },
    {
      title: 'Cấp thẻ căn cước công dân',
      description: 'Hướng dẫn làm thẻ CCCD mới',
      icon: <IdcardOutlined className={`animated-icon ${iconAnimations[4]} icon-delay-5`} />,
      color: '#722ed1'
    },
    {
      title: 'Đăng ký xe máy',
      description: 'Thủ tục đăng ký biển số xe máy',
      icon: <CarOutlined className={`animated-icon ${iconAnimations[5]} icon-delay-6`} />,
      color: '#13c2c2'
    },
    {
      title: 'Thông tin cư trú',
      description: 'Thủ tục đăng ký thường trú, tạm trú',
      icon: <HomeOutlined className={`animated-icon ${iconAnimations[6]} icon-delay-7`} />,
      color: '#eb2f96'
    },
    {
      title: 'Quyền sử dụng đất',
      description: 'Thủ tục cấp sổ đỏ, chuyển nhượng đất',
      icon: <EnvironmentOutlined className={`animated-icon ${iconAnimations[7]} icon-delay-8`} />,
      color: '#fa8c16'
    }
  ];

  const features = [
    {
      icon: <MessageOutlined className="animated-icon icon-pulse-gentle" style={{ fontSize: '24px', color: '#1677ff' }} />,
      title: 'Chat thông minh',
      description: 'AI hiểu ngữ cảnh và trả lời chính xác'
    },
    {
      icon: <SearchOutlined className="animated-icon icon-breathe-soft" style={{ fontSize: '24px', color: '#52c41a' }} />,
      title: 'Tìm kiếm nhanh',
      description: 'Tìm kiếm trong 6,233+ thủ tục hành chính'
    },
    {
      icon: <FileTextOutlined className="animated-icon icon-pulse-glow" style={{ fontSize: '24px', color: '#faad14' }} />,
      title: 'Chi tiết đầy đủ',
      description: 'Thông tin chi tiết về quy trình, giấy tờ'
    }
  ];

  // Animation styles - ĐẶC SẮC HƠN
  const fadeInUp = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.8)',
    filter: isVisible ? 'blur(0px)' : 'blur(10px)',
    transition: 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1500ms'
  };

  const fadeInUpDelay = (delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) rotateX(0deg)' : 'translateY(80px) rotateX(45deg)',
    filter: isVisible ? 'blur(0px)' : 'blur(8px)',
    transition: `all 1.0s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`
  });

  const scaleIn = (delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(180deg)',
    filter: isVisible ? 'blur(0px) brightness(1)' : 'blur(5px) brightness(0.5)',
    transition: `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms`
  });

  const bounceIn = (delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.1) translateY(100px)',
    transition: `all 1.0s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms`
  });

  const slideInLeft = (delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0) rotateY(0deg)' : 'translateX(-200px) rotateY(-90deg)',
    transition: `all 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`
  });

  return (
    <div style={{
      maxWidth: '100%',
      width: '100%',
      margin: '0',
      textAlign: 'center',
      overflowX: 'hidden',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Header */}
      <Space direction="vertical" size={16} style={{ width: '100%', padding: '0x 20px 0 20px' }}>
        <div style={slideInLeft(0)}>
          <Title level={1} style={{
            color: 'var(--text-primary)',
            marginBottom: '10px',
            fontSize: '1.8rem',
            fontWeight: '600',
            lineHeight: '1.2',
          }}>
            TTHC ASSISTANT NLTECH
          </Title>
          <Paragraph style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            Trợ lý AI thông minh hỗ trợ tra cứu và tư vấn thủ tục hành chính Việt Nam.
            Hỏi tôi bất cứ điều gì về các thủ tục, quy trình và yêu cầu cụ thể.
          </Paragraph>
        </div>

        {/* Features */}
        <div style={{
          marginTop: '10px',
          padding: '0 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          ...fadeInUpDelay(200)
        }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              hoverable
              className="feature-card"
              style={{
                textAlign: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                height: '100%',
                backgroundColor: 'var(--bg-primary)',
                position: 'relative',
                overflow: 'hidden',
                ...bounceIn(300 + index * 150)
              }}
              styles={{ body: { padding: '25px 20px' } }}
            >
              <Space direction="vertical" size={12}>
                {feature.icon}
                <Title level={4} style={{ margin: 0, color: 'var(--text-primary)' }}>
                  {feature.title}
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  {feature.description}
                </Text>
              </Space>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '12px', padding: '0 20px', ...slideInLeft(600) }}>
          <Title level={4} style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.1rem' }}>
            Bắt đầu với các câu hỏi phổ biến
          </Title>

          {/* Hàng trên: 6 thủ tục đầu */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginBottom: '16px'
          }}>
            {quickActions.slice(0, 6).map((action, index) => (
              <Button
                key={index}
                type="default"
                size="large"
                className="quick-action-button"
                onClick={() => onSendMessage(action.title)}
                style={{
                  width: '100%',
                  height: 'auto',
                  minHeight: '100px',
                  padding: '15px 10px',
                  borderRadius: '12px',
                  border: `2px solid ${action.color}20`,
                  backgroundColor: `${action.color}08`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  ...scaleIn(500 + index * 80)
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = action.color;
                  e.target.style.backgroundColor = `${action.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = `${action.color}20`;
                  e.target.style.backgroundColor = `${action.color}08`;
                }}
              >
                <div className="icon-container" style={{ fontSize: '20px', color: action.color, marginBottom: '6px' }}>
                  {action.icon}
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{
                    fontWeight: '500',
                    fontSize: '16px',
                    color: 'var(--text-primary)',
                    marginBottom: '2px',
                    lineHeight: '1.2'
                  }}>
                    {action.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.3',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* Hàng dưới: 2 thủ tục mới */}
          {quickActions.length > 6 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(150px, 1fr))',
              gap: '16px',
              maxWidth: '320px',
              margin: '0 auto'
            }}>
              {quickActions.slice(6).map((action, index) => (
                <Button
                  key={index + 6}
                  type="default"
                  size="large"
                  className="quick-action-button"
                  onClick={() => onSendMessage(action.title)}
                  style={{
                    width: '100%',
                    height: 'auto',
                    minHeight: '100px',
                    padding: '15px 10px',
                    borderRadius: '12px',
                    border: `2px solid ${action.color}20`,
                    backgroundColor: `${action.color}08`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    ...scaleIn(980 + index * 80)
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = action.color;
                    e.target.style.backgroundColor = `${action.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = `${action.color}20`;
                    e.target.style.backgroundColor = `${action.color}08`;
                  }}
                >
                  <div className="icon-container" style={{
                    fontSize: '28px',
                    color: action.color,
                    marginBottom: '6px'
                  }}>
                    {action.icon}
                  </div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      fontWeight: '500',
                      fontSize: '16px',
                      color: 'var(--text-primary)',
                      marginBottom: '2px',
                      lineHeight: '1.2'
                    }}>
                      {action.title}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div style={{ marginTop: '10px', padding: '0 20px', ...fadeInUp }}>
          <div style={{
            padding: '12px 20px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
          <Title level={4} style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
            Sẵn sàng bắt đầu?
          </Title>
          <Text style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Nhập câu hỏi của bạn vào ô chat bên dưới hoặc chọn một trong các gợi ý trên
          </Text>
          </div>
        </div>
      </Space>
    </div>
  );
};

export default WelcomeScreen;
