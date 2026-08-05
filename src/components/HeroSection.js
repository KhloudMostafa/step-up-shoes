import React from 'react';
import heroShoeImg from '../images/hero-shoe.png';

const HeroSection = () => {
  return (
    <section className="hero-section flex-grow-1 d-flex align-items-center">
      <div className="container-fluid p-0 w-100">
        <div className="row g-0 align-items-center">
          
          {/* الجانب الأيسر - النص والزرار */}
          <div className="col-lg-5 px-4 p-lg-5 d-flex flex-column justify-content-center text-center text-lg-start z-2 bg-white">
            <h1 className="fw-bold text-dark mb-4 ms-lg-4" style={{ fontSize: 'calc(2.2rem + 1.8vw)', lineHeight: '1.15' }}>
              Find Your <br className="d-none d-sm-inline" />
              Sole Mate <br className="d-none d-sm-inline" />
              With Us
            </h1>
            <p className="mb-4 ms-lg-4 pe-lg-4 text-secondary" style={{ fontSize: '1.1rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </p>
            <div className='ms-lg-4'>
              <a href="#!" className="btn btn-dark px-4 py-3 rounded-1 fw-bold fs-6">
                Shop Now
              </a>
            </div>
          </div>

          {/* الجانب الأيمن - الكوتشي والكلمة الرأسية */}
          <div 
            className="col-lg-7 position-relative d-flex flex-column align-items-center justify-content-center py-5 bg-light-mobile"
            style={{ backgroundColor: 'inherit' }}
          >
            {/* خلفية رمادية تظهر فقط في الموبايل للسكشن ده */}
            <div className="position-absolute top-0 start-0 w-100 h-100 d-lg-none" style={{ backgroundColor: '#ebebeb', zIndex: 0 }}></div>

            {/* كلمة ULTIMATE الرأسية */}
            <span 
              className="position-absolute text-white user-select-none"
              style={{
                fontSize: 'calc(3.5rem + 3vw)',
                fontWeight: '900',
                letterSpacing: '8px',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                left: '-22px',
                top: '50%',
                translate: '0 -50%',
                zIndex: 1,
                lineHeight: 1
              }}
            >
              ULTIMATE
            </span>

            {/* صورة الكوتشي */}
            <div className="position-relative d-flex justify-content-center align-items-center p-3" style={{ zIndex: 2 }}>
              <img 
                src={heroShoeImg} 
                alt="Trendy StepUp Pro" 
                className="img-fluid"
                style={{ 
                  maxHeight: '450px',
                  filter: 'drop-shadow(0px 15px 20px rgba(0,0,0,0.15))',
                }}
              />
            </div>

            {/* النص والسعر */}
            <div className="mt-3 text-center" style={{ zIndex: 2 }}>
              <h3 className="fw-bold mb-1 text-dark fs-4">Trendy StepUp Pro</h3>
              <p className="text-secondary fw-bold fs-5 m-0">₹ 3999.00</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;