import React, { useState } from 'react';
import './youtube.css';
import { googleClientId } from '../../settings';
import { TrackData, LoadingStats } from '../../App';
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
  setLoadingStats: React.Dispatch<
    React.SetStateAction<LoadingStats | undefined>
  >;
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

  /*
  I had to add single tracks instead of a batch because Youtube API
  is inconsistent when using multiple requests at once. This slow
  down the process a lot, but Google doesn't really care about
  other developers
  */
  const importTracks = async () => {
    const playlistName: string = 'Musiswap';
    const convertList = props.tracks;
    await addPlaylist(token, playlistName)
      .then(async (res: AxiosResponse<YoutubeAddPlaylistResponse>) => {
        const playlistCode = res.data.id;
        const totalTracks = convertList.length;
        for (const i in convertList) {
          const index = parseInt(i);
          props.setLoadingStats(() => {
            return {
              rate: index / totalTracks,
              label: `Loading ${convertList[index].artist} - ${convertList[index].name}`,
            };
          });
          const response = await addTrack(token, convertList[i], playlistCode);
          console.log(response);
        }
        props.setLoadingStats(() => {
          return {
            rate: 1,
            label: 'Complete! Check your "Musiswap" playlist on YouTube!',
          };
        });
      })
      .catch((error) => {
        props.setLoadingStats((prevState) => {
          return {
            rate: prevState?.rate || 0,
            label: 'For some reason the loading failed, try again later',
          };
        });
      });
  };

  /*
  Callback from Google login, got in a lot of trouble trying to
  implement this with typescript
  */
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
