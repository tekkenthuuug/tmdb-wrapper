import axios from './axios-config';
import { DiscoverResponse, PosterSizes, BackdropSizes } from './types';

export class TMDB {
  __apiKey: string;
  _imageBaseUrl: string = 'https://image.tmdb.org/t/p/';
  defaultPosterSize: PosterSizes;
  defaultBackdropSize: BackdropSizes;

  constructor(apiKey: string, defaultPosterSize: PosterSizes = 'w500', defaultBackdropSize: BackdropSizes = 'w780') {
    this.__apiKey = apiKey;
    this.defaultBackdropSize = defaultBackdropSize;
    this.defaultPosterSize = defaultPosterSize;
  }

  _convertImageUrls = (data: DiscoverResponse, posterSize: PosterSizes, backdropSize: BackdropSizes) => {
    return data.results.map(result => {
      return {
        ...result,
        poster_path: result.poster_path && this._imageBaseUrl + posterSize + result.poster_path,
        backdrop_path: result.backdrop_path && this._imageBaseUrl + backdropSize + result.backdrop_path,
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
    return this._convertImageUrls(res.data, posterSize, backdropSize);
  }
}
