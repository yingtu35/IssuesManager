'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Sorting() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSortingChange = (value: string) => {
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
      <label htmlFor="sorting">Sort by</label>
      <select
        id="sorting"
        name="sorting"
        defaultValue=""
        onChange={(e) => handleSortingChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="desc">new to old</option>
        <option value="asc">old to new</option>
      </select>
    </div>
  );
}