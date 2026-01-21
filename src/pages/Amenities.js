import "../styles/Amenities.css";

export default function Amenities() {
  const amenities = [
    {
      category: "Internet & Connectivity",
      items: [
        { name: "Free Wi-Fi", icon: "📶", description: "High-speed internet throughout property" },
        { name: "Wi-Fi in Public Areas", icon: "🌐", description: "Free wireless internet in all common areas" },
        { name: "Public Internet Workstation", icon: "💻", description: "Computer with internet access for guests" }
      ]
    },
    {
      category: "Policies & Payments",
      items: [
        { name: "Smoke-free Property", icon: "🚭", description: "Completely smoke-free environment" },
        { name: "Credit & Debit Cards", icon: "💳", description: "Visa, MasterCard, American Express accepted" },
        { name: "NFC Mobile Payments", icon: "📱", description: "Apple Pay, Google Pay, contactless payments" },
        { name: "Cash Payments", icon: "💰", description: "Cash accepted at front desk" }
      ]
    },
    {
      category: "Pools & Recreation",
      items: [
        { name: "Outdoor Pool", icon: "🏊‍♂️", description: "Temperature-controlled infinity pool" },
        { name: "Adult-only Pool", icon: "👨‍💼", description: "Exclusive pool area for adults" },
        { name: "Accessible Pool", icon: "♿", description: "Pool accessibility features available" }
      ]
    },
    {
      category: "Parking & Transport",
      items: [
        { name: "Free Parking", icon: "🅿️", description: "Complimentary parking for all guests" },
        { name: "Self Parking", icon: "🚗", description: "Convenient self-parking facilities" },
        { name: "Accessible Parking", icon: "♿", description: "Designated parking for guests with disabilities" }
      ]
    },
    {
      category: "Accessibility",
      items: [
        { name: "Accessible Facilities", icon: "♿", description: "Wheelchair accessible property" },
        { name: "Accessible Lift", icon: "🛗", description: "Elevator access to all floors" },
        { name: "Accessible Pool", icon: "🏊‍♂️♿", description: "Pool with accessibility features" }
      ]
    },
    {
      category: "Rooms & Accommodation",
      items: [
        { name: "Air Conditioning", icon: "❄️", description: "Individual climate control in all rooms" },
        { name: "Private Kitchen", icon: "🍳", description: "Fully equipped kitchen in select rooms" },
        { name: "Coffee Maker", icon: "☕", description: "In-room coffee and tea facilities" },
        { name: "Private Bathroom", icon: "🛁", description: "En-suite bathroom with premium amenities" }
      ]
    },
    {
      category: "Food & Drink",
      items: [
        { name: "Restaurant", icon: "🍽️", description: "Multi-cuisine fine dining restaurant" },
        { name: "Bar", icon: "🍹", description: "Premium bar with signature cocktails" },
        { name: "Table Service", icon: "👨‍🍳", description: "Professional table service available" },
        { name: "24-hour Room Service", icon: "🛎️", description: "Round-the-clock dining service" },
      ]
    },
    {
      category: "Activities",
      items: [
        { name: "Water Skiing", icon: "⛷️", description: "Water sports and recreational activities" }
      ]
    },
    {
      category: "Guest Services",
      items: [
        { name: "24-hour Front Desk", icon: "🏨", description: "Round-the-clock reception service" },
        { name: "Full-service Laundry", icon: "👔", description: "Professional laundry and dry cleaning" },
        { name: "Daily Housekeeping", icon: "🧹", description: "Complimentary daily room cleaning" },
        { name: "Turndown Service", icon: "🛏️", description: "Evening bed preparation service" }
      ]
    },
    {
      category: "Business & Events",
      items: [
        { name: "Meeting Rooms", icon: "📊", description: "Conference facilities for events" }
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
                  <span className="category-title-icon">{getCategoryIcon(category.category)}</span>
                  {category.category}
                </h2>
                <div className="amenities-category-line"></div>
                <p className="amenities-category-description">
                  Premium {category.category.toLowerCase()} for your comfort and convenience
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
                        <span className="status-indicator available"></span>
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
                <div className="hour-card-icon">🏊‍♂️</div>
                <div className="hour-card-content">
                  <h3 className="hour-card-title">Swimming Pool</h3>
                  <p className="hour-card-time">6:00 AM - 9:00 PM</p>
                  <p className="hour-card-note">Adult-only after 8:00 PM</p>
                </div>
              </div>

              <div className="amenities-hour-card">
                <div className="hour-card-icon">📶</div>
                <div className="hour-card-content">
                  <h3 className="hour-card-title">Front Desk</h3>
                  <p className="hour-card-time">24 Hours</p>
                  <p className="hour-card-note">Always available for assistance</p>
                </div>
              </div>

              <div className="amenities-hour-card">
                <div className="hour-card-icon">🏨</div>
                <div className="hour-card-content">
                  <h3 className="hour-card-title">Room Service</h3>
                  <p className="hour-card-time">24 Hours</p>
                  <p className="hour-card-note">Available round the clock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Helper function for category icons
function getCategoryIcon(category) {
  const iconMap = {
    "Internet & Connectivity": "📡",
    "Policies & Payments": "📋",
    "Pools & Recreation": "🎯",
    "Parking & Transport": "🚘",
    "Accessibility": "♿",
    "Rooms & Accommodation": "🛏️",
    "Food & Drink": "🍽️",
    "Activities": "🎪",
    "Guest Services": "🛎️",
    "Business & Events": "💼"
  };
  return iconMap[category] || "⭐";
}