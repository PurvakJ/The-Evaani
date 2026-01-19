import { useNavigate } from "react-router-dom";
import { useData, useCarousel } from "../App";
import OfferPopup from "../components/OfferPopup";
import "../styles/Home.css";


export default function Home() {
  const navigate = useNavigate();
  const { 
    images = [], 
    reviews = [], 
    activeOffers = [],
    rooms = [],
    imagesByRoomId = {},
    loading 
  } = useData();
  
  // Use shared carousel state
  const { currentSlide, heroImages } = useCarousel();

  // Luxury Hotel Features
  const luxuryFeatures = [
    {
      title: "Premium Accommodation",
      description: "Elegant suites with panoramic city views",
      icon: "🏨",
      stat: "50+ Rooms"
    },
    {
      title: "Gourmet Dining",
      description: "Multi-cuisine restaurant & 24/7 room service",
      icon: "🍽️",
      stat: "3 Restaurants"
    },
    {
      title: "Wellness Oasis",
      description: "Spa, fitness center & infinity pool",
      icon: "💆",
      stat: "Full Service"
    },
    {
      title: "Event Excellence",
      description: "Perfect venues for weddings & corporate events",
      icon: "🎉",
      stat: "5 Venues"
    }
  ];

  // Get rooms from backend instead of static data
  const getPremiumRoomsFromBackend = () => {
    if (!rooms || rooms.length === 0) {
      // Fallback static rooms if backend data is not available
      return [
        {
          name: "Deluxe Suite",
          description: "Spacious suite with king-size bed and private balcony overlooking the city",
          image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
          amenities: ["Free WiFi", "Minibar", "AC", "Smart TV", "Coffee Maker"]
        },
        {
          name: "Executive Room",
          description: "Modern room with work desk and luxury amenities for business travelers",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80",
          amenities: ["City View", "Room Service", "Work Desk", "Safe", "Bathrobe"]
        },
        {
          name: "Presidential Suite",
          description: "Ultimate luxury suite with separate living area and private jacuzzi",
          image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          amenities: ["Butler Service", "Jacuzzi", "Private Terrace", "Bar", "Dining Area"]
        }
      ];
    }

    // Get first 3 rooms from backend data
    return rooms.slice(0, 3).map(room => {
      const roomId = room[0];
      const images = imagesByRoomId[roomId] || [];
      
      return {
        id: roomId,
        name: room[1] || "Room",
        description: room[2] || "Luxurious accommodation",
        image: images[0] || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        price: room[3] || "Starting from ₹9999",
        amenities: ["Free WiFi", "Air Conditioning", "Room Service", "Smart TV"]
      };
    });
  };

  // Get rooms data
  const premiumRooms = getPremiumRoomsFromBackend();

  // Get 4 most recent gallery images from backend
  const galleryPictures = images.length > 0 
    ? images
        .sort((a, b) => (b[0] || b.id) - (a[0] || a.id))
        .slice(0, 3)
        .map(img => ({
          url: img[1] || img.imageurl,
          title: img[2] || "Hotel Gallery"
        }))
    : [];

  // Static fallback gallery images
  const backupGallery = [
    {
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      title: "Lobby Area"
    },
    {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
      title: "Infinity Pool"
    },
    {
      url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Dining Hall"
    },
    {
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80",
      title: "Spa Center"
    }
  ];

  // Use dynamic reviews if available, otherwise static
  const guestTestimonials = reviews.length > 0 
    ? reviews.slice(0, 3).map(review => ({
        guestName: review[1] || "Guest",
        rating: parseInt(review[3]) || 5,
        feedback: review[4] || "Exceptional experience!",
        visitDate: review[5] || "Recently"
      }))
    : [
        {
          guestName: "Rajesh Kumar",
          rating: 5,
          feedback: "Outstanding service and luxurious accommodations. The staff exceeded our expectations.",
          visitDate: "15 Dec 2023"
        },
        {
          guestName: "Priya Sharma",
          rating: 4,
          feedback: "Breathtaking property with stunning views. The spa experience was truly rejuvenating.",
          visitDate: "22 Nov 2023"
        },
        {
          guestName: "Amit Patel",
          rating: 5,
          feedback: "Perfect for business stays. Premium amenities and exceptional location.",
          visitDate: "10 Jan 2024"
        }
      ];

  // Loading state
  if (loading) {
    return (
      <div className="luxury-home">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading luxury experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-home">
      {/* Special Offers Popup */}
      <OfferPopup />

      {/* Hero Section with Carousel */}
      <section className="luxury-hero">
        <div className="hero-carousel">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-image ${index === currentSlide ? 'active-slide' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        
        <div className="hero-main-content">
          <h1 className="hero-main-title">Evaani Luxury Hotel</h1>
          <p className="hero-subheading">Experience Unparalleled Elegance & Comfort</p>
          <button className="hero-primary-btn" onClick={() => navigate('/contact')}>
            Reserve Your Stay
          </button>
        </div>
      </section>

      {/* Luxury Features Section */}
      <section className="luxury-features">
        <div className="content-wrapper">
          <h2 className="section-main-title">Why Evaani Stands Out</h2>
          <p className="section-description">Premium hospitality redefined in the city's heart</p>
          
          <div className="features-display">
            {luxuryFeatures.map((feature, index) => (
              <div key={index} className="feature-box">
                <div className="feature-symbol">{feature.icon}</div>
                <h3 className="feature-heading">{feature.title}</h3>
                <p className="feature-detail">{feature.description}</p>
                <span className="feature-stat">{feature.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Suites Section - Now using backend data */}
      <section className="premium-suites">
        <div className="content-wrapper">
          <h2 className="section-main-title">Signature Suites & Rooms</h2>
          <p className="section-description">Experience luxury in every meticulously crafted detail</p>
          
          <div className="suites-grid">
            {premiumRooms.map((room, index) => (
              <div key={index} className="suite-card">
                <div className="suite-image-frame">
                  <img src={room.image} alt={room.name} className="suite-photo" />
                  <div className="image-overlay"></div>
                </div>
                <div className="suite-details">
                  <h3 className="suite-name">{room.name}</h3>
                  <p className="suite-description">{room.description}</p>
                  <div className="amenities-list">
                    {room.amenities.map((amenity, idx) => (
                      <span key={idx} className="amenity-item">✓ {amenity}</span>
                    ))}
                  </div>
                  <button className="suite-action-btn" onClick={() => navigate('/rooms')}>
                    Discover More
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="view-all-container">
            <button className="view-all-suites" onClick={() => navigate('/rooms')}>
              Explore All Accommodations
            </button>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      {activeOffers.length > 0 && (
        <section className="exclusive-offers">
          <div className="content-wrapper">
            <h2 className="section-main-title">Exclusive Offers</h2>
            <p className="section-description">Special privileges for our esteemed guests</p>
            
            <div className="offers-display">
              {activeOffers.slice(0, 3).map((offer, index) => (
                <div key={index} className="offer-card">
                  <div className="offer-tag">Limited Period</div>
                  <h3 className="offer-title">{offer[1]}</h3>
                  <p className="offer-detail">{offer[2]}</p>
                  <button className="offer-action-btn" onClick={() => navigate('/contact')}>
                    Book Offer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      <section className="hotel-gallery">
        <div className="content-wrapper">
          <h2 className="section-main-title">Our Visual Journey</h2>
          <p className="section-description">
            {galleryPictures.length > 0 
              ? "Recently Added Visuals" 
              : "Experience the elegance of Evaani"
            }
          </p>
          
          <div className="gallery-grid">
            {(galleryPictures.length > 0 ? galleryPictures : backupGallery).map((item, index) => (
              <div key={index} className="gallery-frame">
                <div className="gallery-image-container">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="gallery-img"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <h4 className="image-title">{item.title}</h4>
                  </div>
                </div>
                {galleryPictures.length > 0 && index === 0 && (
                  <div className="new-label">New</div>
                )}
              </div>
            ))}
          </div>
          
          <div className="view-all-container">
            <button className="full-gallery-btn" onClick={() => navigate('/venue')}>
              View Complete Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="guest-testimonials">
        <div className="content-wrapper">
          <h2 className="section-main-title">Guest Experiences</h2>
          <p className="section-description">Stories from our valued guests</p>
          
          <div className="testimonials-display">
            {guestTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-box">
                <div className="rating-stars">
                  {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
                </div>
                <p className="feedback-text">"{testimonial.feedback}"</p>
                <div className="guest-info">
                  <strong className="guest-name">{testimonial.guestName}</strong>
                  <span className="visit-date">{testimonial.visitDate}</span>
                </div>
              </div>
            ))}
          </div>
          
          {reviews.length === 0 && (
            <p className="testimonial-note">Based on recent guest experiences</p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="reservation-cta">
        <div className="content-wrapper">
          <h2 className="cta-heading">Ready for an Unforgettable Stay?</h2>
          <p className="cta-message">Secure your reservation today for a world-class luxury experience</p>
          <div className="cta-buttons-group">
            <button className="primary-cta-btn" onClick={() => navigate('/contact')}>
              Book Now
            </button>
            <button className="secondary-cta-btn" onClick={() => navigate('/rooms')}>
              View Suites
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}