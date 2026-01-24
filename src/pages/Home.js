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
      stat: "18+ Rooms"
    },
    {
      title: "Gourmet Dining",
      description: "Multi-cuisine restaurant & 24/7 room service",
      icon: "🍽️",
      stat: "3 Restaurants"
    },
    {
      title: "Wellness Oasis",
      description: "24/7 front desk, pool",
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

  // STATIC DATA - Always available immediately
  const staticRooms = [
    {
      id: 1,
      name: "Deluxe Suite",
      description: "Spacious suite with king-size bed and private balcony overlooking the city",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      price: "Starting from ₹9999",
      amenities: ["Free WiFi", "Minibar", "AC", "Smart TV", "Coffee Maker"]
    },
    {
      id: 2,
      name: "Executive Room",
      description: "Modern room with work desk and luxury amenities for business travelers",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80",
      price: "Starting from ₹8999",
      amenities: ["City View", "Room Service", "Work Desk", "Safe", "Bathrobe"]
    }
  ];

  // Static gallery data
  const staticGallery = [
    {
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      title: "Luxury Lobby",
      isNew: false
    },
    {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
      title: "Infinity Pool",
      isNew: false
    },
    {
      url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Fine Dining",
      isNew: false
    }
  ];

  // Static reviews data
  const staticReviews = [
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

  // Static offers data
  const staticOffers = [
    {
      title: "Weekend Getaway",
      description: "Enjoy 20% off on weekend stays with complimentary breakfast",
      isActive: true
    },
    {
      title: "Honeymoon Package",
      description: "Romantic suite with candlelight dinner and spa couples massage",
      isActive: true
    },
    {
      title: "Advance Booking",
      description: "Book 30 days in advance and get 15% discount on all suites",
      isActive: true
    }
  ];

  // Determine which data to show (always start with static, then update with dynamic if available)
  const premiumRooms = rooms.length > 0 ? 
    rooms.slice(0, 3).map(room => {
      const roomId = room[0];
      const roomImages = imagesByRoomId[roomId] || [];
      
      return {
        id: roomId,
        name: room[1] || "Room",
        description: room[2] || "Luxurious accommodation",
        image: roomImages[0] || staticRooms[0].image,
        price: room[3] || "Starting from ₹9999",
        amenities: ["Free WiFi", "Air Conditioning", "Room Service", "Smart TV"],
        isDynamic: true
      };
    }) : staticRooms.map(room => ({ ...room, isDynamic: false }));

  // Get gallery pictures
  const galleryPictures = images.length > 0 ? 
    images
      .sort((a, b) => (b[0] || b.id) - (a[0] || a.id))
      .slice(0, 3)
      .map((img, index) => ({
        url: img[1] || img.imageurl || staticGallery[0].url,
        title: img[2] || "Hotel Gallery",
        isNew: index === 0,
        isDynamic: true
      })) : 
    staticGallery.map(item => ({ ...item, isDynamic: false }));

  // Get testimonials
  const guestTestimonials = reviews.length > 0 ? 
    reviews.slice(0, 3).map(review => ({
      guestName: review[1] || "Guest",
      rating: parseInt(review[3]) || 5,
      feedback: review[4] || "Exceptional experience!",
      visitDate: review[5] || "Recently",
      isDynamic: true
    })) : 
    staticReviews.map(review => ({ ...review, isDynamic: false }));

  // Get offers
  const displayOffers = activeOffers.length > 0 ? 
    activeOffers.slice(0, 3).map(offer => ({
      title: offer[1],
      description: offer[2],
      isActive: offer[3] === "active",
      isDynamic: true
    })) : 
    staticOffers.map(offer => ({ ...offer, isDynamic: false }));

  // Check if we have dynamic data loaded
  const hasDynamicData = rooms.length > 0 || images.length > 0 || reviews.length > 0 || activeOffers.length > 0;

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

      {/* Featured Suites Section */}
      <section className="premium-suites">
        <div className="content-wrapper">
          <h2 className="section-main-title">Signature Suites & Rooms</h2>
          <p className="section-description">
            {hasDynamicData 
              ? "Experience luxury in every meticulously crafted detail" 
              : "Explore our premium accommodations"}
          </p>
          
          <div className="suites-grid">
            {premiumRooms.map((room, index) => (
              <div key={index} className="suite-card">
                <div className="suite-image-frame">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="suite-photo"
                    onError={(e) => {
                      e.target.src = staticRooms[index % staticRooms.length].image;
                    }}
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="suite-details">
                  <h3 className="suite-name">{room.name}</h3>
                  <p className="suite-description">{room.description}</p>
                  <div className="amenities-list">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
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
      <section className="exclusive-offers">
        <div className="content-wrapper">
          <h2 className="section-main-title">Exclusive Offers</h2>
          <p className="section-description">
            {displayOffers.some(o => o.isDynamic) 
              ? "Special privileges for our esteemed guests" 
              : "Current promotions available"}
          </p>
          
          <div className="offers-display">
            {displayOffers.map((offer, index) => (
              <div key={index} className="offer-card">
                {offer.isDynamic && (
                  <div className="live-data-badge">Live Offer</div>
                )}
                <div className="offer-tag">Limited Period</div>
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-detail">{offer.description}</p>
                <button className="offer-action-btn" onClick={() => navigate('/contact')}>
                  Book Offer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="hotel-gallery">
        <div className="content-wrapper">
          <h2 className="section-main-title">Our Visual Journey</h2>
          <p className="section-description">
            {galleryPictures.some(g => g.isDynamic) 
              ? "Recently Added Visuals" 
              : "Experience the elegance of Evaani"}
          </p>
          
          <div className="gallery-grid">
            {galleryPictures.map((item, index) => (
              <div key={index} className="gallery-frame">
                <div className="gallery-image-container">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="gallery-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = staticGallery[index % staticGallery.length].url;
                    }}
                  />
                  <div className="gallery-overlay">
                    <h4 className="image-title">{item.title}</h4>
                  </div>
                </div>
                {item.isNew && (
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
          <p className="section-description">
            {guestTestimonials.some(t => t.isDynamic) 
              ? "Stories from our valued guests" 
              : "What our guests say"}
          </p>
          
          <div className="testimonials-display">
            {guestTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-box">
                {testimonial.isDynamic && (
                  <div className="live-data-badge">Recent</div>
                )}
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
          
          {!hasDynamicData && (
            <p className="testimonial-note">Based on recent guest experiences</p>
          )}
        </div>
      </section>

      {/* Data Loading Status */}
      {loading && (
        <div className="data-loading-status">
          <div className="loading-indicator">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
          <p className="loading-message">
            Loading latest data from server...
            {hasDynamicData && " Some content has been updated!"}
          </p>
        </div>
      )}

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