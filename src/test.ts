import { TMDB } from './index';

const tmdb = new TMDB('ecd9f7ecba61ed7a9bdc1f127975097d');

tmdb.discoverMovie().then(data => {
  console.log(data);
});
