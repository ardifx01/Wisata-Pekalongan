// src/pages/CulinaryPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { websiteData, type CulinaryItem } from '../data/websiteData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CulinaryPage: React.FC = () => {
  const [culinary, setCulinary] = useState<CulinaryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulating API fetch delay
    setTimeout(() => {
      setCulinary(websiteData.culinary);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading culinary...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="page-hero">
        <div className="hero-content">
          <h1>Kuliner Khas Pekalongan</h1>
          <p>Jelajahi kuliner khas dari 23 desa wisata yang menggoda selera dan tak banyak orang tahu!</p>
        </div>
      </section>
      <section className="culinary-listing">
        <div className="container">
          <div className="destinations-grid">
            {culinary.length === 0 ? (
              <div className="no-data-message">
                <p>Belum ada data kuliner yang tersedia.</p>
              </div>
            ) : (
              culinary.map((item) => (
                <div key={item.id} className="destination-card" data-category={item.category}>
                  <Link to={`/detail?type=culinary&id=${item.id}`} className="card-image">
                    <img
                      src={`/${item.image_url}`}
                      alt={item.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                    <div className="card-overlay">
                      <div className="card-content">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CulinaryPage;