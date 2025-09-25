import { memo } from "react";
import LeagueCard from "./LeagueCard.tsx";
import SearchBar from "./SearchBar.tsx";
import SportFilter from "./SportFilter.tsx";
import LoadingSkeleton from "./LoadingSkeleton.tsx";
import { useLeagues } from "../hooks/useLeagues.ts";

const LeaguesList = memo(() => {
  const {
    leagues,
    filteredLeagues,
    uniqueSports,
    searchTerm,
    selectedSport,
    isLoading,
    error,
    handleSearchChange,
    handleSportChange,
    refetch,
  } = useLeagues();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Search and Filter Controls - Loading State */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-full sm:w-64">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        {/* Results Info - Loading State */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>

        {/* Loading Skeleton */}
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="text-gray-700 text-lg font-semibold mb-2">
            Failed to load leagues
          </div>
          <div className="text-gray-500 mb-4">Please try again later</div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>
        <div className="w-full sm:w-64">
          <SportFilter
            sports={uniqueSports}
            selectedSport={selectedSport}
            onSportChange={handleSportChange}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
        <div className="text-sm text-gray-700 font-medium">
          {filteredLeagues.length === leagues.length
            ? `Showing all ${leagues.length} leagues`
            : `Showing ${filteredLeagues.length} of ${leagues.length} leagues`}
        </div>
      </div>

      {/* Leagues Grid */}
      {filteredLeagues.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-gray-700 text-lg font-semibold mb-2">
              No leagues found
            </div>
            <div className="text-gray-500 mb-4">
              Try adjusting your search or filter
            </div>
            {(searchTerm || selectedSport) && (
              <button
                onClick={() => {
                  handleSearchChange('');
                  handleSportChange('');
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeagues.map((league) => (
            <LeagueCard key={league.idLeague} league={league} />
          ))}
        </div>
      )}
    </div>
  );
});

LeaguesList.displayName = 'LeaguesList';

export default LeaguesList;