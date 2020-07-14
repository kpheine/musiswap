import React, { useState } from 'react';
import './youtube.css';
import { googleClientId } from '../../settings';

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

const LoginButton = (props: any) => {
  return <button className={'loginButton neumorph'}>Login Google</button>;
};

function Youtube() {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<User>();

  //Callback from Google login (god I hate so much union types)
  const successCallback = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline,
  ): any => {
    setUser((res as GoogleLoginResponse).profileObj);
    setToken((res as GoogleLoginResponse).accessToken);
  };

  return (
    <div className='youtube-root neumorph-in'>
      <FaYoutube className='icon-youtube' size={100} />
      <p>{user ? `You're set, ${user.name}` : 'User not logged'}</p>
      {token ? null : (
        <GoogleLogin
          clientId={googleClientId}
          onSuccess={successCallback}
          isSignedIn={true}
          render={LoginButton}
        />
      )}
    </div>
  );
}

export default Youtube;
