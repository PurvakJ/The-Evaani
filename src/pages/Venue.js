import { useState, useEffect } from "react";
import { useData } from "../App";
import { useNavigate } from "react-router-dom";
import "../styles/Venue.css";

export default function Venue() {
  const { images = [] } = useData();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // Hardcoded venue images
  const venueSpaces = [
    {
      id: 1,
      name: "Golden Leaf",
      capacity: "300 Guests",
      description: "Perfect for weddings, corporate events, and large celebrations with elegant decor and state-of-the-art facilities",
      features: ["Stage & Podium", "Dance Floor", "AV Equipment", "Catering Kitchen", "Lighting System", "Sound System", "Bridal Suite"],
      price: "Starting at ₹2,00,000",
      size: "5000 sq.ft",
      images: [
        "https://r1imghtlak.mmtcdn.com/69c87b76-52ed-471a-ac71-5e7d96ce0fd7.jpg"
      ]
    },
    {
      id: 2,
      name: "Panch Ratna",
      capacity: "40 Guests",
      description: "Ideal for business meetings, conferences, and corporate gatherings with premium amenities",
      features: ["Projector & Screen", "Whiteboard", "Video Conferencing", "WiFi", "Catering", "Presentation Tools", "Comfort Seating", "Acoustic Design"],
      price: "Starting at ₹1,000",
      size: "800 sq.ft",
      images: [
        "https://i.postimg.cc/4xfGMwwv/IMG_0688.jpg"
      ]
    },
    {
      id: 3,
      name: "SkyYard",
      capacity: "200 Guests",
      description: "Outdoor venue surrounded by beautiful landscaped gardens, perfect for weddings and celebrations",
      features: ["Open Air Setting", "Landscape Lighting", "Premium Sound System", "Bar Setup", "Garden Decor", "Weather Protection", "Dance Area", "Photo Spots"],
      price: "Starting at ₹1,000",
      size: "3000 sq.ft",
      images: [
        "https://i.postimg.cc/wMpZNTGk/IMG_0723.jpg"
      ]
    },
    {
      id: 4,
      name: "Poolside Terrace",
      capacity: "150 Guests",
      description: "Elegant outdoor space by the infinity pool for sophisticated parties and events",
      features: ["Pool View", "Lounge Seating", "Premium Bar", "Ambient Lighting", "Sound System", "Catering Setup", "Fire Pit", "LED Decor"],
      price: "Starting at ₹1,000",
      size: "2500 sq.ft",
      images: [
        "https://i.postimg.cc/Y9WBgP2V/IMG_0701.jpg"
      ]
    }
  ];

  // Use hardcoded hero image
  const heroImage = "https://i.postimg.cc/1RDZ3bj3/IMG_0707.jpg";

  // Filter images for general venue gallery
  const venueImages = images
    .filter(img => img.length >= 2)
    .map(img => ({
      id: img[0],
      url: img[1],
      title: img[2] || "Venue Image",
      category: img[3] || "general"
    }));

  // Fallback gallery images with varied aspect ratios for collage effect
  const fallbackGalleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Grand Ballroom",
      aspectRatio: "portrait" // Tall image
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Outdoor Garden",
      aspectRatio: "landscape" // Wide image
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Conference Room",
      aspectRatio: "portrait"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Poolside Area",
      aspectRatio: "square" // Square image
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Wedding Setup",
      aspectRatio: "landscape"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Corporate Event",
      aspectRatio: "portrait"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Banquet Hall",
      aspectRatio: "landscape"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Pool View",
      aspectRatio: "portrait"
    }
  ];

  // Add aspect ratios to dynamic images or use fallback
  const displayGalleryImages = venueImages.length > 0 
    ? venueImages.map((img, index) => ({
        ...img,
        aspectRatio: ["portrait", "portrait", "square", "square", "portrait", "portrait", "square", "square", "portrait", "square"][index % 8]
      }))
    : fallbackGalleryImages;

  const handleVenueEnquiry = (venue) => {
    if (venue) {
      sessionStorage.setItem('enquiryVenue', JSON.stringify({
        name: venue.name,
        type: 'Venue Enquiry'
      }));
    }
    navigate('/contact');
  };

  // Handle key press for closing modals
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedVenue(null);
        setSelectedImage(null);
      }
    };

    const handleArrowKeys = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight') {
        const currentIndex = displayGalleryImages.findIndex(img => img.url === selectedImage.url);
        const nextIndex = (currentIndex + 1) % displayGalleryImages.length;
        setSelectedImage(displayGalleryImages[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = displayGalleryImages.findIndex(img => img.url === selectedImage.url);
        const prevIndex = currentIndex === 0 ? displayGalleryImages.length - 1 : currentIndex - 1;
        setSelectedImage(displayGalleryImages[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('keydown', handleArrowKeys);
    
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('keydown', handleArrowKeys);
    };
  }, [selectedImage, displayGalleryImages]);

  return (
    <div className="evaani-venue-page">
      {/* Hero Section */}
      <section className="venue-hero-section">
        <div className="hero-section-content">
          <h1 className="venue-main-title">Venue & Events</h1>
          <p className="venue-hero-subtitle">Perfect spaces for your unforgettable moments</p>
          <p className="venue-hero-description">
            At Evaani Hotel, we transform your events into extraordinary experiences with 
            elegant venues, premium amenities, and impeccable service.
          </p>
          <button className="venue-hero-button" onClick={() => document.querySelector('.venue-spaces-container').scrollIntoView({ behavior: 'smooth' })}>
            Explore Venues ↓
          </button>
        </div>
        <div className="venue-hero-background">
          <div className="hero-image-overlay"></div>
          <img src={heroImage} alt="Venue Hero" className="hero-section-image" />
        </div>
      </section>

      {/* Venue Cards */}
      <section className="venue-spaces-container">
        <div className="venue-section-header">
          <h2>Our Premium Venues</h2>
          <p>Each space is designed to create lasting memories</p>
        </div>

        <div className="venue-spaces-grid">
          {venueSpaces.map((venue) => (
            <div key={venue.id} className="venue-space-card">
              <div className="venue-card-image-container">
                <img src={venue.images[0]} alt={venue.name} />
                <div className="venue-card-overlay-section">
                  <span className="venue-space-price">{venue.price}</span>
                  <span className="venue-space-size">{venue.size}</span>
                </div>
              </div>
              
              <div className="venue-card-content-section">
                <div className="venue-card-header-section">
                  <h3>{venue.name}</h3>
                  <span className="venue-capacity-display">👥 {venue.capacity}</span>
                </div>
                
                <p className="venue-card-description">{venue.description}</p>
                
                <div className="venue-features-section">
                  <h4>Key Features</h4>
                  <div className="features-list-grid">
                    {venue.features.map((feature, idx) => (
                      <div key={idx} className="feature-list-item">
                        <span className="feature-item-icon">✓</span>
                        <span className="feature-item-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="venue-card-action-buttons">
                  <button 
                    className="venue-view-details-button"
                    onClick={() => setSelectedVenue(venue)}
                  >
                    View Details
                  </button>
                  <button 
                    className="venue-enquire-button"
                    onClick={() => handleVenueEnquiry(venue)}
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Venue Gallery Section - Collage Style */}
      <section className="venue-gallery-container">
        <div className="venue-section-header">
          <h2>Venue Gallery</h2>
          <p>Explore our beautiful spaces through real moments</p>
        </div>

        <div className="collage-gallery-grid">
          {displayGalleryImages.map((img, index) => (
            <div 
              key={img.id || index} 
              className={`collage-item collage-${img.aspectRatio} ${index % 4 === 0 ? 'featured' : ''}`}
              onClick={() => setSelectedImage(img)}
            >
              <div className="collage-image-wrapper">
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="collage-image"
                />
                <div className="collage-overlay">
                  <div className="collage-overlay-content">
                    <h3 className="collage-image-title">{img.title}</h3>
                    <span className="collage-view-text">Click to view</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Process */}
      <section className="booking-process-section">
        <div className="venue-section-header">
          <h2>Simple Booking Process</h2>
          <p>Four easy steps to secure your perfect venue</p>
        </div>

        <div className="booking-process-timeline">
          <div className="booking-process-step">
            <div className="step-number-icon">1️⃣</div>
            <div className="step-content-wrapper">
              <h3>Consultation</h3>
              <p>Share your event vision and requirements</p>
            </div>
          </div>
          
          <div className="booking-process-step">
            <div className="step-number-icon">2️⃣</div>
            <div className="step-content-wrapper">
              <h3>Venue Selection</h3>
              <p>Choose the perfect space for your event</p>
            </div>
          </div>
          
          <div className="booking-process-step">
            <div className="step-number-icon">3️⃣</div>
            <div className="step-content-wrapper">
              <h3>Customization</h3>
              <p>Personalize every detail of your event</p>
            </div>
          </div>
          
          <div className="booking-process-step">
            <div className="step-number-icon">4️⃣</div>
            <div className="step-content-wrapper">
              <h3>Confirmation</h3>
              <p>Secure your date and finalize arrangements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div className="fullscreen-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="fullscreen-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="fullscreen-close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            
            <div className="fullscreen-image-container">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="fullscreen-image"
              />
              <div className="fullscreen-image-info">
                <h3>{selectedImage.title}</h3>
                <div className="image-navigation">
                  <button 
                    className="nav-btn prev-btn"
                    onClick={() => {
                      const currentIndex = displayGalleryImages.findIndex(img => img.url === selectedImage.url);
                      const prevIndex = currentIndex === 0 ? displayGalleryImages.length - 1 : currentIndex - 1;
                      setSelectedImage(displayGalleryImages[prevIndex]);
                    }}
                  >
                    ‹
                  </button>
                  <span className="image-counter">
                    {displayGalleryImages.findIndex(img => img.url === selectedImage.url) + 1} / {displayGalleryImages.length}
                  </span>
                  <button 
                    className="nav-btn next-btn"
                    onClick={() => {
                      const currentIndex = displayGalleryImages.findIndex(img => img.url === selectedImage.url);
                      const nextIndex = (currentIndex + 1) % displayGalleryImages.length;
                      setSelectedImage(displayGalleryImages[nextIndex]);
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
            
            <div className="thumbnail-strip">
              {displayGalleryImages.map((img, index) => (
                <div 
                >
                  <img src={img.url} alt={img.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Venue Detail Modal */}
      {selectedVenue && (
        <div className="modal-background-overlay" onClick={() => setSelectedVenue(null)}>
          <div className="venue-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-button"
              onClick={() => setSelectedVenue(null)}
            >
              ✕
            </button>
            
            <div className="venue-detail-modal-header">
              <h2>{selectedVenue.name}</h2>
              <div className="venue-stats-container">
                <span className="venue-stat-item">👥 {selectedVenue.capacity}</span>
                <span className="venue-stat-item">📏 {selectedVenue.size}</span>
                <span className="venue-stat-item price-stat">💰 {selectedVenue.price}</span>
              </div>
            </div>
            
            <div className="venue-detail-modal-content">
              <div className="venue-detail-gallery-section">
                <img src={selectedVenue.images[0]} alt={selectedVenue.name} />
              </div>
              
              <div className="venue-detail-info-section">
                <h3>Description</h3>
                <p>{selectedVenue.description}</p>
                
                <h3>Features & Amenities</h3>
                <div className="detail-features-list">
                  {selectedVenue.features.map((feature, idx) => (
                    <div key={idx} className="detail-feature-item">
                      <span className="feature-checkmark">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="venue-detail-action-buttons">
                  <button 
                    className="detail-enquire-button"
                    onClick={() => {
                      setSelectedVenue(null);
                      handleVenueEnquiry(selectedVenue);
                    }}
                  >
                    Enquire Now
                  </button>
                  <button 
                    className="close-detail-button"
                    onClick={() => setSelectedVenue(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}