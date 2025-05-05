
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(() => {
    // Only run on client side, return default during SSR
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    // Don't run in SSR
    if (typeof window === 'undefined') return;
    
    // Memoize the check function
    const checkMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
    
    // Set initial state based on window width
    setIsMobile(checkMobile());

    // Use matchMedia for better performance (reduces reflows)
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Create one handler function that we'll use for both approaches
    const handleMediaChange = (e?: MediaQueryListEvent) => {
      setIsMobile(e ? e.matches : checkMobile());
    };
    
    // Modern browsers - addEventListener is more efficient
    if (mql.addEventListener) {
      mql.addEventListener("change", handleMediaChange);
      return () => mql.removeEventListener("change", handleMediaChange);
    } 
    // Legacy browsers - addListener fallback
    else if (mql.addListener) {
      mql.addListener(handleMediaChange);
      return () => mql.removeListener(handleMediaChange);
    } 
    // Last resort - use resize event (less efficient)
    else {
      // Use passive event listener for better performance
      window.addEventListener("resize", () => {
        // Debounce resize events for better performance
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(() => {
            handleMediaChange();
          });
        } else {
          handleMediaChange();
        }
      }, { passive: true });
      
      return () => {
        window.removeEventListener("resize", handleMediaChange);
      };
    }
  }, []);

  return isMobile;
}
