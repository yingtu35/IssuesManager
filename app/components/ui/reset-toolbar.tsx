'use client'

import { Button } from "./button";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ResetToolbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    // delete all params
    params.forEach((_, key) => {
      params.delete(key);
    })
    replace(`${pathname}`)
  }
  return (
    <Button onClick={handleReset} className="bg-gray-500 hover:bg-gray-400 active:bg-gray-600 pl-2 pr-4">
      <XMarkIcon className="h-4 w-4" />
      Reset
    </Button>
  )
}