import React, { useState, useEffect } from 'react';

// استيراد الصور
import popular1 from '../images/popular1.png';
import popular2 from '../images/popular2.png';
import popular3 from '../images/popular3.png';

const PopularProducts = () => {
  const products = [
    { id: 1, name: 'Running sport shoe', price: '₹ 3999.00', image: popular1 },
    { id: 2, name: 'Running sport shoe', price: '₹ 3999.00', image: popular2 },
    { id: 3, name: 'Running sport shoe', price: '₹ 3999.00', image: popular3 },
    { id: 4, name: 'Casual sport shoe', price: '₹ 4599.00', image: popular1 },
    { id: 5, name: 'Sneakers sport shoe', price: '₹ 2999.00', image: popular2 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // تحديث عدد الكروت تلقائياً حسب حجم الشاشة
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - visibleCards : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= products.length - visibleCards ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-5 bg-white position-relative overflow-hidden">
      <div className="container-fluid px-4 px-lg-5">
        <div className="row align-items-center g-4">
          
          {/* الجانب الأيسر - العنوان والوصف */}
          <div className="col-lg-3 pe-lg-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="bg-dark" style={{ width: '28px', height: '2px' }}></span>
              <span className="fw-semibold text-dark fs-6">Our Trending Shoe</span>
            </div>

            <h2 className="fw-bold display-6 text-dark mb-3" style={{ lineHeight: '1.2' }}>
              Most Popular <br /> Products
            </h2>

            <p className="text-secondary small mb-4">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit,
            </p>

            <button className="btn btn-dark px-4 py-3 rounded-1 fw-bold fs-6 shadow-sm">
              Explore
            </button>
          </div>

          {/* الجانب الأيمن - السلايدر */}
          <div className="col-lg-9 position-relative">
            <div className="d-flex align-items-center gap-2 gap-md-3">
              
              {/* سهم الشمال (الشاشات الكبيرة) */}
              <button
                onClick={handlePrev}
                className="btn border-0 p-0 text-dark opacity-75 hover-opacity-100 fs-3 d-none d-md-block"
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              {/* الكروت */}
              <div className="row g-3 flex-grow-1 flex-nowrap overflow-hidden py-2">
                {products
                  .slice(currentIndex, currentIndex + visibleCards)
                  .map((product) => (
                    <div key={product.id} className="col-12 col-md-4">
                      <div 
                        className="card rounded-4 p-3 h-100 position-relative shadow-sm"
                        style={{ 
                          backgroundColor: '#f8f9fa', 
                          transition: 'all 0.3s ease',
                          border: '2px solid #dedede' 
                        }}
                      >
                        <div 
                          className="d-flex justify-content-center align-items-center py-4 px-2"
                          style={{ height: '200px' }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid"
                            style={{
                              maxHeight: '160px',
                              objectFit: 'contain',
                              filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.12))'
                            }}
                          />
                        </div>

                        <div className="mt-auto pt-3">
                          <h6 className="fw-semibold text-dark mb-3">{product.name}</h6>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-dark fs-5">{product.price}</span>
                            <button className="btn btn-dark rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                              <i className="bi bi-arrow-up-right fs-6"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* سهم اليمين (الشاشات الكبيرة) */}
              <button
                onClick={handleNext}
                className="btn border-0 p-0 text-dark opacity-75 hover-opacity-100 fs-3 d-none d-md-block"
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-chevron-right"></i>
              </button>

            </div>

            {/* عناصر التحكم للموبايل والـ Dots */}
            <div className="d-flex justify-content-between justify-content-md-center align-items-center gap-2 mt-4 px-2">
              
              {/* سهم الشمال للموبايل */}
              <button
                onClick={handlePrev}
                className="btn btn-outline-dark rounded-circle d-md-none p-0 d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
              >
                <i className="bi bi-chevron-left fs-6"></i>
              </button>

              {/* Dots */}
              <div className="d-flex align-items-center gap-2">
                {Array.from({ length: Math.max(1, products.length - visibleCards + 1) }).map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`rounded-pill transition-all ${
                      currentIndex === idx ? 'bg-dark' : 'bg-secondary opacity-50'
                    }`}
                    style={{
                      width: currentIndex === idx ? '24px' : '8px',
                      height: '8px',
                      cursor: 'pointer'
                    }}
                  ></span>
                ))}
              </div>

              {/* سهم اليمين للموبايل */}
              <button
                onClick={handleNext}
                className="btn btn-outline-dark rounded-circle d-md-none p-0 d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
              >
                <i className="bi bi-chevron-right fs-6"></i>
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PopularProducts;