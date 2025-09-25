import { memo } from "react";

interface SportFilterProps {
  sports: string[];
  selectedSport: string;
  onSportChange: (sport: string) => void;
}

const SportFilter = memo(
  ({ sports, selectedSport, onSportChange }: SportFilterProps) => {
    return (
      <div className="relative">
        <select
          value={selectedSport}
          onChange={(e) => onSportChange(e.target.value)}
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 appearance-none pr-10 shadow-sm font-medium text-gray-700"
        >
          <option value="">All Sports</option>
          {sports.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  }
);

SportFilter.displayName = "SportFilter";

export default SportFilter;
