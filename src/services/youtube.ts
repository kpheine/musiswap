import axios, { AxiosResponse } from 'axios';
import { googleApiKey } from '../settings';
import { TrackData } from '../App';

function searchRequest(
  token: string,
  query: string,
): Promise<AxiosResponse<any>> {
  const convertedQuery: string = encodeURIComponent(query);
  const url: string = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${convertedQuery}&safeSearch=none&type=video&key=${googleApiKey}`;

  return axios.request({
    method: 'GET',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
}

function addTrack(token: string, track: TrackData, playlistId: string) {
  const query = `${track.artist} ${track.name}`;
  searchRequest(token, query).then((res: AxiosResponse) => {
    const videoId: string = res.data.items[0].id.videoId;
    addVideoToPlaylist(token, videoId, playlistId).then((res) => {
      console.log('eita porra eita caralho vai la ver');
    });
  });
}

function addVideoToPlaylist(
  token: string,
  videoCode: string,
  playListCode: string,
) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${googleApiKey}`;
  return axios.request({
    method: 'POST',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    data: {
      snippet: {
        playlistId: playListCode,
        resourceId: {
          kind: 'youtube#video',
          videoId: videoCode,
        },
      },
    },
  });
}

function addPlaylist(token: string, name: string) {
  const url: string = `https://www.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus&key=${googleApiKey}`;

  return axios.request({
    method: 'POST',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    data: {
      snippet: {
        title: name,
        description: 'Converted playlist from Spotify',
        tags: ['API Call', 'Musiswap', 'Music'],
      },
      privacyStatus: 'public',
    },
  });
}

export { searchRequest, addPlaylist, addTrack };
