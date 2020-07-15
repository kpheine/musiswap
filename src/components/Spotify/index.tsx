import React, { useState, useEffect } from 'react';
import './spotify.css';
import { getUserInfos, likedTracksRequest } from '../../services/spotify';
import YesIMadeAProgressBarSoWhat from '../YesIMadeAProgressBarSoWhat';
import { TrackData } from '../../App';

//@ts-ignore
import SpotifyLogin from 'react-spotify-login';
import { spotifyClientId } from '../../settings.js';

import { FaSpotify } from 'react-icons/fa';

interface Token {
  access_token: string;
  token_type: string;
  expires_in: string;
}

type SpotifyProps = {
  setTracks: Function;
};

function Spotify(props: SpotifyProps) {
  const [token, setToken] = useState<Token>();
  const [name, setName] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [photoLoaded, setPhotoLoaded] = useState<Boolean>(false);
  const [loadingMusic, setLoadingMusic] = useState<Boolean>(false);
  const [loadingMusicRate, setLoadingMusicRate] = useState<number>(0);
  const [trackList, setTrackList] = useState<Array<TrackData>>([]);

  const endpointUrl = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50';
  const localUrl = window.location.origin;

  useEffect(() => {
    return props.setTracks(trackList);
  }, [loadingMusic]);

  const getMusic = () => {
    setLoadingMusic(true);
    requestHandler(endpointUrl);
  };

  const requestHandler = (url: string) => {
    likedTracksRequest(token?.access_token || '', url).then((res) => {
      let tempList: Array<TrackData> = [];
      const data: SpotifyApi.UsersSavedTracksResponse = res.data;
      data.items.map((item) => {
        const newData: TrackData = {
          name: item.track.name,
          artist: item.track.artists[0].name,
        };
        tempList.push(newData);
      });

      setTrackList((prevState) => {
        const newList: Array<TrackData> = [...prevState, ...tempList];
        return newList;
      });
      setLoadingMusicRate((data.offset + data.items.length) / data.total);

      data.next ? requestHandler(data.next) : setLoadingMusic(false);
    });
  };

  return (
    <div className='spotifyRoot neumorph-in'>
      <FaSpotify
        className={`icon ${photoLoaded ? 'icon-out' : ''}`}
        size={100}
      />
      <img
        src={imageUrl}
        height='100px'
        className={`${photoLoaded ? 'avatar' : ''} avatar-in`}
        alt={name}
        onLoad={() => setPhotoLoaded(true)}
      />
      <p>{!name ? null : `Welcome ${name}!`}</p>
      {!token ? (
        <SpotifyLogin
          className='sbutton neumorph'
          clientId={spotifyClientId}
          redirectUri={localUrl}
          onSuccess={(e: Token) => {
            setToken(e);
            getUserInfos(e.access_token).then((res) => {
              setName(res.data.display_name);
              setImageUrl(res.data.images[0].url);
            });
          }}
          onFailure={(e: any) => console.log(e)}
          scope='user-library-read'
        >
          Login Spotify
        </SpotifyLogin>
      ) : loadingMusic ? (
        <YesIMadeAProgressBarSoWhat
          color='#1db954'
          rate={loadingMusicRate}
        ></YesIMadeAProgressBarSoWhat>
      ) : trackList.length === 0 ? (
        <button className='sbutton neumorph' onClick={getMusic}>
          Load my liked tracks{' '}
        </button>
      ) : (
        <span>{`${trackList.length} tracks selected`}</span>
      )}
      {/* <YesIMadeAProgressBarSoWhat
        color='#1db954'
        rate={0.5}
      ></YesIMadeAProgressBarSoWhat> */}
    </div>
  );
}

export default Spotify;
