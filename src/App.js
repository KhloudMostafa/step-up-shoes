import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminDashboard from "./components/AdminDashboard";
import BestSellingSection from "./components/BestSellingSection";
import BrandsSection from "./components/BrandsSection";
import CustomerReviewSection from "./components/CustomerReviewSection";
import ExploreSection from "./components/ExploreSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import PopularProducts from "./components/PopularProducts";

// مكون صفحة الرئيسية
const HomePage = () => (
  <div className="min-vh-100 bg-white">    
    {/* الخلفية الرمادية تكون فقط داخل حاوية الـ Hero */}
    <div className="position-relative overflow-hidden">
      <div 
        className="position-absolute top-0 end-0 h-100 d-none d-lg-block" 
        style={{ width: '58.333%', backgroundColor: '#ebebeb', zIndex: 0 }}
      ></div>
      <div className="position-relative z-1">
        <Navbar />
        <HeroSection />
      </div>
    </div>

    {/* باقي المكونات بخلفية بيضاء طبيعية وفي العرض الكامل */}
    <BrandsSection />
    <PopularProducts />
    <ExploreSection />
    <BestSellingSection />
    <CustomerReviewSection />
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      {/* صفحة الموقع الرئيسية */}
      <Route exact path="/" element={<HomePage />} />

      {/* صفحة الادمن داش بورد منفصلة */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;