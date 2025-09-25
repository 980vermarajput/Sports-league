import { useState, useEffect, memo } from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = memo(({ searchTerm, onSearchChange }: SearchBarProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, onSearchChange]);

  // Sync with external searchTerm changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search leagues..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 shadow-sm"
      />
      {localSearchTerm && (
        <button
          onClick={() => setLocalSearchTerm("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <svg
            className="h-4 w-4 text-gray-500 hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
