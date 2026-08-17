import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-4">
      <div className="container-fluid px-3 px-lg-5 ms-lg-4">
        
        <div className="row g-4 justify-content-between align-items-start pb-4">
          
          <div className="col-12 col-md-4 text-center text-md-start">
            <h3 className="fw-bold fs-2 mb-3">StepUp</h3>
            <p className="text-secondary small mb-4" style={{ maxWidth: '300px', margin: '0 auto 1.5rem 0' }}>
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
            </p>
            
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <a 
                href="#facebook" 
                className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center text-decoration-none"
                style={{ width: '32px', height: '32px' }}
              >
                <i className="bi bi-facebook fs-6"></i>
              </a>
              <a 
                href="#instagram" 
                className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center text-decoration-none"
                style={{ width: '32px', height: '32px' }}
              >
                <i className="bi bi-instagram fs-6"></i>
              </a>
            </div>
          </div>

          <div className="col-12 col-md-5 text-center">
            <h6 className="fw-normal mb-3 fs-6">Subscribe for news letter</h6>
            
            <div className="bg-white rounded-1 p-1 d-flex align-items-center mx-auto" style={{ maxWidth: '400px' }}>
              <input
                type="email"
                placeholder="Enter Email..."
                className="form-borderless form-control border-0 shadow-none text-dark small px-3"
                style={{ fontSize: '0.85rem' }}
              />
              <span className="text-secondary opacity-50 me-1">|</span>
              <button 
                className="btn btn-link text-dark text-decoration-none fw-bold small px-3 py-1 text-uppercase"
                style={{ fontSize: '0.75rem', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}
              >
                SUBSCRIBE
              </button>
            </div>
          </div>

          <div className="col-12 col-md-2 text-center text-md-start">
            <h6 className="fw-normal mb-3 fs-6">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: '0.82rem' }}>
              <li><a href="#home" className="text-secondary text-decoration-none hover-text-white">Home</a></li>
              <li><a href="#shop" className="text-secondary text-decoration-none hover-text-white">Shop</a></li>
              <li><a href="#category" className="text-secondary text-decoration-none hover-text-white">Category</a></li>
              <li><a href="#contact" className="text-secondary text-decoration-none hover-text-white">Contact</a></li>
              <li><a href="#privacy" className="text-secondary text-decoration-none hover-text-white">Privacy</a></li>
            </ul>
          </div>

        </div>

        <div className="text-center pt-3 mt-3 border-top border-secondary border-opacity-25">
          <p className="text-secondary mb-0" style={{ fontSize: '0.75rem' }}>
            www.stepup.com©all right reserve
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;