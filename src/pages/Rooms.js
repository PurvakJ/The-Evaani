import { useState } from "react";
import { useData } from "../App";
import "../styles/Rooms.css";

export default function Rooms() {
  const { rooms, imagesByRoomId, loading, error } = useData();

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  if (loading) return <div className="rooms-loading">Loading rooms...</div>;
  if (error) return <div className="rooms-error">{error}</div>;

  const openBooking = () => setShowBookingDialog(true);
  const closeBooking = () => setShowBookingDialog(false);

  return (
    <div className="rooms-container">
      {/* Hero Section */}
      <section className="rooms-hero">
        <div className="rooms-hero-content">
          <h1 className="rooms-hero-title">Our Rooms & Suites</h1>
          <p className="rooms-hero-subtitle">
            Experience luxury and comfort in every meticulously designed space
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="rooms-main-section">
        <div className="rooms-content-wrapper">
          <div className="rooms-grid">
            {rooms.map((room) => {
              const roomId = room[0];
              const images = imagesByRoomId[roomId] || [];
              const cover =
                images[0] ||
                "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

              return (
                <div className="room-card" key={roomId}>
                  <div className="room-image-container">
                    <img src={cover} alt={room[1]} className="room-image" />
                    <div className="room-image-overlay"></div>
                    <span className="room-price-badge">₹{room[3]} / night</span>
                  </div>

                  <div className="room-card-content">
                    <h3 className="room-card-title">{room[1]}</h3>
                    <p className="room-card-description">{room[2]}</p>

                    <div className="room-features">
                      <span className="room-feature-item">✓ Free WiFi</span>
                      <span className="room-feature-item">✓ Air Conditioning</span>
                      <span className="room-feature-item">✓ Room Service</span>
                      <span className="room-feature-item">✓ Flat Screen TV</span>
                    </div>

                    <div className="room-card-actions">
                      <button
                        className="room-secondary-btn"
                        onClick={() => {
                          setSelectedRoom({
                            id: roomId,
                            name: room[1],
                            description: room[2],
                            price: room[3],
                            images
                          });
                          setCurrentImage(0);
                        }}
                      >
                        View Details
                      </button>

                      <button className="room-primary-btn" onClick={openBooking}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Room Details Modal */}
      {selectedRoom && (
        <div className="room-modal-overlay" onClick={() => setSelectedRoom(null)}>
          <div className="room-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="room-modal-close" 
              onClick={() => setSelectedRoom(null)}
            >
              ✕
            </button>

            <div className="room-modal-body">
              {/* Image Gallery */}
              <div className="room-modal-gallery">
                <img
                  src={
                    selectedRoom.images[currentImage] ||
                    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  }
                  alt={selectedRoom.name}
                  className="room-modal-main-image"
                />

                {selectedRoom.images.length > 1 && (
                  <>
                    <button
                      className="room-modal-nav room-modal-prev"
                      onClick={() =>
                        setCurrentImage(
                          (prev) =>
                            (prev - 1 + selectedRoom.images.length) %
                            selectedRoom.images.length
                        )
                      }
                    >
                      ‹
                    </button>
                    <button
                      className="room-modal-nav room-modal-next"
                      onClick={() =>
                        setCurrentImage(
                          (prev) =>
                            (prev + 1) % selectedRoom.images.length
                        )
                      }
                    >
                      ›
                    </button>

                    <div className="room-modal-thumbnails">
                      {selectedRoom.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt=""
                          className={`room-modal-thumbnail ${i === currentImage ? 'room-modal-thumbnail-active' : ''}`}
                          onClick={() => setCurrentImage(i)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Room Info - Scrollable Content */}
              <div className="room-modal-info">
                <div className="room-modal-info-scroll">
                  <h2 className="room-modal-title">{selectedRoom.name}</h2>
                  <p className="room-modal-description">{selectedRoom.description}</p>

                  <div className="room-modal-features">
                    <div className="room-modal-feature">✓ Free WiFi</div>
                    <div className="room-modal-feature">✓ Air Conditioning</div>
                    <div className="room-modal-feature">✓ Room Service</div>
                    <div className="room-modal-feature">✓ Flat Screen TV</div>
                    <div className="room-modal-feature">✓ Private Bathroom</div>
                    <div className="room-modal-feature">✓ Safe Deposit Box</div>
                    <div className="room-modal-feature">✓ Coffee/Tea Maker</div>
                  </div>

                  <div className="room-modal-price">
                    <span className="room-modal-price-label">Starting from</span>
                    <span className="room-modal-price-value">₹{selectedRoom.price} / night</span>
                  </div>

                  <button className="room-modal-book-btn" onClick={openBooking}>
                    Book Now
                  </button>

                  {/* Additional Room Information */}
                  <div className="room-additional-info">
                    <h3>Room Details</h3>
                    <div className="room-details-grid">
                      <div className="room-detail-item">
                        <span className="detail-icon">🛏️</span>
                        <span className="detail-text">King Size Bed</span>
                      </div>
                      <div className="room-detail-item">
                        <span className="detail-icon">🚿</span>
                        <span className="detail-text">Rain Shower</span>
                      </div>
                      <div className="room-detail-item">
                        <span className="detail-icon">📺</span>
                        <span className="detail-text">43" Smart TV</span>
                      </div>
                      <div className="room-detail-item">
                        <span className="detail-icon">🔄</span>
                        <span className="detail-text">Daily Housekeeping</span>
                      </div>
                      <div className="room-detail-item">
                        <span className="detail-icon">🧴</span>
                        <span className="detail-text">Premium Toiletries</span>
                      </div>
                      <div className="room-detail-item">
                        <span className="detail-icon">☕</span>
                        <span className="detail-text">Coffee Machine</span>
                      </div>
                    </div>
                  </div>

                  {/* Room Policies */}
                  <div className="room-policies">
                    <h3>Hotel Policies</h3>
                    <ul className="policies-list">
                      <li>Check-in: 12:00 PM</li>
                      <li>Check-out: 11:30 AM</li>
                      <li>Early check-in and late check-out subject to availability</li>
                      <li>Children under 12 stay free when using existing bedding</li>
                      <li>Extra beds available on request</li>
                      <li>Pets are not allowed</li>
                      <li>Smoking is not permitted in rooms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Dialog */}
      {showBookingDialog && (
        <div className="room-booking-overlay" onClick={closeBooking}>
          <div className="room-booking-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="room-booking-close" onClick={closeBooking}>
              ✕
            </button>

            <h3 className="room-booking-title">Choose Booking Option</h3>
            <p className="room-booking-subtitle">Select your preferred booking method</p>

            <div className="room-booking-options">
              <a
                href="https://www.goibibo.com/hotels/the-evaani-hotel-in-mansa-3920650559968152257/"
                target="_blank"
                rel="noreferrer"
                className="room-booking-option"
              >
                <span className="room-booking-option-icon">📱</span>
                <div>
                  <div className="room-booking-option-title">Book with Goibibo</div>
                  <div className="room-booking-option-description">Instant confirmation</div>
                </div>
              </a>

              <a
                href="https://www.makemytrip.com/hotels/the_evaani_hotel-details-mansa_punjab.html"
                target="_blank"
                rel="noreferrer"
                className="room-booking-option"
              >
                <span className="room-booking-option-icon">✈️</span>
                <div>
                  <div className="room-booking-option-title">Book with MakeMyTrip</div>
                  <div className="room-booking-option-description">Best price guarantee</div>
                </div>
              </a>

              <div className="room-booking-option room-booking-direct">
                <span className="room-booking-option-icon">📞</span>
                <div>
                  <div className="room-booking-option-title">Direct Booking</div>
                  <div className="room-booking-option-description">
                    Call us at <strong className="room-booking-phone">+91 95307-52236</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}