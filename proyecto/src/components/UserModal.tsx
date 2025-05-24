import React from 'react';

interface UserModalProps {
  user: any;
  show: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, show, onClose }) => {
  if (!show || !user) return null;

  return (
    <>
      <div 
        className="modal show d-block" 
        tabIndex={-1} 
        role="dialog"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detalles del Usuario</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-3">
                <img 
                  src={user.image || 'https://via.placeholder.com/150'} 
                  alt={`${user.firstName} ${user.lastName}`} 
                  className="rounded-circle" 
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
              </div>
              
              <h4 className="text-center mb-3">{user.firstName} {user.lastName}</h4>
              
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Email:</div>
                <div className="col-sm-8">{user.email}</div>
              </div>
              
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Teléfono:</div>
                <div className="col-sm-8">{user.phone}</div>
              </div>
              
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Género:</div>
                <div className="col-sm-8">{user.gender === 'male' ? 'Masculino' : 'Femenino'}</div>
              </div>
              
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Edad:</div>
                <div className="col-sm-8">{user.age}</div>
              </div>
              
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Dirección:</div>
                <div className="col-sm-8">
                  {user.address?.address}, {user.address?.city}
                </div>
              </div>
              
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Empresa:</div>
                <div className="col-sm-8">{user.company?.name}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;