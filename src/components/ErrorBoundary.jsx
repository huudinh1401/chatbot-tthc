import React from 'react';
import { Result, Button, Typography } from 'antd';
import { ReloadOutlined, HomeOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5'
        }}>
          <Result
            status="500"
            title="Oops! Có lỗi xảy ra"
            subTitle="Ứng dụng đã gặp lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ hỗ trợ."
            extra={[
              <Button 
                type="primary" 
                icon={<ReloadOutlined />} 
                onClick={this.handleReload}
                key="reload"
              >
                Tải lại trang
              </Button>,
              <Button 
                icon={<HomeOutlined />} 
                onClick={this.handleGoHome}
                key="home"
              >
                Về trang chủ
              </Button>
            ]}
          >
            <div style={{ textAlign: 'left', maxWidth: '500px' }}>
              <Paragraph>
                <Text strong>Chi tiết lỗi:</Text>
              </Paragraph>
              <Paragraph>
                <Text code>{this.state.error && this.state.error.toString()}</Text>
              </Paragraph>
              
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details style={{ whiteSpace: 'pre-wrap', marginTop: '16px' }}>
                  <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>
                    <Text type="secondary">Stack trace (Development only)</Text>
                  </summary>
                  <Text code style={{ fontSize: '12px' }}>
                    {this.state.errorInfo.componentStack}
                  </Text>
                </details>
              )}
            </div>
          </Result>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
