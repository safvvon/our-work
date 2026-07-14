const fs = require('fs');
const https = require('https');
const path = require('path');

const url = 'https://raw.githubusercontent.com/chumpatrol1/blob_ball/global-font-crash-bug/resources/fonts/neuropol-x-free.regular.ttf';
const dest = path.join(__dirname, 'public', 'neuropol-x-free.regular.ttf');

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Downloading from:', url);
console.log('Saving to:', dest);

const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => {
      console.log('Download complete!');
      process.exit(0);
    });
  });
}).on('error', function(err) {
  fs.unlink(dest, () => {});
  console.error('Error downloading:', err.message);
  process.exit(1);
});
