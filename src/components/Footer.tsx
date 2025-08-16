// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Discover Pekalongan</h3>
            <p>Pintu masuk menuju kekayaan alam dan budaya yang memikat di Kabupaten Pekalongan, Jawa Tengah.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/culinary">Culinary</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Popular Destinations</h4>
            <ul>
              <li><Link to="/detail?type=destination&id=bajing-waterfall">Bajing Waterfall</Link></li>
              <li><Link to="/detail?type=destination&id=batik-museum">Batik Museum</Link></li>
              <li><Link to="/detail?type=destination&id=kauman-village">Kauman Village</Link></li>
              <li><Link to="/detail?type=destination&id=sokokembang-forest">Sokokembang Forest</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p><i className="fas fa-map-marker-alt"></i> Jl. Krakatau No.9, Tambor, Nyamok, Kec. Kajen, Pekalongan, Jawa Tengah</p>
            <p><i className="fas fa-phone"></i> (0285) 381456, 381010</p>
            <p><i className="fas fa-envelope"></i> bapppedalitbang@pekalongankab.go.id</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Discover Pekalongan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;