import axios from './axios-config';
import { DiscoverMovieResponse } from './types';

export class TMDB {
  __apiKey: string;

  constructor(apiKey: string) {
    this.__apiKey = apiKey;
  }

  async discoverMovie(language = 'en-US', additionalParams: any = {}) {
    try {
      const res = await axios.get<DiscoverMovieResponse>('/discover/movie', {
        params: {
          api_key: this.__apiKey,
          language,
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
          page: 1,
          ...additionalParams,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
