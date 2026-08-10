import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/productsApi';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // حالات التحكم في النوافذ المنبثقة
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // حالة الرسائل التنبيهية (Alerts)
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: 'success' });

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: '',
    oldPrice: '',
    category: 'Man',
    image: '',
    isTrending: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const triggerAlert = (message, type = 'success') => {
    setAlertInfo({ show: true, message, type });
    setTimeout(() => {
      setAlertInfo({ show: false, message: '', type: 'success' });
    }, 3000);
  };

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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 350;
          const scaleFactor = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleFactor;

          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
          setFormData((prev) => ({ ...prev, image: compressedBase64 }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // فتح مودال إضافة منتج جديد
  const openAddModal = () => {
    setFormData({
      id: null,
      name: '',
      price: '',
      oldPrice: '',
      category: 'Man',
      image: '',
      isTrending: false,
    });
    setIsEditing(false);
    setShowFormModal(true);
  };

  // فتح مودال التعديل
  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name || '',
      price: product.price || '',
      oldPrice: product.oldPrice || '',
      category: product.category || 'Man',
      image: product.image || '',
      isTrending: Boolean(product.isTrending),
    });
    setIsEditing(true);
    setShowFormModal(true);
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
      image: formData.image || 'https://via.placeholder.com/300',
      isTrending: Boolean(formData.isTrending),
    };

    try {
      if (isEditing) {
        await updateProduct(formData.id, payload);
        triggerAlert('Product Updated Successfully!', 'success');
      } else {
        await createProduct(payload);
        triggerAlert('Product Added Successfully!', 'success');
      }

      setShowFormModal(false);
      await loadProducts();
    } catch (err) {
      console.error("Error submitting form:", err);
      triggerAlert('An Error Ocured While Saving Data!', 'danger');
    }
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        triggerAlert('Product Deleted Successfully!', 'warning');
        await loadProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
        triggerAlert('An Error Ocured While Deleting!', 'danger');
      }
    }
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  return (
    <div className="container-fluid px-3 px-lg-5 py-4 py-md-5 position-relative">
      
      {/* 🔹 رسالة التنبيه العائمة (Alert Notification) */}
      {alertInfo.show && (
        <div 
          className={`alert alert-${alertInfo.type} alert-dismissible fade show position-fixed top-0 end-0 m-4 shadow-lg z-3`}
          style={{ zIndex: 2000, minWidth: '280px' }}
          role="alert"
        >
          <i className={`bi ${alertInfo.type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill'} me-2`}></i>
          {alertInfo.message}
        </div>
      )}

      {/* الشريط العلوي */}
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

      {/* 🔹 زر إضافة منتج جديد */}
      <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-3 rounded-3 shadow-sm">
        <h5 className="fw-bold m-0 text-dark">Products List</h5>
        <button 
          onClick={openAddModal}
          className="btn btn-dark d-flex align-items-center gap-2 rounded-2 px-4 py-2 fw-semibold"
        >
          <i className="bi bi-plus-lg fs-6"></i>
          Add New Product
        </button>
      </div>

      {/* جدول المنتجات */}
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
                <th scope="col" className="fw-bold py-2 text-muted text-center">Trending</th>
                <th scope="col" className="fw-bold py-2 text-end text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-bottom">
                  <td className="py-3 text-dark fw-medium">{product.name}</td>
                  <td className="text-secondary">{product.category}</td>
                  <td className="fw-bold text-dark">₹ {product.price}</td>
                  <td className="text-center">
                    {product.isTrending ? (
                      <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 rounded-pill">
                        Yes
                      </span>
                    ) : (
                      <span className="badge bg-light text-muted border px-2 py-1 rounded-pill">
                        No
                      </span>
                    )}
                  </td>
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

      {/* 🔹 نافذة إضافة/تعديل المنتج المنبثقة (Modal) */}
      {showFormModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg px-3">
            <div className="modal-content rounded-4 border-0 p-3 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h5 className="fw-bold fs-5 m-0">{isEditing ? 'Edit Product' : 'Add New Product'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowFormModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold small text-muted">Product Name</label>
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
                      <label className="form-label fw-semibold small text-muted">Price</label>
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
                      <label className="form-label fw-semibold small text-muted">Old Price</label>
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
                      <label className="form-label fw-semibold small text-muted">Category</label>
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

                    <div className="col-12 col-md-8">
                      <label className="form-label fw-semibold small text-muted">Product Image</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="image"
                          placeholder="Paste Image URL or click Upload"
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

                    <div className="col-12 my-2">
                      <div className="form-check d-flex align-items-center gap-2 ps-0">
                        <input
                          type="checkbox"
                          id="isTrending"
                          name="isTrending"
                          className="form-check-input m-0 cursor-pointer"
                          style={{ width: '20px', height: '20px' }}
                          checked={formData.isTrending}
                          onChange={handleChange}
                        />
                        <label htmlFor="isTrending" className="form-check-label fw-semibold text-dark cursor-pointer user-select-none">
                          Add to Popular / Trending Products
                        </label>
                      </div>
                    </div>

                    <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                      <button 
                        type="button" 
                        className="btn btn-light px-4 rounded-2 fw-semibold"
                        onClick={() => setShowFormModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-dark px-4 rounded-2 fw-bold text-uppercase">
                        {isEditing ? 'Update Product' : 'Add Product'}
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تأكيد الحذف المنبثقة */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered px-3">
            <div className="modal-content rounded-4 border-0 p-3 text-center shadow-lg">
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