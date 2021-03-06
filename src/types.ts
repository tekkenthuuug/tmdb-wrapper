export interface Config {
  apiKey: string;
  defaultPosterSize?: PosterSizes;
  defaultBackdropSize?: BackdropSizes;
}

export interface BaseItem {
  poster_path?: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
}

export interface Genre {
  id?: number;
  name?: string;
}

export interface ProductionCompany {
  name?: string;
  id?: number;
  logo_path?: string;
  origin_country?: string;
}

export interface ProductionCountry {
  name?: string;
  iso_3166_1?: string;
}

export interface SpokenLanguage {
  iso_639_1?: string;
  name?: string;
}

export type EntertainmentStatus = 'Rumored' | 'Planned' | 'in Production' | 'Post Production' | 'Released' | 'Canceled';

export interface Collection<T> {
  id: number;
  name: string;
  overview: string;
  poster_path: null | string;
  backdrop_path: string;
  parts: T[];
}

export type MovieCollection = Collection<Movie>;

export interface Movie extends BaseItem {
  original_title?: string;
  title?: string;
}

export interface BaseDetails extends BaseItem {
  belongs_to_collection?: null | MovieCollection;
  budget?: number;
  genres?: Genre[];
  homepage?: string | null;
  imdb_id?: string;
  production_companies?: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: SpokenLanguage[];
  status?: EntertainmentStatus;
  tagline?: string | null;
}

export interface CastMember {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: string;
}

export interface Credits {
  cast: CastMember[];
}

export interface MovieDetails extends BaseDetails {
  original_title?: string;
  title?: string;
  credits?: Credits;
}

export interface NormalizedMovieDetails extends BaseDetails {
  original_name?: string;
  name?: string;
}

export interface NormalizedMovie extends BaseItem {
  original_name?: string;
  name?: string;
}

export interface TVSeries extends NormalizedMovie {}

export interface TVEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TVSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
export interface TVSeriesDetails extends BaseDetails {
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  last_air_date: string;
  last_episode_air: TVEpisode;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: TVSeason;
  type: string;
  original_name?: string;
  name?: string;
}

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

export interface SearchParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
  year?: number;
  primary_release_year?: number;
  sort_by?: string;
}
