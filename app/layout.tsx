import React, { ReactNode } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './global.css';

interface LayoutProps { children: ReactNode; }

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="app-layout">
    <Header />
    <div className="main-content">
      <Sidebar />
      <main>{children}</main>
    </div>
  </div>
);

export default Layout;
