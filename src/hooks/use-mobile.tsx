
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Set initial state based on current width
    const checkMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(checkMobile());

    // Use a debounced resize handler for performance
    let resizeTimer: number;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setIsMobile(checkMobile());
      }, 100);
    };

    // Use matchMedia for better performance
    try {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      // Modern browsers
      if (mql.addEventListener) {
        mql.addEventListener("change", handleResize);
      } 
      // Legacy browsers
      else if (mql.addListener) {
        mql.addListener(handleResize);
      } 
      // Fallback
      else {
        window.addEventListener("resize", handleResize);
      }

      return () => {
        if (mql.removeEventListener) {
          mql.removeEventListener("change", handleResize);
        } else if (mql.removeListener) {
          mql.removeListener(handleResize);
        } else {
          window.removeEventListener("resize", handleResize);
        }
        if (resizeTimer) clearTimeout(resizeTimer);
      };
    } catch (e) {
      // Fallback for older browsers
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        if (resizeTimer) clearTimeout(resizeTimer);
      };
    }
  }, []);

  return !!isMobile;
}
