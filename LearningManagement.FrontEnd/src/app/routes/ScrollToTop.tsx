import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // If navigating to a hash link (e.g., /#section)
    if (location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
          // Scroll to the hash element with smooth behavior
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // If hash element not found, scroll to top
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      }, 100);
      return;
    }

    // Smooth scroll to top for better UX
    // Uses native browser API with fallback for older browsers
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // Smooth scrolling for better UX
      });
    } catch (error) {
      // Fallback for older browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]); // Trigger on pathname or hash changes

  return null;
};

export default ScrollToTop;

