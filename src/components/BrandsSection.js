import React from 'react';

// استيراد الصور من مجلد images
import ajioLogo from '../images/AJIO.png';
import amazonLogo from '../images/Amazon.png';
import ebayLogo from '../images/ebay.png';

const BrandsSection = () => {
  // حددنا ارتفاع مناسب لكل لوجو بشكل مستقل عشان يطلعوا بنفس الحجم البصري
  const brandLogos = [
    { src: ebayLogo, alt: 'eBay', hDesk: '60px' , hMob: '30px' },
    { src: amazonLogo, alt: 'Amazon', hDesk: '55px' , hMob: '30px' },
    { src: ajioLogo, alt: 'AJIO', hDesk: '36px' , hMob: '15px' },
    { src: ebayLogo, alt: 'eBay', hDesk: '60px' , hMob: '30px' },
    { src: amazonLogo, alt: 'Amazon', hDesk: '55px' , hMob: '30px' },
    { src: ajioLogo, alt: 'AJIO', hDesk: '36px' , hMob: '15px' },
  ];

  return (
    <section className="py-4 position-relative z-2" style={{backgroundColor: 'black'}}>
      <div className="container-fluid px-4 px-lg-5 ms-lg-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-center gap-3 gap-md-4">
          {brandLogos.map((logo, index) => (
            <div key={index} className="d-flex align-items-center justify-content-center px-2 py-1">
              <img
                src={logo.src}
                alt={logo.alt}
                className="img-fluid d-none d-md-block"
                style={{
                  height: logo.hDesk,
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.95,
                }}
              />
              {/* نسخة الموبايل بحجم أصغر ومظبوط */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="img-fluid d-md-none"
                style={{
                  height: logo.hMob,
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.95,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;