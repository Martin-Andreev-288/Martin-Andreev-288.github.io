import { useState, useEffect } from "react";

const useLoading = (delay: number = 500) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading;
};

export default useLoading;
