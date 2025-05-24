import React from 'react';

interface ProductModalProps {
  product: any;
  show: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, show, onClose }) => {
  if (!show || !product) return null;

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
              <h5 className="modal-title">Detalles del Producto</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {product.images.map((image: string, index: number) => (
                        <div 
                          key={index} 
                          className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        >
                          <img 
                            src={image} 
                            className="d-block w-100" 
                            alt={`${product.title} - Imagen ${index + 1}`}
                            style={{ height: '300px', objectFit: 'contain' }}
                          />
                        </div>
                      ))}
                    </div>
                    {product.images.length > 1 && (
                      <>
                        <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Anterior</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Siguiente</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <h3>{product.title}</h3>
                  <p className="text-muted">{product.brand}</p>
                  <div className="mb-3">
                    <span className="badge bg-secondary">{product.category}</span>
                    <span className="ms-2 text-warning">
                      {'★'.repeat(Math.round(product.rating))}
                      {'☆'.repeat(5 - Math.round(product.rating))}
                    </span>
                  </div>
                  <p>{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-primary">${product.price}</h4>
                    {product.discountPercentage > 0 && (
                      <span className="badge bg-danger">
                        {product.discountPercentage}% DESCUENTO
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <p className="mb-1">
                      <strong>Stock:</strong> {product.stock} unidades
                    </p>
                  </div>
                  <button className="btn btn-primary w-100">
                    Agregar al Carrito
                  </button>
                </div>
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

export default ProductModal;