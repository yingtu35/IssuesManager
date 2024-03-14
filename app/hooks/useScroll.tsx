'use client'

import { useState, useEffect } from "react"
import { useDebouncedCallback } from "use-debounce";

export default function useScroll() {
  const viewHeight = window.innerHeight;
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const showBackToTop = scrollPosition > viewHeight;

  const handleScroll = useDebouncedCallback(() => {
      setScrollPosition(window.scrollY);
  }, 100);

  function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return { showBackToTop, scrollToTop };
}
