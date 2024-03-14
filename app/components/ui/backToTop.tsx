'use client'

import useScroll from "@/app/hooks/useScroll";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function BackToTop() {
    const { showBackToTop, scrollToTop } = useScroll();
    return (
     showBackToTop && (
      <div 
        className="fixed bottom-4 right-4 z-50 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1 p-2 bg-gray-300 rounded-full shadow-md"
        onClick={scrollToTop}
      >
        <ChevronUpIcon className="h-8 w-8" />
        <p>Top</p>
      </div>
      )
    )
}