const { router, io } = require('./server');
const ytdl = require('@distube/ytdl-core');
const fs = require('fs');
const path = require('path');

router.post('/checkInfo', async (req, res) => {
  try {
    if (!req.body.url) {
      return res.status(400).json({ message: 'Provide a url' });
    }
    //extract the url from body
    const { url } = req.body;
    //get the video info

    const info = await ytdl.getInfo(url);
    const videoDetails = info.videoDetails;
    const videoInfo = {
      title: videoDetails.title,
      description: videoDetails.description,
      thumbnail: videoDetails.thumbnails.pop().url, // Highest quality thumbnail

      formats: info.formats.filter(
        (format) =>
          format.quality &&
          !format.mimeType.includes('webm') && {
            quality: format.qualityLabel,
            mimeType: format.mimeType,
            url: format.url,
          }
      ),
    };
    res.status(200).json({ url, ...videoInfo });
  } catch (err) {
    res.status(400).json({ message: 'Provide a valid youtube link' });
  }
});

// io.on('connection', (socket) => {
//   console.log(`Client connected: ${socket.id}`);

//   socket.on('register', (data) => {
//     console.log(`Client registered: ${socket.id} with URL: ${data.url}`);

//     // Start downloading the video
//     downloadVideo(socket, data.url);
//   });

//   socket.on('disconnect', () => {
//     console.log(`Client disconnected: ${socket.id}`);
//     clients.delete(socket.id);
//   });
// });

// function downloadVideo(socket, url) {
//   try {
//     const filename = `video_${Date.now()}.mp4`; // Unique filename
//     const output = fs.createWriteStream(
//       path.join(__dirname, 'public', filename)
//     );

//     const video = ytdl(url, { quality: 'highest' });

//     let totalSize = 0;
//     let downloaded = 0;
//     // Convert bytes to MB
//     const bytesToMB = (bytes) => (bytes / 1048576).toFixed(2);

//     // Get video info to determine total size
//     video.on('info', (info) => {
//       totalSize = parseInt(info.formats[0].contentLength, 10);
//     });
//     //getting
//     video.on('data', (chunk) => {
//       downloaded += chunk.length;
//       const progress = (downloaded / totalSize) * 100;
//       console.log(
//         `Progress: ${progress.toFixed(2)}% (${bytesToMB(
//           downloaded
//         )} / ${bytesToMB(totalSize)} MB)`
//       );
//       socket.emit('progressResponse', { progress, filename });
//     });
//     // Handle completion
//     video.on('end', () => {
//       console.log('Download completed!');
//     });
//     // Handle errors
//     video.on('error', (err) => {
//       console.error('Error downloading video:', err.message);
//     });
//     video.pipe(output);
//   } catch (error) {
//     socket.emit('progressResponse', { error: 'Error downloading video' });
//     console.error(error);
//   }
// }
