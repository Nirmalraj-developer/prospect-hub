import { useState, useEffect } from "react";
import HomePage1 from "./HomePage1";
import HomePage2 from "./HomePage2";

export default function HomePage() {
  const [layoutMode, setLayoutMode] = useState<'homepage1' | 'homepage2'>('homepage1');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('homeLayoutMode') as 'homepage1' | 'homepage2';
    if (savedMode) setLayoutMode(savedMode);
    setIsLoaded(true);

    const handleStorageChange = () => {
      const newMode = localStorage.getItem('homeLayoutMode') as 'homepage1' | 'homepage2';
      if (newMode) setLayoutMode(newMode);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('homeLayoutChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('homeLayoutChanged', handleStorageChange);
    };
  }, []);

  if (!isLoaded) return null; // Avoid flash

  return layoutMode === 'homepage2' ? <HomePage2 /> : <HomePage1 />;
}
