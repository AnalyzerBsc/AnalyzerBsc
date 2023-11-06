import React from 'react';


function Video() {

  return (
    <div>
     
     <video width="420" height="340" controls>
        <source src={require('../Avideo/demo.mp4')} type="video/mp4" />
  
      </video>
    </div>
  );
}

export default Video;
