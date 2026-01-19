import { useState } from "react";
import { api } from "../api/api";
import "../styles/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 5,
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("review"); // "review" or "contact"

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Review message is required";
    } else if (form.message.length < 10) {
      newErrors.message = "Please provide more detail (minimum 10 characters)";
    } else if (form.message.length > 500) {
      newErrors.message = "Review is too long (maximum 500 characters)";
    }
    
    return newErrors;
  };

  const submitReview = async () => {
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await api({
        action: "add",
        sheet: "reviews",
        row: [
          Date.now(),
          form.name,
          form.email,
          form.rating,
          form.message,
          new Date().toLocaleString()
        ]
      });
      
      setIsSubmitted(true);
      setErrors({});
      setTimeout(() => {
        setForm({ name: "", email: "", rating: 5, message: "" });
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingDescription = (rating) => {
    const descriptions = {
      1: "Poor - Not recommended",
      2: "Fair - Needs improvement",
      3: "Good - Met expectations",
      4: "Very Good - Exceeded expectations",
      5: "Excellent - Outstanding experience"
    };
    return descriptions[rating] || "";
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Our Location",
      details: ["Evaani Hotel, Luxury Street", "City Center, 560001", "Bangalore, India"],
      type: "location"
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+91 62840 86213", "+91 98765 43210", "Available 24/7"],
      type: "phone",
      links: [
        { text: "+91 62840 86213", href: "tel:+916284086213" },
        { text: "+91 98765 43210", href: "tel:+919876543210" }
      ]
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: ["reservations@evaanihotel.com", "info@evaanihotel.com", "Response within 24 hours"],
      type: "email",
      links: [
        { text: "reservations@evaanihotel.com", href: "mailto:reservations@evaanihotel.com" },
        { text: "info@evaanihotel.com", href: "mailto:info@evaanihotel.com" }
      ]
    },
    {
      icon: "🕒",
      title: "Reception Hours",
      details: ["24/7 Reception", "Check-in: 2:00 PM", "Check-out: 12:00 PM"],
      type: "hours"
    }
  ];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Connect With Us</h1>
          <div className="contact-hero-line"></div>
          <p className="contact-hero-subtitle">
            Share your experience or get in touch with our hospitality team
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="contact-tab-navigation">
        <button
          className={`contact-tab-btn ${activeTab === "review" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("review")}
        >
          <span className="tab-icon">✍️</span>
          <span className="tab-text">Write a Review</span>
        </button>
        <button
          className={`contact-tab-btn ${activeTab === "contact" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          <span className="tab-icon">📞</span>
          <span className="tab-text">Contact Info</span>
        </button>
      </div>

      {/* Main Content */}
      <section className="contact-main-section">
        <div className="contact-content-wrapper">
          
          {/* Review Form Section */}
          {activeTab === "review" && (
            <div className="contact-review-section">
              <div className="review-section-header">
                <h2 className="review-section-title">Share Your Experience</h2>
                <p className="review-section-subtitle">
                  Your feedback helps us deliver exceptional service to all our guests
                </p>
              </div>

              <div className="review-form-container">
                <div className="review-form-content">
                  {/* Name Field */}
                  <div className="contact-form-group">
                    <label className="contact-form-label required">Your Name</label>
                    <input
                      className={`contact-form-input ${errors.name ? 'contact-input-error' : ''}`}
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                    />
                    {errors.name && (
                      <div className="contact-error-message">
                        <span className="error-icon">⚠️</span>
                        {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="contact-form-group">
                    <label className="contact-form-label">Email Address</label>
                    <input
                      className={`contact-form-input ${errors.email ? 'contact-input-error' : ''}`}
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                    />
                    {errors.email && (
                      <div className="contact-error-message">
                        <span className="error-icon">⚠️</span>
                        {errors.email}
                      </div>
                    )}
                    <div className="contact-form-hint">
                      <span className="hint-icon">🔒</span>
                      We respect your privacy and will never share your email
                    </div>
                  </div>

                  {/* Rating Section */}
                  <div className="contact-form-group">
                    <div className="contact-rating-section">
                      <label className="contact-rating-label required">Your Rating</label>
                      <div className="contact-rating-stars">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            className={`contact-star-btn ${star <= form.rating ? 'contact-star-active' : 'contact-star-inactive'}`}
                            onClick={() => handleInputChange('rating', star)}
                            aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      <div className="contact-rating-scale">
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>
                      <div className="contact-rating-description">
                        {getRatingDescription(form.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="contact-form-group">
                    <label className="contact-form-label required">Your Review</label>
                    <textarea
                      className={`contact-form-textarea ${errors.message ? 'contact-input-error' : ''}`}
                      placeholder="Tell us about your stay at Evaani Hotel..."
                      rows="6"
                      value={form.message}
                      onChange={e => handleInputChange('message', e.target.value)}
                      maxLength="500"
                    />
                    {errors.message && (
                      <div className="contact-error-message">
                        <span className="error-icon">⚠️</span>
                        {errors.message}
                      </div>
                    )}
                    <div className="contact-char-counter">
                      <span className="char-count">{form.message.length}</span>
                      <span className="char-max">/ 500 characters</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className={`contact-submit-btn ${isSubmitting ? 'contact-btn-loading' : ''}`}
                    onClick={submitReview}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="submit-icon">📨</span>
                        Submit Review
                      </>
                    )}
                  </button>

                  {/* Success Message */}
                  {isSubmitted && (
                    <div className="contact-success-message">
                      <div className="success-content">
                        <span className="success-icon">🎉</span>
                        <div>
                          <h3 className="success-title">Thank You!</h3>
                          <p className="success-text">Your review has been submitted successfully.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Review Guidelines */}
                <div className="review-guidelines">
                  <h3 className="guidelines-title">Review Guidelines</h3>
                  <ul className="guidelines-list">
                    <li className="guideline-item">
                      <span className="guideline-icon">✅</span>
                      Be honest and specific about your experience
                    </li>
                    <li className="guideline-item">
                      <span className="guideline-icon">✅</span>
                      Focus on service, cleanliness, and amenities
                    </li>
                    <li className="guideline-item">
                      <span className="guideline-icon">✅</span>
                      Avoid personal information and inappropriate content
                    </li>
                    <li className="guideline-item">
                      <span className="guideline-icon">✅</span>
                      Share what you loved and where we can improve
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Contact Information Section */}
          {activeTab === "contact" && (
            <div className="contact-info-section">
              <div className="contact-info-header">
                <h2 className="contact-info-title">Get In Touch</h2>
                <p className="contact-info-subtitle">
                  We're here to assist you with any questions or requests
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="contact-info-grid">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-info-card">
                    <div className="contact-card-icon">
                      <span className="icon-emoji">{item.icon}</span>
                    </div>
                    <div className="contact-card-content">
                      <h3 className="contact-card-title">{item.title}</h3>
                      <div className="contact-card-details">
                        {item.details.map((detail, idx) => {
                          if (item.links && idx < item.links.length) {
                            const link = item.links[idx];
                            return (
                              <p key={idx} className="contact-detail">
                                <a 
                                  href={link.href} 
                                  className="contact-detail-link"
                                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                                  rel="noopener noreferrer"
                                >
                                  {link.text}
                                </a>
                              </p>
                            );
                          }
                          return (
                            <p key={idx} className="contact-detail">{detail}</p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Section */}
              {/* Map Section */}
<div className="contact-map-section">
  <div className="contact-map-header">
    <h3 className="contact-map-title">Visit Our Hotel</h3>
    <p className="contact-map-subtitle">Find us in the heart of the city</p>
  </div>

  <div className="contact-map-container">
    {/* Map Overlay */}
    

    {/* Google Maps Embed */}
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.211495460735!2d75.3495628!3d29.9733513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391119002125cec5%3A0x1d47754e3fe839d6!2sThe%20Evaani%20Hotel!5e0!3m2!1sen!2sin!4v1768730422341!5m2!1sen!2sin"
      width="100%"
      height="500"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Evaani Hotel Location on Google Maps"
      aria-label="Interactive map showing Evaani Hotel location"
    />

    {/* Map Attribution */}
    <div className="map-attribution">
      Powered by Google Maps
    </div>
  </div>
</div>

              {/* Emergency Contact */}
              <div className="contact-emergency-section">
                <div className="emergency-card">
                  <div className="emergency-icon">🚨</div>
                  <div className="emergency-content">
                    <h3 className="emergency-title">Emergency Contact</h3>
                    <p className="emergency-text">
                      For urgent assistance during your stay, please call our 24/7 emergency line:
                    </p>
                    <a href="tel:+911234567890" className="emergency-phone">
                      +91 12345 67890
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta-section">
        <div className="contact-cta-content">
          <h2 className="contact-cta-title">Experience Luxury Hospitality</h2>
          <p className="contact-cta-text">
            Whether you're planning your next stay or have questions about our services, 
            our team is ready to provide personalized assistance.
          </p>
          <div className="contact-cta-buttons">
            <button className="contact-cta-primary">
              <span className="cta-icon">📅</span>
              Book Your Stay
            </button>
            <button className="contact-cta-secondary">
              <span className="cta-icon">📋</span>
              View Special Offers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}