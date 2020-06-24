import axios from './axios-config';
import {
  DiscoverResponse,
  PosterSizes,
  BackdropSizes,
  Movie,
  TVSeries,
  NormalizedMovie,
  BaseItem,
  Config,
  SearchParams,
  MovieDetails,
} from './types';

export class TMDB {
  __apiKey: string;
  _imageBaseUrl: string = 'https://image.tmdb.org/t/p/';
  defaultPosterSize: PosterSizes;
  defaultBackdropSize: BackdropSizes;

  constructor(config: Config) {
    this.__apiKey = config.apiKey;
    this.defaultBackdropSize = config.defaultBackdropSize || 'w780';
    this.defaultPosterSize = config.defaultPosterSize || 'w342';
  }

  _convertImageUrls = (data: any[], posterSize: PosterSizes, backdropSize: BackdropSizes) => {
    return data.map(result => {
      return {
        ...result,
        poster_path: result.poster_path && this._imageBaseUrl + posterSize + result.poster_path,
        backdrop_path: result.backdrop_path && this._imageBaseUrl + backdropSize + result.backdrop_path,
      };
    });
  };

  normalizeMovies = (movies: any[]): NormalizedMovie[] => {
    return movies.map(movie => {
      const { original_title, title, ...otherMovieProperties } = movie;
      return {
        ...otherMovieProperties,
        original_name: original_title,
        name: title,
      };
    });
  };

  async discover(
    type: 'movie' | 'tv',
    posterSize = this.defaultPosterSize,
    backdropSize = this.defaultBackdropSize,
    additionalParams: any = {}
  ) {
    const res = await axios.get<DiscoverResponse>(`/discover/${type}`, {
      params: {
        api_key: this.__apiKey,
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        page: 1,
        ...additionalParams,
      },
    });

    const results = type === 'movie' ? this.normalizeMovies(res.data.results) : res.data.results;

    return this._convertImageUrls(results, posterSize, backdropSize);
  }

  async search(
    type: 'movie' | 'tv',
    searchParams: SearchParams,
    posterSize = this.defaultPosterSize,
    backdropSize = this.defaultBackdropSize
  ) {
    const res = await axios.get<DiscoverResponse>(`/search/${type}`, {
      params: {
        api_key: this.__apiKey,
        ...searchParams,
      },
    });

    const results = type === 'movie' ? this.normalizeMovies(res.data.results) : res.data.results;

    return this._convertImageUrls(results, posterSize, backdropSize);
  }

  async getMovieDetailsById(id: number, posterSize = this.defaultPosterSize, backdropSize = this.defaultBackdropSize) {
    const res = await axios.get<MovieDetails>(`/movie/${id}`, {
      params: {
        api_key: this.__apiKey,
      },
    });

    const result = this.normalizeMovies([res.data]);

    return this._convertImageUrls(result, posterSize, backdropSize);
  }
}
