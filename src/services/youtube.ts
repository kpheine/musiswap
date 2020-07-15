import axios from 'axios';
import { googleApiKey } from '../settings';

function searchRequest(token: string, query: string) {
  const convertedQuery: string = encodeURIComponent(query);
  const url: string = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${convertedQuery}&safeSearch=none&type=video&key=${googleApiKey}`;

  return axios.request({
    method: 'get',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
}

export { searchRequest };
