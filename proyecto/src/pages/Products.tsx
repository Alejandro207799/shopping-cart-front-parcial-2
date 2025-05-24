import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchProduct } from '../services/api';
import ProductModal from '../components/ProductModal';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data.products);
    } catch (err) {
      setError('Error al cargar los productos. Por favor, intente nuevamente.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = async (productId: number) => {
    try {
      const productData = await fetchProduct(productId);
      setSelectedProduct(productData);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching product details:', err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando productos...</p>
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
      <h2 className="mb-3">Productos</h2>
      
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="btn btn-outline-secondary" 
              type="button"
              onClick={() => setSearchTerm('')}
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
              <div className="text-center bg-light">
                <img 
                  src={product.thumbnail} 
                  className="product-image"
                  alt={product.title} 
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-truncate">{product.description}</p>
                <p className="card-text text-primary fw-bold">${product.price}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-secondary">{product.category}</span>
                  <div className="text-warning">
                    {'★'.repeat(Math.round(product.rating))}
                    {'☆'.repeat(5 - Math.round(product.rating))}
                  </div>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0">
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => handleShowDetails(product.id)}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="alert alert-info text-center">
          No se encontraron productos que coincidan con su búsqueda.
        </div>
      )}

      <ProductModal 
        product={selectedProduct}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Products;