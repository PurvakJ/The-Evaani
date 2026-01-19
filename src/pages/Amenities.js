import "../styles/Amenities.css";

export default function Amenities() {
  const amenities = [
    {
      category: "Dining",
      items: [
        { name: "Fine Dining Restaurant", icon: "🍽️", description: "Multi-cuisine restaurant with chef's specials" },
        { name: "Poolside Bar", icon: "🍹", description: "Refreshments and cocktails by the pool" },
        { name: "24/7 Room Service", icon: "🛎️", description: "Round-the-clock dining at your doorstep" },
        { name: "Breakfast Buffet", icon: "☕", description: "Continental and local breakfast selections" }
      ]
    },
    {
      category: "Wellness",
      items: [
        { name: "Swimming Pool", icon: "🏊", description: "Temperature-controlled infinity pool" },
        { name: "Spa & Massage", icon: "💆", description: "Therapeutic treatments and relaxation therapies" },
        { name: "Fitness Center", icon: "💪", description: "Modern equipment with personal trainers" },
        { name: "Yoga Studio", icon: "🧘", description: "Daily yoga and meditation sessions" }
      ]
    },
    {
      category: "Services",
      items: [
        { name: "Free High-Speed WiFi", icon: "📶", description: "High-speed internet throughout property" },
        { name: "Laundry Service", icon: "👔", description: "Same-day laundry and dry cleaning" },
        { name: "Personal Concierge", icon: "🤵", description: "24/7 assistance and local guidance" },
        { name: "Airport Transfer", icon: "🚗", description: "Complimentary pickup and drop service" }
      ]
    },
    {
      category: "Business",
      items: [
        { name: "Business Center", icon: "💼", description: "Fully equipped with computers and printers" },
        { name: "Meeting Rooms", icon: "📊", description: "Conference facilities for up to 100 guests" },
        { name: "Printing Services", icon: "🖨️", description: "Document printing and binding services" },
        { name: "Video Conferencing", icon: "📹", description: "HD video conferencing facilities" }
      ]
    }
  ];

  return (
    <div className="amenities-container">
      {/* Hero Section */}
      <section className="amenities-hero">
        <div className="amenities-hero-content">
          <h1 className="amenities-hero-title">Amenities & Facilities</h1>
          <p className="amenities-hero-subtitle">Everything for your comfort, convenience, and delight</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="amenities-intro-section">
        <div className="amenities-content-wrapper">
          <div className="amenities-intro-content">
            <h2 className="amenities-intro-title">Experience Luxury in Every Detail</h2>
            <p className="amenities-intro-text">
              At Evaani, luxury is meticulously woven into every aspect of your stay. 
              From world-class dining to rejuvenating wellness facilities, we provide 
              comprehensive amenities designed to elevate your experience and create 
              unforgettable memories.
            </p>
          </div>
        </div>
      </section>

      {/* Amenities Categories */}
      <section className="amenities-categories-section">
        <div className="amenities-content-wrapper">
          {amenities.map((category, index) => (
            <div key={index} className="amenities-category-block">
              <div className="amenities-category-header">
                <h2 className="amenities-category-title">
                  <span className="category-title-icon">{category.category.charAt(0)}</span>
                  {category.category}
                </h2>
                <div className="amenities-category-line"></div>
                <p className="amenities-category-description">
                  Premium {category.category.toLowerCase()} facilities for your comfort
                </p>
              </div>

              <div className="amenities-items-grid">
                {category.items.map((item, idx) => (
                  <div key={idx} className="amenity-item-card">
                    <div className="amenity-item-icon-container">
                      <span className="amenity-item-icon">{item.icon}</span>
                    </div>
                    <div className="amenity-item-content">
                      <h3 className="amenity-item-title">{item.name}</h3>
                      <p className="amenity-item-description">{item.description}</p>
                      <div className="amenity-item-status">
                        <span className="status-indicator"></span>
                        <span className="status-text">Available to All Guests</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Operating Hours */}
      <section className="amenities-hours-section">
        <div className="amenities-content-wrapper">
          <div className="amenities-hours-content">
            <div className="amenities-hours-header">
              <h2 className="amenities-hours-title">Operating Hours</h2>
              <p className="amenities-hours-subtitle">Plan your day with our convenient timings</p>
              <div className="amenities-hours-line"></div>
            </div>

            <div className="amenities-hours-grid">
              <div className="amenities-hour-card">
                <div className="hour-card-icon">🍽️</div>
                <div className="hour-card-content">
                  <h3 className="hour-card-title">Restaurant</h3>
                  <p className="hour-card-time">7:00 AM - 11:00 PM</p>
                  <p className="hour-card-note">Last order at 10:30 PM</p>
                </div>
              </div>

              <div className="amenities-hour-card">
                <div className="hour-card-icon">🏊</div>
                <div className="hour-card-content">
                  <h3 className="hour-card-title">Swimming Pool</h3>
                  <p className="hour-card-time">6:00 AM - 9:00 PM</p>
                  <p className="hour-card-note">Adult-only after 8:00 PM</p>
                </div>
              </div>

              <div className="amenities-hour-card">
                <div className="hour-card-icon">💆</div>
                <div className="hour-card-content">
                  <h3 className="hour-card-title">Spa & Wellness</h3>
                  <p className="hour-card-time">9:00 AM - 8:00 PM</p>
                  <p className="hour-card-note">Advance booking recommended</p>
                </div>
              </div>

              <div className="amenities-hour-card">
                <div className="hour-card-icon">💪</div>
                <div className="hour-card-content">
                  <h3 className="hour-card-title">Fitness Center</h3>
                  <p className="hour-card-time">24 Hours</p>
                  <p className="hour-card-note">Access with room key</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="amenities-extra-section">
        <div className="amenities-content-wrapper">
          <h2 className="amenities-extra-title">Additional Services</h2>
          <p className="amenities-extra-subtitle">Tailored experiences for every need</p>
          
          <div className="amenities-extra-grid">
            <div className="amenities-extra-card">
              <div className="extra-card-icon">👶</div>
              <h3 className="extra-card-title">Child Care</h3>
              <p className="extra-card-text">Professional babysitting services available upon request</p>
            </div>

            <div className="amenities-extra-card">
              <div className="extra-card-icon">🎁</div>
              <h3 className="extra-card-title">Gift Shop</h3>
              <p className="extra-card-text">Luxury souvenirs, essentials, and local handicrafts</p>
            </div>

            <div className="amenities-extra-card">
              <div className="extra-card-icon">🎉</div>
              <h3 className="extra-card-title">Event Planning</h3>
              <p className="extra-card-text">Professional assistance for celebrations and meetings</p>
            </div>

            <div className="amenities-extra-card">
              <div className="extra-card-icon">🐕</div>
              <h3 className="extra-card-title">Pet Friendly</h3>
              <p className="extra-card-text">Special amenities for your furry companions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}