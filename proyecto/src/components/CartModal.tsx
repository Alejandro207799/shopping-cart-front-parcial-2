import React from 'react';

interface CartModalProps {
  cart: any;
  show: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ cart, show, onClose }) => {
  if (!show || !cart) return null;

  return (
    <>
      <div 
        className="modal show d-block" 
        tabIndex={-1} 
        role="dialog"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detalles del Carrito</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card mb-3">
                <div className="card-header bg-light">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="mb-0">Información del Carrito</h6>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <small className="text-muted">ID: {cart.id}</small>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <strong>Usuario ID:</strong>
                    </div>
                    <div className="col-md-8">
                      {cart.userId}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <strong>Total:</strong>
                    </div>
                    <div className="col-md-8">
                      ${cart.total.toFixed(2)}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <strong>Descuento Total:</strong>
                    </div>
                    <div className="col-md-8">
                      ${(cart.total - cart.discountedTotal).toFixed(2)} 
                      ({((1 - cart.discountedTotal / cart.total) * 100).toFixed(2)}%)
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <strong>Total Final:</strong>
                    </div>
                    <div className="col-md-8 fw-bold text-primary">
                      ${cart.discountedTotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="mb-3">Productos en el Carrito ({cart.totalProducts})</h6>
              
              <div className="table-responsive">
                <table className="table table-sm table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Producto</th>
                      <th className="text-center">Precio</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-center">Descuento</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.products.map((item: any) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td className="text-center">${item.price.toFixed(2)}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">{item.discountPercentage}%</td>
                        <td className="text-end">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <td colSpan={5} className="text-end fw-bold">Total Final:</td>
                      <td className="text-end fw-bold">${cart.discountedTotal.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
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

export default CartModal;