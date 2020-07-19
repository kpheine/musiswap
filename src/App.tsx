import React, { useState } from 'react';
import './App.css';
import Spotify from './components/Spotify';
import Youtube from './components/Youtube';

export type TrackData = {
  name: string;
  artist: string;
};

function App() {
  const [tracks, setTracks] = useState<Array<TrackData>>([]);
  return (
    <div className='App'>
      {/* <div className='title'>
        <span className='neutext'>SpoTube</span>
      </div> */}
      <div className='main'>
        <div className='spotify'>
          <Spotify setTracks={setTracks} />
        </div>
        <div className='youtube'>
          <Youtube tracks={tracks} />
        </div>
      </div>
    </div>
  );
}

export default App;
