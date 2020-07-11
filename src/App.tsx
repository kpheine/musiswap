import React from 'react';
import './App.css';
import Spotify from './components/Spotify';
import Youtube from './components/Youtube';

function App() {
  return (
    <div className='App'>
      {/* <div className='title'>
        <span className='neutext'>SpoTube</span>
      </div> */}
      <div className='main'>
        <div className='spotify'>
          <Spotify />
        </div>
        <div className='youtube'>
          <Youtube />
        </div>
      </div>
    </div>
  );
}

export default App;
