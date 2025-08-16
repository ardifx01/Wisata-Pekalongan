// src/pages/DestinationsPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Destination } from '../types/destination';
import { websiteData, subdistricts } from '../data/websiteData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DestinationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubdistrict, setActiveSubdistrict] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setDestinations(websiteData.destinations);
      setLoading(false);
    }, 500);
  }, []);

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
  };

  const handleSubdistrictFilter = (subdistrict: string) => {
    setActiveSubdistrict(subdistrict);
  };

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = activeCategory === 'all' || dest.category === activeCategory;
    const matchesSubdistrict = activeSubdistrict === 'all' || dest.subdistrict === activeSubdistrict;
    return matchesCategory && matchesSubdistrict;
  });

  const groupedDestinations = subdistricts.reduce<Record<string, Destination[]>>((acc, subdistrict) => {
    const list = filteredDestinations.filter((dest) => dest.subdistrict === subdistrict);
    if (list.length > 0) {
      acc[subdistrict] = list;
    }
    return acc;
  }, {});

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading destinations...</p>
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
          <h1>Semua Destinasi Wisata Pekalongan</h1>
          <p>Jelajahi 45+ destinasi wisata dan desa wisata yang tersebar di 9 kecamatan di Kabupaten Pekalongan</p>
        </div>
      </section>
      <section className="filter-section">
        <div className="container">
          <div className="filter-controls">
            <div className="category-filters">
              <h3>Kategori</h3>
              <div className="filter-buttons">
                <button className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => handleCategoryFilter('all')}>Semua</button>
                <button className={`filter-btn ${activeCategory === 'village' ? 'active' : ''}`} onClick={() => handleCategoryFilter('village')}>Desa Wisata</button>
                <button className={`filter-btn ${activeCategory === 'destination' ? 'active' : ''}`} onClick={() => handleCategoryFilter('destination')}>Destinasi Wisata</button>
              </div>
            </div>
            <div className="subdistrict-filters">
              <h3>Kecamatan</h3>
              <div className="filter-buttons">
                <button className={`subdistrict-btn ${activeSubdistrict === 'all' ? 'active' : ''}`} onClick={() => handleSubdistrictFilter('all')}>Semua Kecamatan</button>
                {subdistricts.map((subdistrict) => (
                  <button key={subdistrict} className={`subdistrict-btn ${activeSubdistrict === subdistrict ? 'active' : ''}`} onClick={() => handleSubdistrictFilter(subdistrict)}>
                    {subdistrict}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="destinations-by-subdistrict">
        <div className="container">
          {Object.keys(groupedDestinations).map((subdistrict) => (
            <div key={subdistrict} className="subdistrict-section visible" data-subdistrict={subdistrict}>
              <div className="subdistrict-header">
                <h2>Kecamatan {subdistrict}</h2>
                <p>Jelajahi destinasi yang ada di kecamatan ini.</p>
              </div>
              <div className="destinations-grid">
                {(groupedDestinations as Record<string, Destination[]>)[subdistrict].map((destination: Destination) => (
                  <div key={destination.id} className="destination-card" data-category={destination.category} data-subdistrict={destination.subdistrict}>
                    <Link to={`/detail?type=destination&id=${destination.id}`} className="card-image">
                      <img src={`/${destination.image_url}`} alt={destination.name} />
                      <div className="card-overlay">
                        <div className="card-content">
                          <h3>{destination.name}</h3>
                          <p>{destination.description}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {filteredDestinations.length === 0 && (
            <div className="no-data-message">
              <p>Tidak ada destinasi yang sesuai dengan filter yang dipilih.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DestinationsPage;