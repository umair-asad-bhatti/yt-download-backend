const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('node:http');
const ytdl = require('@distube/ytdl-core');
const { Server } = require('socket.io');
const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true })); // For form data
app.use(bodyParser.json()); // For JSON data (if your client sends JSON)
app.use(router);
app.use(express.static('public'));


app.post('/checkInfo', async (req, res) => {
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
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('server listening on ', port);
});
module.exports = app;


