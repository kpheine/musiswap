import React, { useState } from 'react';
import './youtube.css';
import { googleClientId } from '../../settings';
import { TrackData } from '../../App';
import { searchRequest } from '../../services/youtube';

import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { FaYoutube } from 'react-icons/fa';

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

function Youtube(props: youtubeProps) {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [photoLoaded, setPhotoLoaded] = useState<boolean>(false);

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
      <p>{user ? `You're set, ${user.name}` : 'User not logged'}</p>
      {token ? null : (
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
        />
      )}
      <button
        onClick={() => {
          console.log(props.tracks);
          console.log(token);
          searchRequest(
            token,
            // @ts-ignore
            `${props.tracks.artist} ${props.tracks.name}`,
          ).then((res) => {
            console.log(res);
          });
        }}
      >
        search one track
      </button>
    </div>
  );
}

export default Youtube;
