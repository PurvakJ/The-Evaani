import { useState } from "react";
import { useData } from "../App";
import "../styles/Menu.css";

export default function Menu() {
  const { menuByCategory } = useData();
  const [activeCategory, setActiveCategory] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ["all", ...Object.keys(menuByCategory)];

  const getCategoryEmoji = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes("veg") || name.includes("vegetable")) return "🌱";
    if (name.includes("chicken") || name.includes("meat")) return "🍗";
    if (name.includes("fish") || name.includes("seafood")) return "🐟";
    if (name.includes("pasta") || name.includes("pizza")) return "🍝";
    if (name.includes("dessert") || name.includes("sweet")) return "🍰";
    if (name.includes("drink") || name.includes("juice")) return "🥤";
    if (name.includes("soup")) return "🍜";
    if (name.includes("salad")) return "🥗";
    return "🍽️";
  };

  return (
    <div className="evaani-menu">
      {/* Hero Section */}
      <section className="menu-hero-section">
        <div className="menu-hero-content">
          <h1 className="menu-main-title">Our Culinary Collection</h1>
          <div className="menu-title-line"></div>
          <p className="menu-hero-subtitle">
            Expertly crafted dishes made with passion and premium ingredients
          </p>
        </div>
      </section>

      {/* Filter Bar - Desktop View */}
      <div className="menu-filter-section desktop-view">
        <div className="filter-buttons-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button ${activeCategory === category ? 'filter-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="filter-button-emoji">
                {category === "all" ? "⭐" : getCategoryEmoji(category)}
              </span>
              <span className="filter-button-text">
                {category === "all" ? "All Menu" : category}
              </span>
              <span className="filter-item-count">
                {category === "all" 
                  ? Object.values(menuByCategory).flat().length 
                  : menuByCategory[category]?.length || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filter - All Menu Button + Dropdown */}
      <div className="mobile-filter-section">
        <div className="mobile-filter-wrapper">
          {/* All Menu Button */}
          <button
            className={`mobile-all-button ${activeCategory === 'all' ? 'mobile-filter-active' : ''}`}
            onClick={() => {
              setActiveCategory('all');
              setIsDropdownOpen(false);
            }}
          >
            <span className="mobile-filter-emoji">⭐</span>
            <span className="mobile-filter-text">All Menu</span>
            <span className="mobile-filter-count">
              {Object.values(menuByCategory).flat().length}
            </span>
          </button>

          {/* Dropdown Button */}
          <div className="mobile-category-dropdown">
            <button
              className="dropdown-header-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="dropdown-icon">
                {isDropdownOpen ? '▲' : '▼'}
              </span>
              <span className="dropdown-selected-text">
                {activeCategory === 'all' ? 'Categories' : activeCategory}
              </span>
              <span className="dropdown-arrow">
                {isDropdownOpen ? '▲' : '▼'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="dropdown-options">
                {categories.filter(cat => cat !== 'all').map((category) => (
                  <button
                    key={category}
                    className={`dropdown-option ${activeCategory === category ? 'dropdown-option-active' : ''}`}
                    onClick={() => {
                      setActiveCategory(category);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span className="dropdown-option-emoji">{getCategoryEmoji(category)}</span>
                    <span className="dropdown-option-text">{category}</span>
                    <span className="dropdown-option-count">
                      {menuByCategory[category]?.length || 0}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <section className="menu-categories-section">
        <div className="categories-container">
          {(activeCategory === "all"
            ? Object.keys(menuByCategory)
            : [activeCategory]
          ).map((category) => (
            <div key={category} className="category-group">
              <div className="category-header-section">
                <h2 className="category-group-title">
                  <span className="category-title-emoji">{getCategoryEmoji(category)}</span>
                  {category}
                </h2>
                <div className="category-title-line"></div>
                <div className="category-items-count">
                  {menuByCategory[category]?.length || 0} items
                </div>
              </div>

              <div className="menu-items-grid">
                {menuByCategory[category]?.map((item, index) => (
                  <div 
                    key={index}
                    className="menu-item-card"
                  >
                    <div className="menu-item-content">
                      <div className="menu-item-header">
                        <div className="item-name-price-row">
                          <h3 className="dish-name">{item[2]}</h3>
                          <div className="price-separator"></div>
                          <div className="dish-price">
                            <span className="currency-symbol">₹</span>
                            <span className="price-amount">{item[3]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}