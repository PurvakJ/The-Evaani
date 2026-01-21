import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import { api } from "./api/api";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Rooms from "./pages/Rooms";
import Menu from "./pages/Menu";
import Venue from "./pages/Venue";
import Amenities from "./pages/Amenities";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

// Create contexts for global data
const DataContext = createContext();
const CarouselContext = createContext();

// Custom hooks to use the contexts
export const useData = () => useContext(DataContext);
export const useCarousel = () => useContext(CarouselContext);

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return null;
}

// Carousel Provider Component
function CarouselProvider({ children }) {
  const [currentSlide, setCurrentSlide] = useState(() => {
    const saved = sessionStorage.getItem('globalCarouselSlide');
    return saved ? parseInt(saved) : 0;
  });

  const heroImages = [
    'https://i.postimg.cc/tCDw1btR/IMG_0737.jpg',
    'https://i.postimg.cc/4xfGMwwv/IMG_0688.jpg',
    'https://i.postimg.cc/D0PDPk9x/IMG_0725.jpg',
    'https://i.postimg.cc/4yRk11nr/IMG_0704.jpg',
    'https://i.postimg.cc/1RDZ3bj3/IMG_0707.jpg',
    'https://i.postimg.cc/L6TKzLRq/IMG_0716.jpg',
    'https://i.postimg.cc/hjxNh7pG/IMG_0719.jpg',
    'https://i.postimg.cc/wMpZNTGk/IMG_0723.jpg,',
    'https://i.postimg.cc/VLz2LvM8/IMG_0732.jpg'
  ];

  // Save current slide to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('globalCarouselSlide', currentSlide.toString());
  }, [currentSlide]);

  // Auto rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const carouselValue = {
    currentSlide,
    setCurrentSlide,
    heroImages,
    totalSlides: heroImages.length
  };

  return (
    <CarouselContext.Provider value={carouselValue}>
      {children}
    </CarouselContext.Provider>
  );
}

export default function App() {
  const [appData, setAppData] = useState({
    menu: [],
    rooms: [],
    roomImages: [],
    images: [],
    offers: [],
    reviews: [],
    loading: true,
    error: null
  });

  const [showLoader, setShowLoader] = useState(true);

  // Fetch all data once when app loads
  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        const [
          menuRes, 
          roomsRes, 
          roomImagesRes, 
          imagesRes, 
          offersRes, 
          reviewsRes
        ] = await Promise.allSettled([
          api({ action: "get", sheet: "menu" }),
          api({ action: "get", sheet: "rooms" }),
          api({ action: "get", sheet: "roomImages" }),
          api({ action: "get", sheet: "images" }),
          api({ action: "get", sheet: "offers" }),
          api({ action: "get", sheet: "reviews" })
        ]);

        if (isMounted) {
          setAppData({
            menu: menuRes.status === 'fulfilled' ? (menuRes.value?.slice(1) || []) : [],
            rooms: roomsRes.status === 'fulfilled' ? (roomsRes.value?.slice(1) || []) : [],
            roomImages: roomImagesRes.status === 'fulfilled' ? (roomImagesRes.value?.slice(1) || []) : [],
            images: imagesRes.status === 'fulfilled' ? (imagesRes.value?.slice(1) || []) : [],
            offers: offersRes.status === 'fulfilled' ? (offersRes.value?.slice(1) || []) : [],
            reviews: reviewsRes.status === 'fulfilled' ? (reviewsRes.value?.slice(1) || []) : [],
            loading: false,
            error: null
          });
        }
      } catch (error) {
        console.error("Failed to fetch app data:", error);
        if (isMounted) {
          setAppData(prev => ({
            ...prev,
            loading: false,
            error: "Failed to load data. Please refresh the page."
          }));
        }
      }
    };

    fetchAllData();

    // Exact 3 second loader time
    const LOADER_DURATION = 6000;
    
    const timer = setTimeout(() => {
      if (isMounted) {
        setShowLoader(false);
      }
    }, LOADER_DURATION);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Group room images by roomId
  const imagesByRoomId = {};
  appData.roomImages.forEach(img => {
    const roomId = img[1];
    if (!imagesByRoomId[roomId]) imagesByRoomId[roomId] = [];
    imagesByRoomId[roomId].push(img[2]);
  });

  // Group menu by category
  const menuByCategory = {};
  appData.menu.forEach(item => {
    const category = item[1] || "Uncategorized";
    if (!menuByCategory[category]) menuByCategory[category] = [];
    menuByCategory[category].push(item);
  });

  // Filter active offers
  const activeOffers = appData.offers.filter(offer => offer[3] === "active");

  // Prepare data object to pass to context
  const contextValue = {
    ...appData,
    imagesByRoomId,
    menuByCategory,
    activeOffers,
    refreshData: () => {
      // This function can be implemented later if needed
      console.log('Refresh data function called');
    }
  };

  // Show loader for exactly 3 seconds
  if (showLoader) {
    return <LoadingScreen />;
  }

  return (
    <DataContext.Provider value={contextValue}>
      <CarouselProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CarouselProvider>
    </DataContext.Provider>
  );
}