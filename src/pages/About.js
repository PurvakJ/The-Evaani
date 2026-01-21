import { useNavigate } from "react-router-dom";
import { useCarousel } from "../App";
import "../styles/About.css";
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet"></link>

export default function About() {
  const navigate = useNavigate();
  
  // Use shared carousel state (continues from where homepage left)
  const { currentSlide, heroImages } = useCarousel();

  const hotelStats = [
    {
      number: "20+",
      label: "Years of Excellence",
      description: "A decade of providing luxury hospitality"
    },
    {
      number: "500+",
      label: "Happy Guests",
      description: "Satisfied customers and counting"
    },
    {
      number: "18",
      label: "Luxury Rooms",
      description: "Elegant accommodations"
    },
    {
      number: "30+",
      label: "Team Members",
      description: "Dedicated hospitality professionals"
    }
  ];

  const teamMembers = [
    {
      name: "Sh. Sudarshan singla",
      role: "Founder Of The Evaani",
      description: "20+ Years Of Hospitality Experience",
      image: "https://i.postimg.cc/gjvBsFZn/Whats_App_Image_2026_01_21_at_13_11_19.jpg"
    },
    {
      name: "Adv. Ashu Jain",
      role: "Founder Of The Evaani",
      description: "Great Hospitality And Maintain The Luxury And Hospitality Of the Hotel",
      image: "https://i.postimg.cc/KYPkm0Bf/Whats-App-Image-2026-01-21-at-13-09-17.jpg"
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section with Carousel - FULL SCREEN */}
      <section className="about-hero">
        <div className="about-hero-carousel">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`about-carousel-slide ${index === currentSlide ? 'about-active-slide' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Evaani Hotel</h1>
          <p className="about-hero-subtitle">Where Luxury Meets Hospitality</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story-section">
        <div className="about-content-wrapper">
          <div className="about-story-content">
            <h2 className="about-section-title">Our Story</h2>
            <div className="about-story-text">
              <p>
                Welcome to <strong>Evaani Hotel</strong>, a sanctuary of luxury and comfort 
                nestled in the heart of the city. Since our establishment in 2024, we have 
                been committed to providing exceptional hospitality experiences that create 
                lasting memories for our guests.
              </p>
              <p>
                Our name <em>'Evaani'</em> symbolizes expression and voice – reflecting our 
                dedication to listening to our guests and creating personalized experiences 
                that speak to their needs. What started as a boutique hotel has grown into 
                a landmark of luxury, setting new standards in hospitality.
              </p>
              <p>
                Every corner of Evaani tells a story of craftsmanship, elegance, and 
                attention to detail. From our architecturally stunning lobby to our 
                meticulously designed rooms, we've created spaces that inspire and delight.
              </p>
            </div>
            
            <div className="about-stats-grid">
              {hotelStats.map((stat, index) => (
                <div key={index} className="about-stat-card">
                  <div className="about-stat-number">{stat.number}</div>
                  <div className="about-stat-label">{stat.label}</div>
                  <div className="about-stat-description">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-section">
        <div className="about-content-wrapper">
          <h2 className="about-section-title">Our Core Values</h2>
          <p className="about-section-subtitle">The principles that guide everything we do</p>
          
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">⭐</div>
              <h3 className="about-value-title">Excellence</h3>
              <p className="about-value-description">Committed to delivering exceptional service in every interaction, going above and beyond to exceed expectations.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">🏡</div>
              <h3 className="about-value-title">Comfort</h3>
              <p className="about-value-description">Creating spaces that feel like home, only better. Every detail is designed for your comfort and relaxation.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">🌿</div>
              <h3 className="about-value-title">Sustainability</h3>
              <p className="about-value-description">Eco-friendly practices without compromising luxury. We're committed to responsible tourism and environmental stewardship.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">🤝</div>
              <h3 className="about-value-title">Community</h3>
              <p className="about-value-description">Supporting local artisans and businesses. We believe in growing together with our community.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">💎</div>
              <h3 className="about-value-title">Authenticity</h3>
              <p className="about-value-description">Genuine hospitality with a personal touch. We value real connections and meaningful experiences.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">🎯</div>
              <h3 className="about-value-title">Innovation</h3>
              <p className="about-value-description">Constantly evolving to bring you the latest in luxury hospitality while preserving timeless traditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team-section">
        <div className="about-content-wrapper">
          <h2 className="about-section-title">Meet Our Leadership Team</h2>
          <p className="about-section-subtitle">The dedicated professionals behind Evaani's success</p>
          
          <div className="about-team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="about-team-card">
                <div className="about-team-image-container">
                  <img src={member.image} alt={member.name} className="about-team-image" />
                </div>
                <div className="about-team-info">
                  <h3 className="about-team-name">{member.name}</h3>
                  <p className="about-team-role">{member.role}</p>
                  <p className="about-team-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="about-team-quote">
            <p className="about-quote-text">
              "At Evaani, we believe that true luxury lies in the details. 
              Every smile, every thoughtful gesture, and every perfect moment 
              is crafted with care for our guests."
            </p>
            <p className="about-quote-author">— The Evaani Team</p>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="about-awards-section">
        <div className="about-content-wrapper">
          <h2 className="about-section-title">Recognition & Awards</h2>
          <p className="about-section-subtitle">Our commitment to excellence has been recognized globally</p>
          
          <div className="about-awards-grid">
            <div className="about-award-card">
              <div className="about-award-icon">🏆</div>
              <h3 className="about-award-title">Best Luxury Hotel 2025</h3>
              <p className="about-award-description">International Hotel Awards</p>
            </div>
            <div className="about-award-card">
              <div className="about-award-icon">⭐</div>
              <h3 className="about-award-title">5-Star Excellence</h3>
              <p className="about-award-description">Hospitality Star Ratings</p>
            </div>
            <div className="about-award-card">
              <div className="about-award-icon">🌿</div>
              <h3 className="about-award-title">Green Hotel Award</h3>
              <p className="about-award-description">Sustainable Tourism Council</p>
            </div>
            <div className="about-award-card">
              <div className="about-award-icon">👨‍🍳</div>
              <h3 className="about-award-title">Culinary Excellence</h3>
              <p className="about-award-description">Fine Dining Association</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta-section">
        <div className="about-content-wrapper">
          <h2 className="about-cta-title">Experience the Evaani Difference</h2>
          <p className="about-cta-subtitle">Join us for an unforgettable stay where every moment is crafted with care</p>
          <div className="about-cta-buttons">
            <button className="about-cta-primary" onClick={() => navigate('/contact')}>
              Book Your Stay
            </button>
            <button className="about-cta-secondary" onClick={() => navigate('/rooms')}>
              Explore Rooms
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}