import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import type { League, LeaguesApiResponse } from "../types/index.ts";

const fetchLeagues = async (): Promise<League[]> => {
  const response = await fetch(
    "https://www.thesportsdb.com/api/v1/json/3/all_leagues.php"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch leagues");
  }
  const data: LeaguesApiResponse = await response.json();
  return data.leagues || [];
};

export const useLeagues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("");

  const {
    data: leagues = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["leagues"],
    queryFn: fetchLeagues,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Extract unique sports for the filter dropdown
  const uniqueSports = useMemo(() => {
    const sports = leagues.map((league) => league.strSport).filter(Boolean);
    return [...new Set(sports)].sort();
  }, [leagues]);

  // Filter leagues based on search term and selected sport
  const filteredLeagues = useMemo(() => {
    return leagues.filter((league) => {
      const matchesSearch =
        league.strLeague.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (league.strLeagueAlternate &&
          league.strLeagueAlternate
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));
      const matchesSport = !selectedSport || league.strSport === selectedSport;
      return matchesSearch && matchesSport;
    });
  }, [leagues, searchTerm, selectedSport]);

  // Memoized handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleSportChange = useCallback((sport: string) => {
    setSelectedSport(sport);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedSport("");
  }, []);

  return {
    // Data
    leagues,
    filteredLeagues,
    uniqueSports,

    // State
    searchTerm,
    selectedSport,
    isLoading,
    error,

    // Actions
    handleSearchChange,
    handleSportChange,
    clearFilters,
    refetch,
  };
};
