import React, { useState, useEffect } from 'react';
import { fetchCarts, fetchCart } from '../services/api';
import CartModal from '../components/CartModal';

const Carts: React.FC = () => {
  const [carts, setCarts] = useState<any[]>([]);
  const [selectedCart, setSelectedCart] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadCarts();
  }, []);

  const loadCarts = async () => {
    try {
      setLoading(true);
      const data = await fetchCarts();
      setCarts(data.carts);
    } catch (err) {
      setError('Error al cargar los carritos. Por favor, intente nuevamente.');
      console.error('Error fetching carts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = async (cartId: number) => {
    try {
      const cartData = await fetchCart(cartId);
      setSelectedCart(cartData);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching cart details:', err);
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
        <p className="mt-2">Cargando carritos de compra...</p>
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
      <h2 className="mb-4">Carritos de Compra</h2>
      
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Descuento</th>
              <th>Total Final</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carts.map(cart => (
              <tr key={cart.id}>
                <td>{cart.id}</td>
                <td>{cart.userId}</td>
                <td>{cart.products.length}</td>
                <td>${cart.total.toFixed(2)}</td>
                <td>{cart.discountedTotal < cart.total ? 
                  ((1 - cart.discountedTotal / cart.total) * 100).toFixed(2) + '%' : 
                  '0%'}
                </td>
                <td>${cart.discountedTotal.toFixed(2)}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleShowDetails(cart.id)}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CartModal 
        cart={selectedCart}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Carts;