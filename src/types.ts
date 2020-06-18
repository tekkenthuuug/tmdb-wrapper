export interface Movie {
  poster_path?: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];
  id?: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
}

export interface TVSeries extends Movie {}

export type BackdropSizes = 'w300' | 'w780' | 'w1280' | 'original';
export type LogoSizes = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
export type PosterSizes = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w870' | 'original';
export type ProfileSizes = 'w45' | 'w185' | 'h632' | 'original';
export type StillSizes = 'w92' | 'w185' | 'w300' | 'original';

export interface DiscoverResponse {
  page: number;
  results: Movie[] | TVSeries[];
  total_result: number;
  total_pages: number;
}
