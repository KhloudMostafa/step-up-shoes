import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/productsApi';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: '',
    oldPrice: '',
    category: 'Man',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 معالجة رفع الملف وتقليص حجمه لتجنب أخطاء MockAPI
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const scaleFactor = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleFactor;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setFormData((prev) => ({ ...prev, image: compressedBase64 }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const openDeleteModal = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const payload = {
      name: formData.name,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      category: formData.category,
      image: formData.image || 'https://via.placeholder.com/300'
    };

    try {
      if (isEditing) {
        await updateProduct(formData.id, payload);
      } else {
        await createProduct(payload);
      }

      setFormData({ id: null, name: '', price: '', oldPrice: '', category: 'Man', image: '' });
      setIsEditing(false);
      await loadProducts();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("فشل في حفظ المنتج، تأكدي من حجم الصورة أو الاتصال بـ API");
    }
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        await loadProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  return (
    <div className="container-fluid px-3 px-lg-5 py-4 py-md-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Link 
          to="/" 
          className="btn btn-outline-dark d-inline-flex align-items-center gap-2 rounded-2 px-3 py-2 fw-semibold border-2"
          style={{ fontSize: '0.9rem' }}
        >
          <i className="bi bi-arrow-left fs-5"></i>
          Back to Home
        </Link>
        <h3 className="fw-bold m-0 fs-4 text-dark">Admin Dashboard</h3>
      </div>

      <div className="card border-0 shadow-sm p-3 p-md-4 mb-4 bg-light rounded-3">
        <h5 className="fw-bold mb-3 fs-5">{isEditing ? 'Edit Product' : 'Add New Product'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-2 g-md-3">
            
            <div className="col-12 col-md-6">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6 col-md-3">
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-6 col-md-3">
              <input
                type="number"
                name="oldPrice"
                placeholder="Old price"
                className="form-control"
                value={formData.oldPrice}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-4">
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Man">Man</option>
                <option value="Woman">Woman</option>
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
              </select>
            </div>

            {/* 🔹 حقل موحد: لصق رابط أو رفع ملف عبر زر Upload */}
            <div className="col-12 col-md-8">
              <div className="input-group">
                <input
                  type="text"
                  name="image"
                  placeholder="Paste Image URL or click Upload ->"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                />
                <label className="btn btn-dark mb-0 d-flex align-items-center gap-2 px-3 cursor-pointer">
                  <i className="bi bi-upload"></i>
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            <div className="col-12 mt-3">
              <button type="submit" className="btn btn-dark w-100 py-2 fw-bold text-uppercase fs-6">
                {isEditing ? 'Update Product' : 'Add Product'}
              </button>
            </div>

          </div>
        </form>
      </div>

      <div className="table-responsive bg-white rounded-3 shadow-sm p-2 p-md-3">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table align-middle mb-0" style={{ minWidth: '500px' }}>
            <thead>
              <tr className="border-bottom">
                <th scope="col" className="fw-bold py-2 text-muted">Name</th>
                <th scope="col" className="fw-bold py-2 text-muted">Category</th>
                <th scope="col" className="fw-bold py-2 text-muted">Price</th>
                <th scope="col" className="fw-bold py-2 text-end text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-bottom">
                  <td className="py-3 text-dark fw-medium">{product.name}</td>
                  <td className="text-secondary">{product.category}</td>
                  <td className="fw-bold text-dark">₹ {product.price}</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn btn-link text-primary text-decoration-none p-0 me-3 fw-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(product.id)}
                      className="btn btn-link text-danger text-decoration-none p-0 fw-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered px-3">
            <div className="modal-content rounded-4 border-0 p-3 text-center">
              <div className="modal-body">
                <i className="bi bi-exclamation-circle text-warning display-4 mb-3 d-block"></i>
                <h5 className="fw-bold mb-2">Are you sure you want to delete it?</h5>
                <p className="text-muted small mb-4">This action cannot be undone.</p>
                <div className="d-flex justify-content-center gap-2">
                  <button type="button" className="btn btn-light px-4 rounded-2 fw-semibold" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger px-4 rounded-2 fw-semibold" onClick={confirmDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;