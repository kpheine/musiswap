import axios from 'axios';

function getUserInfos(token: string) {
  return axios.request({
    method: 'get',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

interface MusicInfo {
  name: string;
  artist: string;
}

function getLikedMusic() {}

async function likedTracksRequest(token: string, url: string) {
  return axios.request({
    method: 'get',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getUserInfos, getLikedMusic, likedTracksRequest };
