import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Find the scrollable container (your main area)
    const mainContent = document.getElementById("main-content");

    // Wait for layout to settle, then scroll to top
    requestAnimationFrame(() => {
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: "auto" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
