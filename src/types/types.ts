export interface Equipe {
  id: number;
  name: string;
  season_id: number;
  season_name: string;
  logo_url?: string;
  franchise_name: string;
  structure_name?: string;
}

export interface Joueur {
  id: number;
  team_id: number;
  gamertag: string;
  role: string;
  team_name?: string;
  first_name?: string;
  last_name?: string;
  birth_country?: string;
  birth_date?: string;
}

export interface Saison {
  id: number;
  name: string;
  start_date: string | null;
  end_date: string | null;
}