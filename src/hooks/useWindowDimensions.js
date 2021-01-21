import { useEffect, useState } from "react";

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
  }, []);

  const updateWindowDimensions = () => {
    setWindowDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  return windowDimensions;
};