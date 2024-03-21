'use client'

import { Button } from "../button";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ResetToolbar({ handleReset }: { handleReset: () => void }){
  
  return (
    <Button onClick={handleReset} className="bg-gray-500 hover:bg-gray-400 active:bg-gray-600 pl-2 pr-4">
      <XMarkIcon className="h-4 w-4" />
      Reset
    </Button>
  )
}