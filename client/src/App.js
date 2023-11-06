import React from 'react';
import Video from '../src/components/video/video'
import Search from '../src/components/search/search'

import './App.css';

function App() {
  return (
    <div className="App">
    <div className='one'>
 <Video></Video>
    </div>
    <div className='two'>
       <Search></Search>
      </div>
     
     
     
    </div>
  );
}

export default App;
