import { Link } from "react-router-dom";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaGlobe, FaTimes } from "react-icons/fa";
import "../styles/Footer.css";
import "../styles/PolicyPopup.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const socialLinks = [
    { icon: <FaFacebook />, url: "https://www.facebook.com/p/Theevaani-61573315044361/" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/theevaani/?hl=en" },
    { icon: <FaGlobe />, url: "https://www.makemytrip.com/hotels/the_evaani_hotel-details-mansa_punjab.html" },
    { icon: <FaGlobe />, url: "https://www.goibibo.com/hotels/the-evaani-hotel-in-mansa-3920650559968152257/" },
  ];

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/rooms", label: "Rooms & Suites" },
    { path: "/menu", label: "Dining" },
    { path: "/amenities", label: "Amenities" },
    { path: "/venue", label: "Venue" },
    { path: "/contact", label: "Contact" },
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: "Talwandi road, near golden cooler factory, Mansa, Punjab 151505" },
    { icon: <FaPhone />, text: "+91 95307-52236" },
  ];

  const policies = [
    { 
      path: "#", 
      label: "Privacy Policy",
      content: "At Evaani Hotel, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or make reservations with us. We collect information such as your name, contact details, payment information, and preferences to provide you with the best possible service. Your data is encrypted and securely stored, and we never share your personal information with third parties without your explicit consent. By using our services, you agree to the terms of this Privacy Policy, which may be updated periodically to reflect changes in our practices or legal requirements."
    },
    { 
      path: "#", 
      label: "Terms & Conditions",
      content: "Welcome to Evaani Hotel. By accessing our website or making a reservation, you agree to be bound by these Terms and Conditions. All reservations are subject to availability and confirmation. Check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in and late check-out are subject to availability and additional charges. Guests must be at least 18 years old to make a reservation. We reserve the right to refuse service to anyone at our discretion. Hotel policies regarding smoking, pets, and noise levels must be respected. Violation of these terms may result in eviction without refund."
    },
    { 
      path: "#", 
      label: "Cancellation Policy",
      content: "Our cancellation policy varies based on the rate type and booking platform. For standard bookings, free cancellation is available up to 48 hours before check-in. Cancellations made within 48 hours of arrival will incur a one-night charge. Non-refundable rates require full prepayment and are not eligible for refunds or changes. No-show reservations will be charged for the entire stay. Group bookings of 5 or more rooms have separate cancellation terms. During peak seasons and special events, stricter cancellation policies may apply. We recommend purchasing travel insurance for added flexibility."
    },
    { 
      path: "#", 
      label: "Sitemap",
      content: "Welcome to the Evaani Hotel website sitemap. Navigate through our digital presence with ease: Home - Our main landing page featuring hotel highlights and special offers. About Us - Learn about our history, mission, and commitment to excellence. Rooms & Suites - Explore our luxurious accommodations including deluxe rooms, executive suites, and presidential suites. Dining - Discover our restaurants, bars, and catering services. Amenities - View our spa, fitness center, pool, and business facilities. Venue - Plan your weddings, conferences, and special events. Contact - Get in touch with our team for reservations and inquiries. Gallery - Browse photos of our property and services."
    },
    { 
      path: "/admin-login", 
      label: "Admin Login"
    },
  ];

  const openPolicyPopup = (policy) => {
    setSelectedPolicy(policy);
    document.body.style.overflow = 'hidden';
  };

  const closePolicyPopup = () => {
    setSelectedPolicy(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-container">
            <div className="footer-grid">
              {/* Hotel Information */}
              <div className="footer-column">
                <div className="footer-logo">
                  <span className="logo-text">Evaani Hotel</span>
                  <span className="logo-subtitle">Where Luxury Meets Comfort</span>
                </div>
                <p className="footer-description">
                  Experience world-class hospitality in the heart of the city. 
                  Evaani Hotel offers premium accommodations, fine dining, 
                  and exceptional service for business and leisure travelers.
                </p>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      aria-label={`Follow us on ${social.url.split('.')[1]}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-column">
                <h3 className="footer-heading">Quick Links</h3>
                <ul className="footer-links">
                  {quickLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="footer-column">
                <h3 className="footer-heading">Contact Us</h3>
                <ul className="contact-info">
                  {contactInfo.map((item, index) => (
                    <li key={index} className="contact-item">
                      <span className="contact-icon">{item.icon}</span>
                      <span className="contact-text">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="footer-column">
                <h3 className="footer-heading">Stay Updated</h3>
                <p className="newsletter-text">
                  Subscribe to our newsletter for exclusive offers and updates.
                </p>
                <form className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-button">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-container">
            <div className="footer-bottom-content">
              <div className="copyright">
                © {currentYear} Evaani Hotel. All rights reserved.
              </div>
              <div className="footer-policies">
                {policies.map((policy) => (
                  policy.path === "/admin-login" ? (
                    <Link key={policy.path} to={policy.path} className="policy-link">
                      {policy.label}
                    </Link>
                  ) : (
                    <button
                      key={policy.label}
                      onClick={() => openPolicyPopup(policy)}
                      className="policy-link policy-btn"
                    >
                      {policy.label}
                    </button>
                  )
                ))}
              </div>
              <div className="payment-methods">
                <span className="payment-text">We accept:</span>
                <div className="payment-icons">
                  <span className="payment-icon">💳</span>
                  <span className="payment-icon">💲</span>
                  <span className="payment-icon">🏦</span>
                  <span className="payment-icon">💰</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Popup Modal */}
      {selectedPolicy && (
        <div className="policy-popup-overlay" onClick={closePolicyPopup}>
          <div className="policy-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="policy-popup-close" onClick={closePolicyPopup}>
              <FaTimes />
            </button>
            <h3 className="policy-popup-title">{selectedPolicy.label}</h3>
            <div className="policy-popup-body">
              <p className="policy-popup-text">{selectedPolicy.content}</p>
            </div>
            <div className="policy-popup-footer">
              <button className="policy-popup-button" onClick={closePolicyPopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}