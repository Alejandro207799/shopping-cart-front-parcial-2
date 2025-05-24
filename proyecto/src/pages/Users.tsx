import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchUser } from '../services/api';
import UserModal from '../components/UserModal';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data.users);
    } catch (err) {
      setError('Error al cargar los usuarios. Por favor, intente nuevamente.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = async (userId: number) => {
    try {
      const userData = await fetchUser(userId);
      setSelectedUser(userData);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4">Usuarios</h2>
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
              <img 
                src={user.image || 'https://via.placeholder.com/150'} 
                className="card-img-top"
                alt={`${user.firstName} ${user.lastName}`} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                <p className="card-text">
                  <small className="text-muted">{user.email}</small>
                </p>
              </div>
              <div className="card-footer bg-white border-top-0">
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => handleShowDetails(user.id)}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <UserModal 
        user={selectedUser}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Users;