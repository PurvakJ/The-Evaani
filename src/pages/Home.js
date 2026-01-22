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
      stat: "4 Restaurants"
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

  // Static room data for fallback
  const staticRooms = [
    {
      id: 1,
      name: "Super Deluxe Suite",
      description: "Spacious suite with king-size bed and private balcony overlooking the city",
      image: "https://i.postimg.cc/L6TKzLRq/IMG_0716.jpg",
      price: "Starting from ₹2500",
      amenities: ["Free WiFi", "Minibar", "AC", "Smart TV", "Coffee Maker"]
    },
    {
      id: 2,
      name: "Executive Room",
      description: "Modern room with work desk and luxury amenities for business travelers",
      image: "https://i.postimg.cc/J7jWzS2t/IMG_0709.jpg",
      price: "Starting from ₹3500",
      amenities: ["City View", "Room Service", "Work Desk", "Safe", "Bathrobe"]
    },
  ];

  // Static gallery data for fallback
  const backupGallery = [
    {
      url: "https://i.postimg.cc/hG3KVxL4/IMG_0672.jpg",
      title: "Luxury Lobby"
    },
    {
      url: "https://r1imghtlak.mmtcdn.com/4a335459-c0bc-40f1-82ea-0c03324bc145.jpg?downsize=810:*",
      title: "Party Hall"
    },
    {
      url: "https://i.postimg.cc/B6DRt1MS/IMG_0720.jpg",
      title: "Fine Dining"
    }
  ];

  // Static reviews data for fallback
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

  // Get rooms data with fallback to static data
  const getPremiumRooms = () => {
    // If rooms data is still loading, show static data
    if (loading) {
      return staticRooms;
    }

    // If rooms data is loaded but empty, show static data
    if (!rooms || rooms.length === 0) {
      return staticRooms;
    }

    // Use backend rooms data
    try {
      return rooms.slice(0, 3).map(room => {
        const roomId = room[0];
        const roomImages = imagesByRoomId[roomId] || [];
        
        return {
          id: roomId,
          name: room[1] || "Room",
          description: room[2] || "Luxurious accommodation",
          image: roomImages[0] || staticRooms[0].image, // Fallback to static image
          price: room[3] || "Starting from ₹9999",
          amenities: ["Free WiFi", "Air Conditioning", "Room Service", "Smart TV"]
        };
      });
    } catch (error) {
      console.error("Error processing rooms data:", error);
      return staticRooms;
    }
  };

  // Get gallery pictures with fallback
  const getGalleryPictures = () => {
    // If data is still loading, show static data
    if (loading) {
      return backupGallery;
    }

    // If images data is loaded but empty, show static data
    if (!images || images.length === 0) {
      return backupGallery;
    }

    // Use backend images data
    try {
      return images
        .sort((a, b) => (b[0] || b.id) - (a[0] || a.id))
        .slice(0, 3)
        .map(img => ({
          url: img[1] || img.imageurl || backupGallery[0].url,
          title: img[2] || "Hotel Gallery"
        }));
    } catch (error) {
      console.error("Error processing gallery data:", error);
      return backupGallery;
    }
  };

  // Get testimonials with fallback
  const getGuestTestimonials = () => {
    // If data is still loading, show static data
    if (loading) {
      return staticReviews;
    }

    // If reviews data is loaded but empty, show static data
    if (!reviews || reviews.length === 0) {
      return staticReviews;
    }

    // Use backend reviews data
    try {
      return reviews.slice(0, 3).map(review => ({
        guestName: review[1] || "Guest",
        rating: parseInt(review[3]) || 5,
        feedback: review[4] || "Exceptional experience!",
        visitDate: review[5] || "Recently"
      }));
    } catch (error) {
      console.error("Error processing reviews data:", error);
      return staticReviews;
    }
  };

  // Get data with fallback
  const premiumRooms = getPremiumRooms();
  const galleryPictures = getGalleryPictures();
  const guestTestimonials = getGuestTestimonials();

  // Loading state - only show if there's an actual loading state from backend
  if (loading && rooms.length === 0 && images.length === 0) {
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

      {/* Featured Suites Section */}
      <section className="premium-suites">
        <div className="content-wrapper">
          <h2 className="section-main-title">Signature Suites & Rooms</h2>
          <p className="section-description">
            {rooms.length > 0 
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
                      // If image fails to load, use fallback image
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
              {rooms.length > 0 ? "Explore All Accommodations" : "View All Rooms"}
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
            {images.length > 0 ? "Recently Added Visuals" : "Experience the elegance of Evaani"}
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
                      // If image fails to load, use fallback image
                      e.target.src = backupGallery[index % backupGallery.length].url;
                    }}
                  />
                  <div className="gallery-overlay">
                    <h4 className="image-title">{item.title}</h4>
                  </div>
                </div>
                {images.length > 0 && index === 0 && (
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
            {reviews.length > 0 ? "Stories from our valued guests" : "What our guests say"}
          </p>
          
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