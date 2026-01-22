import { useState, useEffect } from "react";
import "../styles/LoadingScreen.css";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Elegant, classy color palette
  const colorPalette = {
    primary: "#1a365d", // Deep blue
    accent: "#6f4647", // Changed to burgundy
    light: "#f8f5f0", // Off-white
    dark: "#2d3748", // Dark gray
  };

  // ⏱ Loader duration (6 seconds)
  const TOTAL_DURATION = 3000; // ms
  const INTERVAL_DURATION = 40; // ms

  useEffect(() => {
    const increment = 100 / (TOTAL_DURATION / INTERVAL_DURATION);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setIsComplete(true);

          // Small delay for smooth exit animation
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("loadingComplete"));
          }, 400);

          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, INTERVAL_DURATION);

    return () => clearInterval(progressTimer);
  }, []);

  if (isComplete) return null;

  return (
    <div className="loading-screen">
      {/* Background */}
      <div
        className="loading-background"
        style={{ backgroundColor: colorPalette.primary }}
      >
        <div className="gradient-overlay"></div>
      </div>

      <div className="loading-content">
        {/* Brand with Centered Big Image */}
        <div className="hotel-brand">
          <div className="brand-logo">
            <div className="logo-image-container">
              <img 
                src="https://i.postimg.cc/W1GJ1wq8/evaani.png" 
                alt="Evaani Hotel Logo"
                className="loading-logo-image"
              />
            </div>
          </div>

          <div className="brand-text">
            <h1
              className="hotel-name"
              style={{ color: colorPalette.light }}
            >
              Evaani Hotel
            </h1>
            <p
              className="hotel-tagline"
              style={{ color: colorPalette.accent }}
            >
              Luxury & Comfort
            </p>
          </div>
        </div>

        {/* Spinner */}
        <div className="spinner-container">
          <div className="spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-center">
              <span className="spinner-dot"></span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="loading-progress">
          <div className="progress-label">
            <span
              className="progress-text"
              style={{ color: colorPalette.light }}
            >
              Loading {Math.round(progress)}%
            </span>
          </div>

          <div
            className="progress-track"
            style={{ backgroundColor: colorPalette.dark }}
          >
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
                backgroundColor: colorPalette.accent,
              }}
            ></div>
          </div>

          {/* Remaining Time */}
          <div className="progress-time">
            <span
              className="time-text"
              style={{ color: colorPalette.light }}
            >
              {(
                (TOTAL_DURATION -
                  progress * (TOTAL_DURATION / 100)) /
                1000
              ).toFixed(1)}
              s
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="loading-message">
          <p style={{ color: colorPalette.light }}>
            Preparing your luxury experience...
          </p>
        </div>

        {/* Decorative Line */}
        <div
          className="decorative-line"
          style={{ backgroundColor: colorPalette.accent }}
        ></div>
      </div>
    </div>
  );
}