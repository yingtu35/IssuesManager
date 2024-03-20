'use client'

import { on } from "events";

export default function Direction({ 
  sort,
  onSortChange,
 }: { 
  sort: string | undefined,
  onSortChange: (type: string, value: string) => void
  }) {
  

  function handleSortingChange(value: string) {
    onSortChange('sort', value);
  }

  return (
    <div className="flex items-center">
      <select
        id="sorting"
        name="sorting"
        value={sort}
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