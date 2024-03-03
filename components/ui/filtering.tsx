'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Filtering() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  

  const handleFilterChange = (value: string) => {
    console.log(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('state', value);
    } else {
      params.delete('state');
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center">
      <label htmlFor="filter">Filter</label>
      <select
        id="filter"
        name="filter"
        defaultValue=""
        onChange={(e) => handleFilterChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  );
}