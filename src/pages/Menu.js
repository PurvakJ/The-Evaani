import { useState } from "react";
import { useData } from "../App";
import "../styles/Menu.css";

export default function Menu() {
  const { menuByCategory } = useData();
  const [activeCategory, setActiveCategory] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [foodType, setFoodType] = useState("all"); // "all", "veg", "nonveg"

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

  const getTypeEmoji = (type) => {
    if (type?.toLowerCase() === "veg") return "🟢";
    if (type?.toLowerCase() === "nonveg") return "🔴";
    return "⚪";
  };

  const getTypeName = (type) => {
    if (type?.toLowerCase() === "veg") return "Vegetarian";
    if (type?.toLowerCase() === "nonveg") return "Non-Vegetarian";
    return "Unknown";
  };

  // Filter menu items based on active category and food type
  const getFilteredMenu = () => {
    let filteredMenu = {};
    
    // First filter by category
    Object.keys(menuByCategory).forEach(category => {
      if (activeCategory === "all" || activeCategory === category) {
        const items = menuByCategory[category] || [];
        
        // Then filter by food type
        const filteredItems = items.filter(item => {
          const itemType = item[4]?.toLowerCase(); // item[4] is the type field
          if (foodType === "all") return true;
          if (foodType === "veg") return itemType === "veg";
          if (foodType === "nonveg") return itemType === "nonveg";
          return true;
        });
        
        if (filteredItems.length > 0) {
          filteredMenu[category] = filteredItems;
        }
      }
    });
    
    return filteredMenu;
  };

  const filteredMenu = getFilteredMenu();
  const totalItemsCount = Object.values(filteredMenu).flat().length;

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

      {/* Filter Section - Desktop */}
      <div className="menu-filter-section desktop-view">
        <div className="filter-buttons-container">
          {/* Food Type Filters */}
          <div className="food-type-filter">
            <button
              className={`food-type-button ${foodType === "all" ? "filter-active" : ""}`}
              onClick={() => setFoodType("all")}
              data-type="all"
            >
              <span className="filter-button-emoji">🍽️</span>
              <span className="filter-button-text">All</span>
            </button>
            <button
              className={`food-type-button ${foodType === "veg" ? "filter-active" : ""}`}
              onClick={() => setFoodType("veg")}
              data-type="veg"
            >
              <span className="filter-button-emoji">🟢</span>
              <span className="filter-button-text">Vegetarian</span>
            </button>
            <button
              className={`food-type-button ${foodType === "nonveg" ? "filter-active" : ""}`}
              onClick={() => setFoodType("nonveg")}
              data-type="nonveg"
            >
              <span className="filter-button-emoji">🔴</span>
              <span className="filter-button-text">Non-Veg</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="category-filters">
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
                    ? totalItemsCount
                    : (filteredMenu[category]?.length || 0)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Section */}
      <div className="mobile-filter-section">
        <div className="mobile-filter-wrapper">
          {/* Food Type Filter (Mobile) */}
          <div className="mobile-food-type-filter">
            <button
              className={`mobile-food-type-button ${foodType === "all" ? "mobile-filter-active" : ""}`}
              onClick={() => setFoodType("all")}
              data-type="all"
            >
              <span className="mobile-filter-emoji">🍽️</span>
              <span className="mobile-filter-text">All</span>
            </button>
            <button
              className={`mobile-food-type-button ${foodType === "veg" ? "mobile-filter-active" : ""}`}
              onClick={() => setFoodType("veg")}
              data-type="veg"
            >
              <span className="mobile-filter-emoji">🟢</span>
              <span className="mobile-filter-text">Veg</span>
            </button>
            <button
              className={`mobile-food-type-button ${foodType === "nonveg" ? "mobile-filter-active" : ""}`}
              onClick={() => setFoodType("nonveg")}
              data-type="nonveg"
            >
              <span className="mobile-filter-emoji">🔴</span>
              <span className="mobile-filter-text">Non-Veg</span>
            </button>
          </div>

          {/* Category Filters (Mobile) */}
          <div className="mobile-category-filters">
            <button
              className={`mobile-all-button ${activeCategory === 'all' ? 'mobile-filter-active' : ''}`}
              onClick={() => {
                setActiveCategory('all');
                setIsDropdownOpen(false);
              }}
            >
              <span className="mobile-filter-emoji">⭐</span>
              <span className="mobile-filter-text">All Menu</span>
              <span className="mobile-filter-count">{totalItemsCount}</span>
            </button>

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
                        {filteredMenu[category]?.length || 0}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <section className="menu-categories-section">
        <div className="categories-container">
          {(activeCategory === "all"
            ? Object.keys(filteredMenu)
            : filteredMenu[activeCategory] ? [activeCategory] : []
          ).map((category) => (
            <div key={category} className="category-group">
              <div className="category-header-section">
                <h2 className="category-group-title">
                  <span className="category-title-emoji">{getCategoryEmoji(category)}</span>
                  {category}
                </h2>
                <div className="category-title-line"></div>
                <div className="category-items-count">
                  {filteredMenu[category]?.length || 0} items
                </div>
              </div>

              <div className="menu-items-grid">
                {filteredMenu[category]?.map((item, index) => (
                  <div 
                    key={index}
                    className="menu-item-card"
                  >
                    <div className="menu-item-content">
                      <div className="menu-item-header">
                        <div className="item-name-price-row">
                          <div className="item-name-type">
                            <h3 className="dish-name">{item[2]}</h3>
                            <div 
                              className="item-type-badge" 
                              data-type={item[4]?.toLowerCase()}
                            >
                              <span className="type-emoji">{getTypeEmoji(item[4])}</span>
                              <span className="type-text">{getTypeName(item[4])}</span>
                            </div>
                          </div>
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

      {/* No Results Message */}
      {totalItemsCount === 0 && (
        <div className="no-results-message">
          <div className="no-results-emoji">🍽️</div>
          <h3>No menu items found</h3>
          <p>Try changing your filters to see more options</p>
        </div>
      )}
    </div>
  );
}