import { TMDB } from './index';

const tmdb = new TMDB({ apiKey: 'ecd9f7ecba61ed7a9bdc1f127975097d' });

tmdb.discover('tv').then(data => {
  console.log(data);
});
