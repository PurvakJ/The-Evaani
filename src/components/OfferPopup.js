import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function OfferPopup() {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [seenOffers, setSeenOffers] = useState(new Set());
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Check if we've shown offers in this session
    const savedSeen = sessionStorage.getItem("seenOffers");
    const savedIndex = sessionStorage.getItem("currentOfferIndex");
    
    const fetchOffers = async () => {
      try {
        const data = await api({ action: "get", sheet: "offers" });

        if (data.length > 1) {
          const headers = data[0];
          const rows = data.slice(1);

          // Find ALL active offers
          const activeOffers = rows.filter(r => {
            const statusIndex = headers.indexOf("status");
            return r[statusIndex]?.toLowerCase() === "active";
          });

          if (activeOffers.length > 0) {
            setOffers(activeOffers);
            
            // Restore seen offers from sessionStorage
            if (savedSeen) {
              setSeenOffers(new Set(JSON.parse(savedSeen)));
            }
            
            // Restore current index
            const startIndex = savedIndex ? parseInt(savedIndex) : 0;
            setCurrentIndex(startIndex);
            
            // Show first offer after 3 seconds
            setTimeout(() => {
              if (startIndex < activeOffers.length) {
                setShow(true);
              }
            }, 3000);
          }
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  // Save state to sessionStorage
  useEffect(() => {
    if (offers.length > 0) {
      sessionStorage.setItem("seenOffers", JSON.stringify([...seenOffers]));
      sessionStorage.setItem("currentOfferIndex", currentIndex.toString());
    }
  }, [seenOffers, currentIndex, offers.length]);

  const handleClose = () => {
    setIsClosing(true);
    
    // Mark current offer as seen
    const newSeen = new Set(seenOffers);
    newSeen.add(currentIndex);
    setSeenOffers(newSeen);
    
    // Close animation
    setTimeout(() => {
      setShow(false);
      setIsClosing(false);
      
      // Find next unseen offer
      let nextIndex = -1;
      for (let i = 0; i < offers.length; i++) {
        if (!newSeen.has(i)) {
          nextIndex = i;
          break;
        }
      }
      
      // If all offers seen, mark session as complete
      if (nextIndex === -1) {
        sessionStorage.setItem("offersCompleted", "true");
        return;
      }
      
      // Show next offer after 1 second
      setCurrentIndex(nextIndex);
      setTimeout(() => {
        setShow(true);
      }, 1000);
      
    }, 300);
  };

  const handleClaim = () => {
    // Mark all offers as seen when claimed
    const allSeen = new Set();
    for (let i = 0; i < offers.length; i++) {
      allSeen.add(i);
    }
    setSeenOffers(allSeen);
    sessionStorage.setItem("offersCompleted", "true");
    sessionStorage.setItem("seenOffers", JSON.stringify([...allSeen]));
    
    setShow(false);
    window.location.href = "/contact";
  };

  const skipAllOffers = () => {
    // Mark all offers as seen
    const allSeen = new Set();
    for (let i = 0; i < offers.length; i++) {
      allSeen.add(i);
    }
    setSeenOffers(allSeen);
    sessionStorage.setItem("offersCompleted", "true");
    sessionStorage.setItem("seenOffers", JSON.stringify([...allSeen]));
    setShow(false);
  };

  // Check if we should show any offers
  if (offers.length === 0) return null;
  
  // Check if all offers have been shown in this session
  if (sessionStorage.getItem("offersCompleted") === "true") return null;
  
  // Check if current offer has been seen
  if (seenOffers.has(currentIndex) && currentIndex < offers.length - 1) {
    // Find next unseen offer
    for (let i = 0; i < offers.length; i++) {
      if (!seenOffers.has(i)) {
        setCurrentIndex(i);
        setTimeout(() => setShow(true), 1000);
        break;
      }
    }
    return null;
  }

  const currentOffer = offers[currentIndex];
  const totalOffers = offers.length;
  const shownCount = seenOffers.size + (show ? 1 : 0);
  const remainingOffers = totalOffers - shownCount;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0); }
          to { opacity: 1; backdrop-filter: blur(15px); }
        }
        @keyframes fadeOut {
          from { opacity: 1; backdrop-filter: blur(15px); }
          to { opacity: 0; backdrop-filter: blur(0); }
        }
        @keyframes slideIn {
          from { transform: translateY(60px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateY(0) scale(1); opacity: 1; }
          to { transform: translateY(60px) scale(0.95); opacity: 0; }
        }
        @keyframes subtlePulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Mobile-specific animations */
        @keyframes fadeInMobile {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOutMobile {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @media (max-width: 768px) {
          /* Prevent body scroll when popup is open */
          body.popup-open {
            overflow: hidden;
            position: fixed;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
      
      {show && (
        <>
          {/* Prevent body scroll on mobile when popup is open */}
          {isMobile && (
            <style>{`
              body {
                overflow: hidden !important;
                position: fixed !important;
                width: 100% !important;
                height: 100% !important;
              }
            `}</style>
          )}
          
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            justifyContent: "center",
            alignItems: isMobile ? "center" : "center", // Changed to center for mobile
            zIndex: 10000,
            animation: isClosing 
              ? (isMobile ? "fadeOutMobile 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "fadeOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards")
              : (isMobile ? "fadeInMobile 0.4s cubic-bezier(0.4, 0, 0.2, 1)" : "fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)"),
            backdropFilter: "blur(15px)",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            padding: isMobile ? "20px" : "20px", // Added padding for mobile
            boxSizing: "border-box",
          }}>
            {/* Background gradient overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 30%, rgba(111, 70, 71, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(93, 58, 59, 0.1) 0%, transparent 50%)
              `,
              opacity: 0.5
            }} />
            
            <div style={{
              backgroundColor: "#1a1a1a",
              padding: "0",
              borderRadius: isMobile ? "20px" : "0", // Rounded corners on mobile
              width: isMobile ? "100%" : "90%",
              maxWidth: "500px",
              maxHeight: isMobile ? "calc(100vh - 40px)" : "calc(100vh - 40px)",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
              animation: isClosing 
                ? (isMobile ? "fadeOutMobile 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards")
                : (isMobile ? "fadeInMobile 0.4s cubic-bezier(0.4, 0, 0.2, 1)" : "slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)"),
              border: "1px solid rgba(111, 70, 71, 0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              margin: "auto", // Center the modal
            }}>
              {/* Top border accent */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, #6f4647, transparent)",
                zIndex: 1
              }} />

              {/* Offer counter badge */}
              <div style={{
                position: "absolute",
                top: isMobile ? "20px" : "20px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#6f4647",
                color: "white",
                padding: isMobile ? "10px 24px" : "12px 32px",
                borderRadius: "0",
                fontSize: isMobile ? "0.8rem" : "0.85rem",
                fontWeight: "400",
                letterSpacing: "2px",
                textTransform: "uppercase",
                zIndex: 2,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                whiteSpace: "nowrap",
                maxWidth: "90%",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>
                Exclusive Offer {currentIndex + 1} of {totalOffers}
                {remainingOffers > 0 && ` • ${remainingOffers} more`}
              </div>

              {/* Close button */}
              <button
                style={{
                  position: "absolute",
                  top: isMobile ? "20px" : "25px",
                  right: isMobile ? "20px" : "25px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  fontSize: isMobile ? "1.5rem" : "1.8rem",
                  cursor: "pointer",
                  width: isMobile ? "35px" : "45px",
                  height: isMobile ? "35px" : "45px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: 2,
                  backdropFilter: "blur(10px)",
                  WebkitTapHighlightColor: "transparent"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(111, 70, 71, 0.3)";
                  e.target.style.color = "white";
                  e.target.style.borderColor = "#6f4647";
                  e.target.style.transform = "rotate(90deg)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  e.target.style.color = "rgba(255, 255, 255, 0.7)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.transform = "rotate(0deg)";
                }}
                onClick={handleClose}
                title="Close this offer (show next)"
              >
                ×
              </button>

              {/* Scrollable content container */}
              <div style={{
                padding: isMobile ? "60px 25px 30px" : "60px 50px 50px",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                flex: "1",
                maxHeight: "calc(100% - 70px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // Center content vertically
              }}>
                {/* Offer icon */}
                <div style={{
                  fontSize: isMobile ? "4rem" : "5rem",
                  margin: "0 0 20px 0",
                  animation: "subtlePulse 4s ease-in-out infinite",
                  color: "#6f4647",
                  filter: "drop-shadow(0 4px 12px rgba(111, 70, 71, 0.4))"
                }}>
                  {currentIndex % 3 === 0 ? "👑" : currentIndex % 3 === 1 ? "✨" : "🌟"}
                </div>

                {/* Offer type badge */}
                <div style={{
                  backgroundColor: "transparent",
                  color: "#6f4647",
                  padding: isMobile ? "10px 25px" : "10px 35px",
                  borderRadius: "0",
                  display: "inline-block",
                  marginBottom: isMobile ? "20px" : "25px",
                  fontSize: isMobile ? "0.9rem" : "0.95rem",
                  fontWeight: "400",
                  letterSpacing: isMobile ? "2px" : "3px",
                  textTransform: "uppercase",
                  border: "1px solid rgba(111, 70, 71, 0.3)",
                  fontFamily: "'Cormorant Garamond', serif",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(111, 70, 71, 0.1), transparent)",
                    transition: "left 0.7s ease"
                  }} />
                  Exclusive Experience
                </div>

                {/* Offer title */}
                <h2 style={{
                  margin: "0 0 15px 0",
                  color: "white",
                  fontSize: isMobile ? "1.8rem" : "2.2rem",
                  fontWeight: "400",
                  lineHeight: "1.2",
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: "1px",
                  padding: isMobile ? "0 10px" : "0"
                }}>
                  {currentOffer[1]}
                </h2>

                {/* Offer description */}
                <div style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: "1.8",
                  marginBottom: isMobile ? "30px" : "40px",
                  fontSize: isMobile ? "1.05rem" : "1.15rem",
                  padding: isMobile ? "0 10px" : "0 15px",
                  minHeight: isMobile ? "40px" : "60px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  letterSpacing: "0.5px"
                }}>
                  {currentOffer[2]}
                </div>

                {/* Progress indicator */}
                <div style={{
                  marginBottom: isMobile ? "30px" : "35px",
                  padding: isMobile ? "0 15px" : "0 20px"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: "0.5px"
                  }}>
                    <span>Viewing {currentIndex + 1} of {totalOffers}</span>
                    <span>{Math.round(((currentIndex + 1) / totalOffers) * 100)}% shown</span>
                  </div>
                  <div style={{
                    height: "1px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "0",
                    overflow: "hidden",
                    position: "relative"
                  }}>
                    <div style={{
                      height: "100%",
                      backgroundColor: "#6f4647",
                      width: `${((currentIndex + 1) / totalOffers) * 100}%`,
                      transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                        animation: "shimmer 2s infinite linear"
                      }} />
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "15px" : "20px",
                  marginBottom: isMobile ? "20px" : "25px"
                }}>
                  {/* Claim button */}
                  <button
                    style={{
                      backgroundColor: "#6f4647",
                      color: "white",
                      border: "1px solid #6f4647",
                      borderRadius: "0",
                      padding: isMobile ? "20px 25px" : "22px 45px",
                      fontSize: isMobile ? "1.05rem" : "1.1rem",
                      fontWeight: "400",
                      cursor: "pointer",
                      flex: isMobile ? "none" : "2",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      fontFamily: "'Cormorant Garamond', serif",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      width: isMobile ? "100%" : "auto",
                      WebkitTapHighlightColor: "transparent"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.letterSpacing = "3px";
                      e.target.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.letterSpacing = "2px";
                      e.target.style.transform = "translateY(0)";
                    }}
                    onTouchStart={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onTouchEnd={(e) => {
                      e.target.style.transform = "translateY(0)";
                    }}
                    onClick={handleClaim}
                  >
                    <span style={{ position: "relative", zIndex: 1 }}>
                      Reserve Now
                    </span>
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                      transition: "left 0.7s ease"
                    }} />
                  </button>

                  {/* Next offer button (if more available) */}
                  {remainingOffers > 0 && (
                    <button
                      style={{
                        backgroundColor: "transparent",
                        color: "white",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "0",
                        padding: isMobile ? "20px 25px" : "22px 30px",
                        fontSize: isMobile ? "1rem" : "1rem",
                        fontWeight: "400",
                        cursor: "pointer",
                        flex: isMobile ? "none" : "1",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        fontFamily: "'Cormorant Garamond', serif",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        position: "relative",
                        overflow: "hidden",
                        width: isMobile ? "100%" : "auto",
                        WebkitTapHighlightColor: "transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                        e.target.style.borderColor = "#6f4647";
                        e.target.style.letterSpacing = "3px";
                        e.target.style.transform = isMobile ? "translateY(-2px)" : "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                        e.target.style.letterSpacing = "2px";
                        e.target.style.transform = "translateX(0)";
                      }}
                      onTouchStart={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onTouchEnd={(e) => {
                        e.target.style.transform = "translateY(0)";
                      }}
                      onClick={handleClose}
                      title={`Skip to next offer (${remainingOffers} remaining)`}
                    >
                      <span>Next</span>
                      <span style={{ 
                        fontSize: isMobile ? "1.1rem" : "1.2rem",
                        transition: "transform 0.3s ease"
                      }}>→</span>
                    </button>
                  )}
                </div>

                {/* Skip all offers button */}
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "rgba(255, 255, 255, 0.5)",
                    border: "none",
                    padding: isMobile ? "15px 20px" : "15px 30px",
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    borderRadius: "0",
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    width: "100%",
                    WebkitTapHighlightColor: "transparent"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "rgba(255, 255, 255, 0.8)";
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgba(255, 255, 255, 0.5)";
                    e.target.style.backgroundColor = "transparent";
                  }}
                  onClick={skipAllOffers}
                >
                  Skip all offers ({remainingOffers} remaining)
                </button>

                {/* Footer message */}
                <div style={{
                  marginTop: isMobile ? "25px" : "35px",
                  paddingTop: isMobile ? "20px" : "25px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  fontSize: isMobile ? "0.85rem" : "0.9rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: "1.6",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  letterSpacing: "0.5px",
                  padding: isMobile ? "0 10px" : "0"
                }}>
                  {remainingOffers > 0 ? (
                    <p style={{ margin: 0 }}>
                      <span style={{ color: "#6f4647" }}>Exclusive invitations remaining:</span>{" "}
                      <strong style={{ color: "white" }}>{remainingOffers} premium offer{remainingOffers > 1 ? 's' : ''}</strong>
                    </p>
                  ) : (
                    <p style={{ margin: 0 }}>
                      <span style={{ color: "#6f4647" }}>Final exclusive invitation</span>{" "}
                      <strong style={{ color: "white" }}>Limited availability</strong>
                    </p>
                  )}
                </div>

                {/* Mini indicator for multiple offers */}
                {totalOffers > 1 && (
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: isMobile ? "20px" : "25px",
                    flexWrap: "wrap"
                  }}>
                    {offers.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          width: isMobile ? "10px" : "10px",
                          height: isMobile ? "10px" : "10px",
                          borderRadius: "0",
                          backgroundColor: index === currentIndex 
                            ? "#6f4647" 
                            : seenOffers.has(index) 
                              ? "rgba(111, 70, 71, 0.5)" 
                              : "rgba(255, 255, 255, 0.1)",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          cursor: "pointer",
                          position: "relative",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          flexShrink: 0
                        }}
                        title={`Offer ${index + 1}: ${seenOffers.has(index) ? 'Viewed' : 'Not viewed yet'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom border accent */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, #6f4647, transparent)",
                zIndex: 1
              }} />
            </div>
          </div>
        </>
      )}
    </>
  );
}