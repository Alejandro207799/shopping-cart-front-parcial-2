import React from 'react';
import Users from './Users';
import Products from './Products';
import Carts from './Carts';

interface DashboardProps {
  currentPage: string;
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ currentPage, user }) => {
  return (
    <main className="main-content" style={{ marginLeft: window.innerWidth > 768 ? '250px' : '0' }}>
      {currentPage === 'usuarios' && <Users />}
      {currentPage === 'productos' && <Products />}
      {currentPage === 'carritos' && <Carts />}
    </main>
  );
};

export default Dashboard;