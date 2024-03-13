'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Direction({ initialSort }: { initialSort: string | undefined }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSortingChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('sorting', value);
    } else {
      params.delete('sorting');
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center">
      <select
        id="sorting"
        name="sorting"
        defaultValue={initialSort}
        onChange={(e) => handleSortingChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option hidden>Sort by</option>
        <option value="created">Created</option>
        <option value="updated">Updated</option>
        <option value="comments">Comments</option>
      </select>
    </div>
  );
}