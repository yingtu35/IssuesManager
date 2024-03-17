'use client';
 
import { useEffect } from 'react';
import { GoBackButton, TryAgainButton } from '@/app/components/ui/issues/buttons';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Error fetching repository info...</h2>
      <div className="flex gap-2">
        <GoBackButton />
        <TryAgainButton reset={reset} />
      </div>
    </main>
  );
}