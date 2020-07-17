import React, { useState } from 'react';
import './youtube.css';
import { googleClientId } from '../../settings';
import { TrackData } from '../../App';
import { addTrack, addPlaylist } from '../../services/youtube';

import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { FaYoutube } from 'react-icons/fa';
import { AxiosResponse } from 'axios';

interface User {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
}

type youtubeProps = {
  tracks: Array<TrackData>;
};

type YoutubeAddPlaylistResponse = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    tags: Array<string>;
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
  };
  status: {
    privacyStatus: string;
  };
};

function Youtube(props: youtubeProps) {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [photoLoaded, setPhotoLoaded] = useState<boolean>(false);

  const importTracks = () => {
    const playlistName: string = 'Musiswap';
    const miniList = props.tracks.slice(0, 11);
    addPlaylist(token, playlistName).then(
      (res: AxiosResponse<YoutubeAddPlaylistResponse>) => {
        const playlistCode = res.data.id;
        miniList.forEach((item, index) => {
          addTrack(token, item, playlistCode);
        });
      },
    );
  };

  //Callback from Google login (god I hate so much union types)
  const successCallback = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline,
  ): any => {
    setUser((res as GoogleLoginResponse).profileObj);
    setToken(
      (res as GoogleLoginResponse).accessToken ||
        (res as GoogleLoginResponseOffline).code,
    );
    setImageUrl((res as GoogleLoginResponse).profileObj.imageUrl);
  };

  return (
    <div className='youtube-root neumorph-in'>
      <FaYoutube
        className={`icon-youtube ${photoLoaded ? 'icon-out' : ''}`}
        size={100}
      />
      <img
        src={imageUrl}
        height='100px'
        className={`${photoLoaded ? 'avatar' : ''} avatar-in`}
        alt={user?.name}
        onLoad={() => setPhotoLoaded(true)}
      />
      <p>{user ? `You're set, ${user.givenName}` : null}</p>
      {token ? (
        props.tracks.length > 0 ? (
          <button className={'loginButton neumorph'} onClick={importTracks}>
            Import selected tracks
          </button>
        ) : (
          <div />
        )
      ) : (
        <GoogleLogin
          clientId={googleClientId}
          onSuccess={successCallback}
          onFailure={(err) => {
            console.log(err);
          }}
          isSignedIn={false}
          cookiePolicy={'single_host_origin'}
          render={(renderProps) => (
            <button
              className={'loginButton neumorph'}
              onClick={renderProps.onClick}
            >
              Login Google
            </button>
          )}
          scope={'https://www.googleapis.com/auth/youtube'}
        />
      )}
    </div>
  );
}

export default Youtube;
