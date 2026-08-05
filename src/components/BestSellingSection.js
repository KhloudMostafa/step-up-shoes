import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productsApi';

const categories = ['Man', 'Woman', 'Boy', 'Girl'];

const BestSellingSection = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Man');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter(
    (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase() ||
              (selectedCategory === 'Man' && item.category?.toLowerCase() === 'men') ||
              (selectedCategory === 'Woman' && item.category?.toLowerCase() === 'women')
  );

  return (
    <section className="py-5">
      <div className="container">
        {/* العنوان */}
        <h2 className="fw-bold text-center mb-4">— Best Selling —</h2>

        {/* أزرار الأقسام بتصميم Figma (مربعات) */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${
                selectedCategory === cat ? 'btn-dark' : 'btn-outline-dark'
              } rounded-0 px-4 py-2 fw-medium`}
              style={{ minWidth: '90px' }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* عرض المنتجات */}
        {loading ? (
          <div className="text-center py-5">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-5 text-muted fs-5">
            No products available in <strong>{selectedCategory}</strong> section yet.
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((item) => (
              <div className="col-12 col-md-4" key={item.id}>
                <div className="card h-100 border rounded-4 p-3 position-relative shadow-sm">
                  
                  {/* شارة New وزر المفضلة */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-dark rounded-1 px-2 py-1 fw-normal">New</span>
                    <button className="btn btn-link text-dark p-0 border-0">
                      <i className="bi bi-heart fs-5"></i>
                    </button>
                  </div>

                  {/* صورة المنتج */}
                  <div className="text-center my-3" style={{ height: '180px' }}>
                    <img
                      src={item.image || 'https://via.placeholder.com/200'}
                      alt={item.name}
                      className="img-fluid h-100 object-fit-contain"
                    />
                  </div>

                  {/* معلومات المنتج */}
                  <div className="mt-auto">
                    <h6 className="fw-bold text-dark mb-2">{item.name}</h6>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-bold fs-6 me-2">₹ {item.price}</span>
                        {item.oldPrice && (
                          <del className="text-muted small">₹ {item.oldPrice}</del>
                        )}
                      </div>

                      {/* زر السهم الأسود */}
                      <button className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <i className="bi bi-arrow-up-right fs-6"></i>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellingSection;