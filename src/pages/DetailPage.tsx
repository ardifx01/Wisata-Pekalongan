// src/pages/DetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { websiteData } from '../data/websiteData';
import type { EventItem, CulinaryItem } from '../data/websiteData';
import type { Destination } from '../types/destination';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Antarmuka untuk data detail, digabungkan dari semua tipe data
interface DetailData extends Destination, EventItem, CulinaryItem {
  type: string;
}

const DetailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<DetailData | null>(null);
  const [relatedItems, setRelatedItems] = useState<(Destination | EventItem | CulinaryItem)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const type = searchParams.get('type');
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (!type || !id) {
        setError('URL tidak valid.');
        setLoading(false);
        return;
      }

      try {
        const numericId = parseInt(id, 10);
        let fetchedData: (Destination | EventItem | CulinaryItem) | undefined;
        let related: (Destination | EventItem | CulinaryItem)[] = [];

        switch (type) {
          case 'destination':
            fetchedData = websiteData.destinations.find((d) => d.id === numericId);
            related = websiteData.destinations.filter((d) => d.category === fetchedData?.category && d.id !== numericId).slice(0, 3);
            break;
          case 'event':
            fetchedData = websiteData.events.find((e) => e.id === numericId);
            related = websiteData.events.filter((e) => e.category === fetchedData?.category && e.id !== numericId).slice(0, 3);
            break;
          case 'culinary':
            fetchedData = websiteData.culinary.find((c) => c.id === numericId);
            related = websiteData.culinary.filter((c) => c.category === fetchedData?.category && c.id !== numericId).slice(0, 3);
            break;
          default:
            throw new Error('Tipe konten tidak dikenal.');
        }

        if (!fetchedData) {
          throw new Error('Konten tidak ditemukan.');
        }

        setData({ ...fetchedData, type } as DetailData);
        setRelatedItems(related);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  const generateMapUrl = (coordinates: string | undefined) => {
    if (!coordinates) return '';
    const [lat, lng] = coordinates.split(',');
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container"><div className="loading-spinner"></div><p>Loading content...</p></div>
        <Footer />
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Konten Tidak Ditemukan</h2>
          <p>Konten yang diminta tidak dapat ditemukan. Silakan periksa URL atau kembali ke beranda.</p>
          <a href="/" className="cta-button">Kembali ke Beranda</a>
        </div>
        <Footer />
      </>
    );
  }

  const mapUrl = (data as any).coordinates ? generateMapUrl((data as any).coordinates) : '';
  const imageUrl = (data as any).image_url || (data as any).image;

  return (
    <>
      <Navbar />
      <main id="detail-content">
        <section className="detail-hero">
          <div className="detail-hero-image">
            <img id="hero-image" src={`/${imageUrl}`} alt={data.name} />
            <div className="hero-overlay"></div>
          </div>
          <div className="detail-hero-content">
            <div className="container">
              <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to={`/${data.type}s`} id="breadcrumb-category">{data.type}</Link>
                <span>/</span>
                <span id="breadcrumb-title">{data.name}</span>
              </div>
              <h1 id="detail-title">{data.name}</h1>
              <p id="detail-subtitle">{data.description}</p>
              <div className="detail-meta">
                <span id="detail-location"><i className="fas fa-map-marker-alt"></i> {data.location}</span>
                <span id="detail-category"><i className="fas fa-tag"></i> {data.category}</span>
                {data.type === 'event' && data.date && <span id="detail-date"><i className="fas fa-calendar"></i> {data.date}</span>}
              </div>
            </div>
          </div>
        </section>
        <section className="detail-info">
          <div className="container">
            <div className="detail-grid">
              <div className="detail-main">
                <div className="detail-description">
                  <h2>Description</h2>
                  <div id="detail-description-content">
                    <p>{data.description}</p>
                  </div>
                </div>

                {data.type === 'destination' && (
                  <div id="destination-info" className="additional-info">
                    <h2>Information</h2>
                    <div className="info-grid">
                      <div className="info-item">
                        <h3><i className="fas fa-clock"></i> Opening Hours</h3>
                        <p id="opening-hours">{(data as any).openingHours}</p>
                      </div>
                      <div className="info-item">
                        <h3><i className="fas fa-ticket-alt"></i> Entrance Fee</h3>
                        <p id="entrance-fee">{(data as any).entranceFee}</p>
                      </div>
                      <div className="info-item">
                        <h3><i className="fas fa-car"></i> Access</h3>
                        <p id="access-info">{(data as any).accessInfo}</p>
                      </div>
                      <div className="info-item">
                        <h3><i className="fas fa-phone"></i> Contact</h3>
                        <p id="contact-info">{(data as any).contactInfo}</p>
                      </div>
                    </div>
                  </div>
                )}
                {data.type === 'event' && (
                  <div id="event-info" className="additional-info">
                    <h2>Event Details</h2>
                    <div className="info-grid">
                      <div className="info-item">
                        <h3><i className="fas fa-calendar-alt"></i> Event Date</h3>
                        <p id="event-date">{(data as any).eventDate}</p>
                      </div>
                      <div className="info-item">
                        <h3><i className="fas fa-clock"></i> Duration</h3>
                        <p id="event-duration">{(data as any).duration}</p>
                      </div>
                      <div className="info-item">
                        <h3><i className="fas fa-users"></i> Organizer</h3>
                        <p id="event-organizer">{(data as any).organizer}</p>
                      </div>
                      <div className="info-item">
                        <h3><i className="fas fa-ticket-alt"></i> Entry</h3>
                        <p id="event-entry">{(data as any).entry}</p>
                      </div>
                    </div>
                  </div>
                )}
                {data.type === 'culinary' && (
                  <div id="culinary-info" className="additional-info">
                    <h2>Culinary Information</h2>
                    <div className="info-grid">
                      <div className="info-item">
                        <h3><i className="fas fa-utensils"></i> Type</h3>
                        <p id="culinary-type">{(data as any).culinaryType}</p>
                      </div>
                      <div className="info-item">
                        <h3><i className="fas fa-dollar-sign"></i> Price Range</h3>
                        <p id="price-range">{(data as any).priceRange}</p>
                      </div>
                      <div className="info-item">
                        <h3><i className="fas fa-fire"></i> Spice Level</h3>
                        <p id="spice-level">{(data as any).spiceLevel}</p>
                      </div>
                      <div className="info-item">
                        <h3><i className="fas fa-leaf"></i> Special Diet</h3>
                        <p id="special-diet">{(data as any).specialDiet}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="detail-sidebar">
                <div className="sidebar-section">
                  <h3><i className="fas fa-map-marker-alt"></i> Location</h3>
                  <div id="map-container" className="map-container">
                    <iframe
                      id="google-map"
                      title="Google Map"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={mapUrl}
                    ></iframe>
                  </div>
                  <p id="full-address" className="address">{(data as any).address}</p>
                </div>

                <div className="sidebar-section">
                  <h3><i className="fas fa-heart"></i> You Might Also Like</h3>
                  <div id="related-items" className="related-items">
                    {relatedItems.map((item) => (
                      <Link to={`/detail?type=${data.type}&id=${item.id}`} key={item.id} className="related-item">
                        <img src={`/${(item as any).image_url || (item as any).image}`} alt={(item as any).name || (item as any).title} />
                        <div className="related-item-content">
                          <h4>{(item as any).name || (item as any).title}</h4>
                          <p><i className="fas fa-map-marker-alt"></i> {(item as any).location}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DetailPage;