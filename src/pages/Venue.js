import { useState } from "react";
import { useData } from "../App";
import "../styles/Venue.css";

export default function Venue() {
  const { images = [] } = useData();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryFormData, setEnquiryFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guests: "",
    message: ""
  });

  // Filter images for venue gallery
  const venueImages = images
    .filter(img => img.length >= 2) // Ensure at least [id, url] exists
    .map(img => ({
      id: img[0],
      url: img[1],
      title: img[2] || "Venue Image",
      category: img[3] || "general"
    }));

  const venueSpaces = [
    {
      id: 1,
      name: "Grand Ballroom",
      capacity: "500 Guests",
      description: "Perfect for weddings, corporate events, and large celebrations with elegant decor and state-of-the-art facilities",
      features: ["Stage & Podium", "Dance Floor", "AV Equipment", "Catering Kitchen", "Lighting System", "Sound System", "VIP Lounge", "Bridal Suite"],
      price: "Starting at ₹2,00,000",
      size: "5000 sq.ft",
      images: venueImages.filter(img => img.title.toLowerCase().includes("ballroom"))
    },
    {
      id: 2,
      name: "Executive Boardroom",
      capacity: "40 Guests",
      description: "Ideal for business meetings, conferences, and corporate gatherings with premium amenities",
      features: ["Projector & Screen", "Whiteboard", "Video Conferencing", "WiFi", "Catering", "Presentation Tools", "Comfort Seating", "Acoustic Design"],
      price: "Starting at ₹50,000",
      size: "800 sq.ft",
      images: venueImages.filter(img => img.title.toLowerCase().includes("boardroom"))
    },
    {
      id: 3,
      name: "Garden Pavilion",
      capacity: "200 Guests",
      description: "Outdoor venue surrounded by beautiful landscaped gardens, perfect for weddings and celebrations",
      features: ["Open Air Setting", "Landscape Lighting", "Premium Sound System", "Bar Setup", "Garden Decor", "Weather Protection", "Dance Area", "Photo Spots"],
      price: "Starting at ₹1,50,000",
      size: "3000 sq.ft",
      images: venueImages.filter(img => img.title.toLowerCase().includes("garden"))
    },
    {
      id: 4,
      name: "Poolside Terrace",
      capacity: "150 Guests",
      description: "Elegant outdoor space by the infinity pool for sophisticated parties and events",
      features: ["Pool View", "Lounge Seating", "Premium Bar", "Ambient Lighting", "Sound System", "Catering Setup", "Fire Pit", "LED Decor"],
      price: "Starting at ₹1,20,000",
      size: "2500 sq.ft",
      images: venueImages.filter(img => img.title.toLowerCase().includes("pool"))
    }
  ];

  const handleVenueEnquiry = (venue) => {
    setSelectedVenue(venue);
    setShowEnquiryForm(true);
  };

  const handleSubmitEnquiry = async () => {
    if (!enquiryFormData.name || !enquiryFormData.email || !enquiryFormData.phone || !enquiryFormData.eventDate) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      alert("Thank you for your enquiry! We'll contact you soon.");
      setShowEnquiryForm(false);
      setEnquiryFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        guests: "",
        message: ""
      });
    } catch (error) {
      alert("Failed to submit enquiry. Please try again.");
    }
  };

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
          {venueImages[0] && (
            <img src={venueImages[0].url} alt="Venue Hero" className="hero-section-image" />
          )}
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
                {venue.images.length > 0 ? (
                  <img src={venue.images[0].url} alt={venue.name} />
                ) : (
                  <div className="venue-image-placeholder">
                    <span className="placeholder-icon">🏨</span>
                  </div>
                )}
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

      {/* Venue Gallery Section */}
      <section className="venue-gallery-container">
        <div className="venue-section-header">
          <h2>Venue Gallery</h2>
          <p>Explore our beautiful spaces through real moments</p>
        </div>

        {venueImages.length > 0 ? (
          <div className="gallery-images-grid">
            {venueImages.map((img, index) => (
              <div key={img.id || index} className="gallery-image-item">
                <div className="gallery-image-wrapper">
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    className="gallery-display-image"
                  />
                  <div className="image-hover-overlay">
                    <div className="overlay-content-section">
                      <h3 className="gallery-image-title">{img.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-gallery-message">
            <div className="empty-gallery-icon">🏨</div>
            <p>No venue images available yet</p>
            <p className="empty-gallery-subtitle">Check back soon for updates</p>
          </div>
        )}
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

      {/* Venue Detail Modal */}
      {selectedVenue && !showEnquiryForm && (
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
                {selectedVenue.images.length > 0 ? (
                  <img src={selectedVenue.images[0].url} alt={selectedVenue.name} />
                ) : (
                  <div className="detail-image-placeholder">
                    <span className="placeholder-icon">🏨</span>
                    <p>No images available</p>
                  </div>
                )}
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