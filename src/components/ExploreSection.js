import React, { useState } from 'react';

// استيراد صورة الرجل البينك فقط
import explorePink from '../images/explorePink.png';

// استيراد صور الكوتشيات
import explore1 from '../images/explore1.png';
import explore2 from '../images/explore2.png';
import explore3 from '../images/explore3.png';

const ExploreSection = () => {
  const slides = [
    {
      id: 1,
      bgColor: '#FD8B92', // اللون البينك
      title: 'Are you ready to lead the way',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
      personImg: explorePink,
      shoes: [explore1, explore2, explore3],
    },
    {
      id: 2,
      bgColor: '#8a5cf5', // اللون البنفسجي
      title: 'Step up into your new style',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
      personImg: explorePink, // استخدام نفس صورة الرجل البينك
      shoes: [explore2, explore3, explore1],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const activeSlide = slides[currentSlide];

  return (
    <section className="py-5 bg-white position-relative">
      <div className="container-fluid px-3 px-lg-5 pt-5">
        
        {/* البوكس الرئيسي الملون */}
        <div 
          className="rounded-4 position-relative p-4 p-md-5 text-white"
          style={{ 
            backgroundColor: activeSlide.bgColor, 
            minHeight: '420px',
            transition: 'background-color 0.5s ease',
            overflow: 'visible'
          }}
        >
          {/* النص الخلفي StepUP */}
          <span 
            className="position-absolute bottom-0 start-50 translate-middle-x fw-black user-select-none d-none d-md-block"
            style={{ 
              fontSize: '22rem', 
              fontWeight: '900', 
              color: '#FFFFFF14', 
              lineHeight: 0.8,
              letterSpacing: '10px',
              zIndex: 1
            }}
          >
            StepUP
          </span>

          {/* أسهم التنقل */}
          <button 
            onClick={handlePrev}
            className="btn border-0 text-white position-absolute start-0 top-50 translate-middle-y ms-1 ms-md-3 z-3 p-0 opacity-75 hover-opacity-100"
            style={{ fontSize: '1.8rem' }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <button 
            onClick={handleNext}
            className="btn border-0 text-white position-absolute end-0 top-50 translate-middle-y me-1 me-md-3 z-3 p-0 opacity-75 hover-opacity-100"
            style={{ fontSize: '1.8rem' }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>

          {/* 1️⃣ صورة الرجل على الموبايل */}
          <div className="d-block d-md-none text-center position-relative z-2" style={{ marginTop: '-100px', marginBottom: '10px' }}>
            <img 
              src={activeSlide.personImg} 
              alt="Explore Person" 
              className="img-fluid"
              style={{ 
                height: '500px',
                objectFit: 'contain',
                filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.15))'
              }}
            />
          </div>

          {/* 2️⃣ صورة الرجل على الشاشات الكبيرة */}
          <div 
            className="d-none d-md-flex position-absolute start-0 top-0 justify-content-start"
            style={{ width: '45%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
          >
            <img 
              src={activeSlide.personImg} 
              alt="Explore Person" 
              className="img-fluid position-absolute"
              style={{ 
                height: '680px', 
                maxWidth: 'none',
                top: '-209px',
                left: '2%',
                objectFit: 'contain',
                filter: 'drop-shadow(0px 15px 20px rgba(0,0,0,0.12))',
                transition: 'all 0.4s ease'
              }}
            />
          </div>

          {/* محتوى النصوص والأزرار */}
          <div className="row align-items-center h-100 position-relative z-2 g-4">
            <div className="col-12 col-md-7 offset-md-5 text-center text-md-start ps-md-4">
              <h2 className="fw-bold display-5 mb-3" style={{ maxWidth: '500px', lineHeight: '1.2' }}>
                {activeSlide.title}
              </h2>

              <p className="small mb-4 opacity-90" style={{ maxWidth: '420px' }}>
                {activeSlide.description}
              </p>

              <button 
                className="btn btn-white fw-bold px-4 py-2 rounded-1 mb-4 shadow-sm bg-white" 
                style={{ pointerEvents: 'auto', color: activeSlide.bgColor, fontSize: '20px' }}
              >
                Explore
              </button>

              {/* صور الكوتشيات الصغرى */}
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 gap-md-3" style={{ pointerEvents: 'auto' }}>
                {activeSlide.shoes.map((shoeImg, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-3 p-2 d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: '70px', height: '55px', cursor: 'pointer' }}
                  >
                    <img 
                      src={shoeImg} 
                      alt="Mini Shoe" 
                      className="img-fluid" 
                      style={{ maxHeight: '40px', objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExploreSection;