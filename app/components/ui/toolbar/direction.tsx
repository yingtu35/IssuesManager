'use client'

export default function Direction({ 
  direction,
  onDirectionChange,
  }: { 
  direction: string | undefined,
  onDirectionChange: (type: string, value: string) => void
  }) {

  function handleDirectionChange(value: string) {
    onDirectionChange('direction', value);
  }

  return (
    <div className="flex items-center">
      <select
        id="direction"
        name="direction"
        value={direction}
        onChange={(e) => handleDirectionChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option hidden>Order by</option>
        <option value="desc">new to old</option>
        <option value="asc">old to new</option>
      </select>
    </div>
  );
}