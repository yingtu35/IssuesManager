'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Direction({ initialDirection }: { initialDirection: string | undefined }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleDirectionChange = (value: string) => {
    console.log(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('direction', value);
    } else {
      params.delete('direction');
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center">
      <label htmlFor="direction">Order</label>
      <select
        id="direction"
        name="direction"
        defaultValue={initialDirection}
        onChange={(e) => handleDirectionChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="desc">new to old</option>
        <option value="asc">old to new</option>
      </select>
    </div>
  );
}