'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function DateSince({ initialSince }: { initialSince: string | undefined }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSinceChange = (value: string) => {
    console.log(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('since', value);
    } else {
      params.delete('since');
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center">
      <label htmlFor="since">Since</label>
      <input
        type='datetime-local'
        id="since"
        name="since"
        defaultValue={initialSince}
        onChange={(e) => handleSinceChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}