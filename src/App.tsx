import React, { useState } from 'react';
import './App.css';
import Spotify from './components/Spotify';
import Youtube from './components/Youtube';
import { FiInfo } from 'react-icons/fi';
import YesIMadeAProgressBarSoWhat from './components/YesIMadeAProgressBarSoWhat';

export type TrackData = {
  name: string;
  artist: string;
};

export type LoadingStats = {
  label: string;
  rate: number;
};

function App() {
  const [tracks, setTracks] = useState<Array<TrackData>>([]);
  const [loadingStats, setLoadingStats] = useState<LoadingStats>();
  return (
    <div className='App'>
      <div className='infoDiv'>
        <a
          href='https://github.com/accuvit/musiswap/blob/develop/README.md'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FiInfo className='icon' size={'3em'} color='rgba(255,255,255,0.4)' />
        </a>
      </div>
      {loadingStats && (
        <div className='loadingBar'>
          <span className='loadingTxt'>{loadingStats.label}</span>
          <YesIMadeAProgressBarSoWhat rate={loadingStats.rate} size={'60vw'} />
        </div>
      )}
      <div className='main'>
        <div className='spotify halfPart'>
          <Spotify setTracks={setTracks} />
        </div>
        <div className='youtube halfPart'>
          <Youtube tracks={tracks} setLoadingStats={setLoadingStats} />
        </div>
      </div>
    </div>
  );
}

export default App;
