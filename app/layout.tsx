import React, { ReactNode } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './global.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="feed">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
