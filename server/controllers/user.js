const axios = require('axios'); 
const { error } = require('console');
const fs = require('fs');
const path = require('path');
// Read the contents of data.json
const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const videoUrl = 'https://youtu.be/66hlzZ7dPP0?si=wGaVm9YwkunZUVCp';


exports.getplate = (req, res, next) => {
  const { searchTerm } = req.params; // Destructure searchTerm from req.params
  console.log(searchTerm)
  let frameNumber = null;

  for (const [frame, content] of Object.entries(jsonData)) {
    if (content.includes(searchTerm)) {
      frameNumber = frame;
      break; 
    }
  }

  if (frameNumber) {
    res.json({ frameNumber });
  } else {
    res.json({ error: 'Number plate not found' });
  }
};

exports.getFrameContent = (req, res) => {
  console.log('getFrameContent called');
  const frameNumber = req.params.frameNumber;
console.log("<<<....>",frameNumber)
  // Read the contents of data.json
  const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  // Check if the frame number exists in the data
  if (jsonData[`${frameNumber}.jpg`]) {
    const frameImagePath = `/data/frames/${frameNumber}.jpg`; // Assuming the frames are JPG images

    // Check if the frame image file exists
    const filePath = path.join(__dirname, 'data', 'frames', `frame_${frameNumber}.jpg`);
    if (fs.existsSync(filePath)) {
      res.json({ frameNumber, frameImagePath });
      return; // Return early after sending the response
    }
  }

  res.json({ error: 'Frame not found' });
};


