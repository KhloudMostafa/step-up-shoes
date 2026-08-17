import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productsApi';

const PopularProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;

  useEffect(() => {
    const loadTrendingProducts = async () => {
      try {
        const data = await fetchProducts();
        const filtered = data.filter(
          (item) => item.isTrending === true || item.isTrending === 'true'
        );
        setTrendingProducts(filtered);
      } catch (err) {
        console.error("Error fetching popular products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingProducts();
  }, []);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < trendingProducts.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(Math.max(0, trendingProducts.length - itemsPerPage));
    }
  };

  const totalSteps = Math.max(1, trendingProducts.length - itemsPerPage + 1);

  return (
    <section className="py-5 overflow-hidden">
      <div className="container-fluid px-3 px-lg-5">
        <div className="row align-items-center">

          <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <span className="text-muted fw-semibold text-uppercase small">— Our Trending Shoe</span>
            <h2 className="fw-bold display-6 text-dark mt-2 mb-3">Most Popular Products</h2>
            <p className="text-secondary small mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="btn btn-dark rounded-2 px-4 py-2 fw-semibold">Explore</button>
          </div>

          <div className="col-12 col-lg-8">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-dark" role="status"></div>
              </div>
            ) : trendingProducts.length === 0 ? (
              <div className="p-5 text-center bg-light rounded-4 border text-muted fw-semibold">
                No popular products available right now.
              </div>
            ) : (
              <div className="position-relative px-md-4">
                
                {!isMobile && trendingProducts.length > 3 && (
                  <>
                    <button 
                      onClick={prevSlide}
                      className="btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y z-3 d-flex align-items-center justify-content-center border"
                      style={{ width: '40px', height: '40px', left: '-15px' }}
                    >
                      <i className="bi bi-chevron-left text-dark fs-6"></i>
                    </button>

                    <button 
                      onClick={nextSlide}
                      className="btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y z-3 d-flex align-items-center justify-content-center border"
                      style={{ width: '40px', height: '40px', right: '-15px' }}
                    >
                      <i className="bi bi-chevron-right text-dark fs-6"></i>
                    </button>
                  </>
                )}

                <div className="row g-3">
                  {trendingProducts.slice(currentIndex, currentIndex + itemsPerPage).map((product) => (
                    <div key={product.id} className={isMobile ? 'col-12' : 'col-12 col-md-4'}>
                      <div className="card h-100 border-0 bg-light rounded-4 p-3 shadow-sm">
                        <div className="text-center py-2">
                          <img
                            src={product.image || 'https://via.placeholder.com/200'}
                            alt={product.name}
                            className="img-fluid rounded-3"
                            style={{ height: '160px', objectFit: 'contain' }}
                          />
                        </div>
                        <div className="card-body p-0 pt-3 d-flex flex-column justify-content-between">
                          <h6 className="fw-bold text-dark text-truncate mb-2">{product.name}</h6>
                          <div className="d-flex align-items-center justify-content-between mt-2">
                            <span className="fw-bold text-dark fs-5">₹ {product.price}</span>
                            <button className="btn btn-dark rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                              <i className="bi bi-arrow-up-right fs-6"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                  
                  {isMobile && trendingProducts.length > 1 && (
                    <button 
                      onClick={prevSlide}
                      className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center border"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <i className="bi bi-chevron-left fs-6"></i>
                    </button>
                  )}

                  {trendingProducts.length > itemsPerPage && (
                    <div className="d-flex align-items-center gap-2">
                      {Array.from({ length: totalSteps }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className="border-0 rounded-pill p-0"
                          style={{
                            width: currentIndex === idx ? '22px' : '8px',
                            height: '8px',
                            backgroundColor: currentIndex === idx ? '#212529' : '#ccc',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {isMobile && trendingProducts.length > 1 && (
                    <button 
                      onClick={nextSlide}
                      className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center border"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <i className="bi bi-chevron-right fs-6"></i>
                    </button>
                  )}

                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PopularProducts;