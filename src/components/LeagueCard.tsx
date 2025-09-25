import { useState, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { League, BadgeApiResponse } from "../types/index.ts";
import BadgeModal from "./BadgeModal.tsx";

interface LeagueCardProps {
  league: League;
}

const fetchSeasonBadge = async (leagueId: string): Promise<string | null> => {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch season badge");
  }
  const data: BadgeApiResponse = await response.json();
  return data.seasons && data.seasons.length > 0
    ? data.seasons[0].strBadge
    : null;
};

const LeagueCard = memo(({ league }: LeagueCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [shouldFetchBadge, setShouldFetchBadge] = useState(false);

  const { data: badgeUrl, isLoading: badgeLoading } = useQuery({
    queryKey: ["badge", league.idLeague],
    queryFn: () => fetchSeasonBadge(league.idLeague),
    enabled: shouldFetchBadge, // Only fetch when badge is requested
  });

  const handleCardClick = () => {
    setShouldFetchBadge(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-lg border border-gray-300 p-6 hover:shadow-xl hover:border-gray-400 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        onClick={handleCardClick}
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
              {league.strLeague}
            </h3>
            {league.strLeagueAlternate &&
              league.strLeagueAlternate !== league.strLeague && (
                <p className="text-sm text-gray-500 mt-1">
                  {league.strLeagueAlternate}
                </p>
              )}
          </div>

          <div className="flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
              {league.strSport}
            </span>
          </div>

          <div className="text-xs text-gray-500 text-center mt-2">
            Click to view season badge
          </div>
        </div>
      </div>

      <BadgeModal
        isOpen={showModal}
        onClose={handleCloseModal}
        leagueName={league.strLeague}
        badgeUrl={badgeUrl || null}
        isLoading={badgeLoading}
      />
    </>
  );
});

LeagueCard.displayName = "LeagueCard";

export default LeagueCard;
