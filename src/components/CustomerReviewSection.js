import React, { useState } from 'react';

import person1 from '../images/person1.png';
import person2 from '../images/person2.png';

const CustomerReviewSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const reviews = [
    {
      id: 1,
      name: 'Hadeer Hasaneen',
      rating: 4.5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: person1,
    },
    {
      id: 2,
      name: 'Mina Makram',
      rating: 4.5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: person2,
    },
  ];

  return (
    <section className="py-5 bg-white">
      {/* استخدام container ليطابق محاذاة الفيجما والشاشة الكبيرة */}
      <div className="container-fluid px-3 px-lg-5">
        
        {/* العنوان الرئيسي */}
        <div className="text-center mb-4 mb-md-5">
          <h2 className="fw-bold d-inline-flex align-items-center gap-2 fs-3 fs-md-2">
            <span className="text-muted fs-4">—</span> 
            Customer Review 
            <span className="text-muted fs-4">—</span>
          </h2>
        </div>

        {/* شبكة الكروت (col-md-6 لملء نصف العرض بالضبط) */}
        <div className="row g-4">
          {reviews.map((review) => (
            <div key={review.id} className="col-12 col-md-6">
              <div 
                className="p-4 rounded-4 d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-3 h-100"
                style={{ backgroundColor: '#F6F6F6', border: '2px solid #dedede' }}
              >
                {/* صورة الشخص */}
                <div className="flex-shrink-0">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="rounded-3 shadow-sm object-fit-cover"
                    style={{ width: '95px', height: '110px' }}
                  />
                </div>

                {/* تفاصيل العميل */}
                <div className="text-center text-sm-start">
                  <h6 className="fw-bold mb-1 text-dark fs-6" style={{ fontSize: '2rem' }}>
                    {review.name}
                  </h6>

                  {/* النجوم */}
                  <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-1 mb-2 text-warning" style={{ fontSize: '12px' }}>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                  </div>

                  <p className="text-muted small mb-0" style={{ fontSize: '1rem', lineHeight: '1.45' }}>
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Carousel */}
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4 pt-3">
          {[0, 1, 2, 3].map((dotIdx) => (
            <span
              key={dotIdx}
              onClick={() => setActiveSlide(dotIdx)}
              className="rounded-circle transition-all cursor-pointer"
              style={{
                width: dotIdx === activeSlide ? '8px' : '6px',
                height: dotIdx === activeSlide ? '8px' : '6px',
                backgroundColor: dotIdx === activeSlide ? '#1A1A1A' : '#D1D1D1',
                cursor: 'pointer'
              }}
            ></span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReviewSection;