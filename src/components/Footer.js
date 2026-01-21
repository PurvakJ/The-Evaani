import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaGlobe } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    { path: "/admin-login", label: "Admin Login" },
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: "Talwandi road, near golden cooler factory, Mansa, Punjab 151505" },
    { icon: <FaPhone />, text: "+91 95307-52236" },
  ];

  const policies = [
    { path: "/", label: "Privacy Policy" },
    { path: "/", label: "Terms & Conditions" },
    { path: "/", label: "Cancellation Policy" },
    { path: "/", label: "Sitemap" },
  ];

  return (
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
                <Link key={policy.path} to={policy.path} className="policy-link">
                  {policy.label}
                </Link>
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
  );
}