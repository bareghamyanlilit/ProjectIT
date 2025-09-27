'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Spin } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// --- меню с линками ---
const items: MenuItem[] = [
  getItem(<Link href="/admin/dashboard">Dashboard</Link>, '/admin/dashboard', <PieChartOutlined />),
  getItem(<Link href="/admin/navbar">Navbar</Link>, '/admin/navbar', <DesktopOutlined />),
  getItem('Home Page', 'sub1', <UserOutlined />, [
  getItem(<Link href="/admin/home/services">Services</Link>, '/admin/home/services', <DesktopOutlined />),
    getItem('Top Products', '/admin/home/top-products'),
    getItem('Alex', '/admin/home/alex'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '/admin/team/team1'),
    getItem('Team 2', '/admin/team/team2'),
  ]),
  getItem('Files', '/admin/files', <FileOutlined />),
];

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // текущий путь

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spin size="large" />
      </div>
    );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <div
          style={{
            color: 'white',
            textAlign: 'center',
            padding: '1rem',
            fontWeight: 'bold',
          }}
        >
          Welcome
        </div>
        {/* используем selectedKeys вместо defaultSelectedKeys */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]} // подсвечивает текущий роут
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '1rem',
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <button>Logout</button>
        </Header>
        <Content style={{ margin: '0 16px' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
