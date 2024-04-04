import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler function for window resize event
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Cleanup function for useEffect (remove event listener)
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to check screen size based on breakpoints
  const isSize = (size: 'md' | 'lg' | 'sm' | 'xl' | 'xxl') => {
    const { width } = windowSize; // Destructure width from windowSize

    if (!width) return false; // Handle initial render or missing width

    const breakpoints = {
      sm: 640,
      md: 768, // Adjust these values as needed for your project
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    };

    switch (size) {
      case 'md':
        return width >= breakpoints.md;
      case 'lg':
        return width >= breakpoints.lg;
      case 'sm':
        return width < breakpoints.md;
      case 'xxl':
        return width >= breakpoints.xxl;
      case 'xl':
        return width >= breakpoints.xl; // Anything smaller than medium
      default:
        // Add more cases for other sizes (xs, xl, etc.)
        return false;
    }
  };

  return { isSize };
}

export default useWindowSize;
