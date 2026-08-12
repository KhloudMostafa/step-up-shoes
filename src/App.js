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

const HomePage = () => (
  <div className="min-vh-100 bg-white">    
    <Navbar />
    <HeroSection />
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
      <Route exact path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;