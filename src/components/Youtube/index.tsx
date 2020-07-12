import React, { useState, useEffect } from 'react';
import './youtube.css';

import { FaYoutube } from 'react-icons/fa';

const name = 'anon';

function Youtube() {
  return (
    <div className='youtube-root neumorph-in'>
      <FaYoutube className='icon-youtube' size={100} />
      <p>{!name ? 'User not logged' : `Welcome ${name}!`}</p>
      <a href={''}>login(it doesn't work)</a>
    </div>
  );
}

export default Youtube;
