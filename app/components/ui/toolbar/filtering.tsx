'use client'

export default function Filtering({ 
  state,
  onStateChange, 
}: {
  state: string | undefined,
  onStateChange: (type: string, value: string) => void
}) {
  function handleFilterChange(value: string) {
    onStateChange('state', value);
  }

  return (
    <div className="flex items-center">
      <select
        id="filter"
        name="filter"
        value={state}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option hidden>Filter by</option>
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  );
}