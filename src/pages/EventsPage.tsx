// src/pages/EventsPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { websiteData, type EventItem } from '../data/websiteData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulating API fetch delay
    setTimeout(() => {
      setEvents(websiteData.events);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
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
          <h1>Event Tahunan Desa Wisata</h1>
          <p>Nikmati kemeriahan budaya lokal dari Kabupaten Pekalongan setiap tahunnya</p>
        </div>
      </section>
      <section className="events-listing">
        <div className="container">
          <div className="destinations-grid">
            {events.length === 0 ? (
              <div className="no-data-message">
                <p>Belum ada data event yang tersedia.</p>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="destination-card" data-category={event.category}>
                  <Link to={`/detail?type=event&id=${event.id}`} className="card-image">
                    <img src={`/${event.image}`} alt={event.title} />
                    <div className="card-overlay">
                      <div className="card-content">
                        <h3>{event.title}</h3>
                        <p>{event.subtitle}</p>
                        <div className="card-meta">
                          <span className="location"><i className="fas fa-map-marker-alt"></i> {event.location}</span>
                          <span className="category"><i className="fas fa-tag"></i> {event.category}</span>
                          <span className="date"><i className="fas fa-calendar"></i> {event.date}</span>
                        </div>
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

export default EventsPage;