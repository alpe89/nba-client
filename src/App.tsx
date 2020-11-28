import React from 'react';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">Logo</Menu.Item>
        </Menu>
      </Header>
      <Content>Content </Content>
    </Layout>
  );
}

export default App;
