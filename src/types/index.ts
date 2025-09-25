export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export interface SeasonBadge {
  strBadge: string;
  strSeason: string;
}

export interface LeaguesApiResponse {
  leagues: League[];
}

export interface BadgeApiResponse {
  seasons: SeasonBadge[];
}
