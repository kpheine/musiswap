import React, { useState } from 'react';
import './youtube.css';
import {
  googleClientId,
} from '../../settings';

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

function Youtube() {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<User>();

  const successCallback = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    console.log(res);
  };

  return (
    <div className='youtube-root neumorph-in'>
      <FaYoutube className='icon-youtube' size={100} />
      <p>{user ? `You're set, ${user.name}` : 'User not logged'}</p>
      <GoogleLogin
        clientId={googleClientId}
        onSuccess={successCallback}
        isSignedIn={true}
      />
    </div>
  );
}

export default Youtube;
