// src/pages/HomePage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Destination } from '../types/destination';
import { websiteData } from '../data/websiteData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      const featured = websiteData.destinations.filter((dest) => dest.featured);
      setFeaturedDestinations(featured.slice(0, 6)); // Ambil maksimal 6 destinasi unggulan
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container"><div className="loading-spinner"></div><p>Loading home page...</p></div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Discover the Hidden Gems of Pekalongan</h1>
            <p className="hero-subtitle">Nikmati perpaduan sempurna antara keindahan alam, kekayaan budaya, kuliner khas, dan warisan budaya yang hidup di salah satu daerah paling memikat di Jawa Tengah.</p>
            <Link to="/destinations" className="cta-button">Explore Now</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero_banner.jpg" alt="Pekalongan Landscape" />
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="destinations">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Destinasi Populer Kabupaten Pekalongan</h2>
            <p className="section-subtitle">Jelajahi destinasi wisata terpopuler dan paling banyak dikunjungi di Kabupaten Pekalongan</p>
          </div>
          
          <div className="destinations-grid">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="destination-card" data-category={destination.category}>
                <Link to={`/detail?type=destination&id=${destination.id}`} className="card-image">
                  <img src={`/${destination.image_url}`} alt={destination.name} />
                  <div className="card-overlay">
                    <div className="card-content">
                      <h3>{destination.name}</h3>
                      <p>{destination.description}</p>
                      <Link to={`/detail?type=destination&id=${destination.id}`} className="learn-more">Learn More</Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <Link to="/destinations" className="explore-all-btn">
              <span>Jelajahi Semua Destinasi</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
            <p className="cta-subtitle">Temukan 45+ destinasi wisata dan desa wisata di Kabupaten Pekalongan</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-pekalongan" style={{ padding: '40px', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2>Tentang Wisata Kabupaten Pekalongan</h2>
          <p>
            Kabupaten Pekalongan adalah salah satu permata tersembunyi di pesisir utara Pulau Jawa, Provinsi Jawa Tengah.
            Wilayah ini menyimpan kekayaan alam dan budaya yang luar biasa — mulai dari pesona pegunungan yang hijau,
            lembah dan curug yang eksotis, hingga keindahan pantai yang tenang. Tak hanya terkenal sebagai pusat batik dunia,
            Kabupaten Pekalongan juga tumbuh sebagai salah satu destinasi wisata unggulan yang menyuguhkan pengalaman liburan
            yang lengkap, alami, dan autentik.
          </p>
          <div className="filter-buttons">
            <Link to="/about" className="filter-btn">Read More</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;