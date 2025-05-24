import React, { useState, useEffect } from 'react';

interface NavbarProps {
  currentPage: string;
  changePage: (page: string) => void;
  onLogout: () => void;
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  changePage, 
  onLogout, 
  user 
}) => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <button 
        className="toggle-sidebar" 
        onClick={toggleSidebar}
      >
        <i className="bi bi-list"></i> ☰
      </button>

      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h4>Tienda Online</h4>
          {user && (
            <div className="user-info d-flex align-items-center mt-2">
              <img 
                src={user.image || 'https://via.placeholder.com/40'} 
                alt="Avatar" 
                className="user-avatar me-2" 
              />
              <small>{user.firstName} {user.lastName}</small>
            </div>
          )}
        </div>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'productos' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                changePage('productos');
                if (window.innerWidth <= 768) setShowSidebar(false);
              }}
            >
              <i className="bi bi-box"></i> Productos
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'usuarios' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                changePage('usuarios');
                if (window.innerWidth <= 768) setShowSidebar(false);
              }}
            >
              <i className="bi bi-people"></i> Usuarios
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'carritos' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                changePage('carritos');
                if (window.innerWidth <= 768) setShowSidebar(false);
              }}
            >
              <i className="bi bi-cart"></i> Carritos
            </a>
          </li>
          <li className="nav-item mt-auto">
            <div className="dropdown-divider my-3"></div>
            <a 
              href="#" 
              className="nav-link text-danger"
              onClick={(e) => {
                e.preventDefault();
                onLogout();
              }}
            >
              <i className="bi bi-box-arrow-left"></i> Cerrar Sesión
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;