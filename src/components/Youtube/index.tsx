import React, { useState, useEffect } from 'react';
import './youtube.css';
import { GoogleApis } from 'googleapis';

import { FaYoutube } from 'react-icons/fa';

import {googleApiKey} from '../../settings.js'

const name = 'anon';

function Youtube() {
  const google = new GoogleApis();
  const oauth = new google.auth.OAuth2({
    clientId: '',
    clientSecret: '',
    redirectUri: '',
  });

  const url = oauth.generateAuthUrl()
  const {tokens} = await oauth.getToken()
  return (
    <div className='youtube-root neumorph-in'>
      <FaYoutube className='icon-youtube' size={100} />
      <p>{!name ? 'User not logged' : `Welcome ${name}!`}</p>
      <a href={url}>gimme authentication daddy</a>
    </div> 
