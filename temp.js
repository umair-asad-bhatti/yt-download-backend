const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const ytdl = require('@distube/ytdl-core');

const app = express();
app.use(cors());
const cookies = [
  {
    domain: '.youtube.com',
    expirationDate: 1771939635.419349,
    hostOnly: false,
    httpOnly: true,
    name: '__Secure-1PSIDTS',
    path: '/',
    sameSite: 'unspecified',
    secure: true,
    session: false,
    storeId: '0',
    value:
      'sidts-CjEBEJ3XV7i84tHRwwcyHXK7pMkV0y7XqooVp0Xnm4__XSSUR8t89veFDLUdz0cLrG5rEAA',
    id: 1,
  },
  {
    domain: '.youtube.com',
    expirationDate: 1772524972.811605,
    hostOnly: false,
    httpOnly: false,
    name: '__Secure-3PAPISID',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value: 'hpP_tnjGvB2AYYIx/AoYFhI2K5o6_QT-wU',
    id: 2,
  },
  {
    domain: '.youtube.com',
    expirationDate: 1772524972.811669,
    hostOnly: false,
    httpOnly: true,
    name: '__Secure-3PSID',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value:
      'g.a000sQh6JRR8QepdXpCc5S6Dh9iUeqz14ruir26-0IP42Nom2PqlKUZCm67Xyc3C4j2VmBIZdgACgYKAb4SARESFQHGX2MiW7XXjvbiIHkPjtLaMAtNsRoVAUF8yKoPrj_acvNG8XtMVTS32NvN0076',
    id: 3,
  },
  {
    domain: '.youtube.com',
    expirationDate: 1771939907.044994,
    hostOnly: false,
    httpOnly: true,
    name: '__Secure-3PSIDCC',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value:
      'AKEyXzV0_ksTs__azQTaIXtoeyuvWslDBQrUOCRK1v-YPorXflGSn10tmrLuf9KOySGPtium0oI',
    id: 4,
  },
  {
    domain: '.youtube.com',
    expirationDate: 1771939635.419557,
    hostOnly: false,
    httpOnly: true,
    name: '__Secure-3PSIDTS',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value:
      'sidts-CjEBEJ3XV7i84tHRwwcyHXK7pMkV0y7XqooVp0Xnm4__XSSUR8t89veFDLUdz0cLrG5rEAA',
    id: 5,
  },
  {
    domain: '.youtube.com',
    expirationDate: 1772524973.003822,
    hostOnly: false,
    httpOnly: true,
    name: 'LOGIN_INFO',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value:
      'AFmmF2swRQIhAOn4uA5HbN0TpIHGcBA137V-urn9BDNcG1wtXjFRTcmAAiAjghdLKk0gLBXfxfnDM-otBdUA7e8Kig0ZC8J95jMUMQ:QUQ3MjNmejA1MG1tYTdtV0xwT2NOYTVxR2ExbjdIVFYxUW1ackpfLXYzeHFLVE5pVG9seGlCckY4VjQzSFRqRFRHdHpqczZTbm9BRnZFdC1GdDBJdElSb2R1bDFlT3Q3ZkhnbC1iRUlFWndGc1Y4WTZXZldlcWp1eS1sX0ZOeDdDZVllRVhxdmFOZ0R4V0FvN3YxUWpqUzZyblZwQmQ3d0xB',
    id: 6,
  },
  {
    domain: '.youtube.com',
    expirationDate: 1774963898.02404,
    hostOnly: false,
    httpOnly: false,
    name: 'PREF',
    path: '/',
    sameSite: 'unspecified',
    secure: true,
    session: false,
    storeId: '0',
    value: 'f6=40000000&tz=Asia.Karachi&f7=100',
    id: 7,
  },
  {
    domain: '.youtube.com',
    expirationDate: 1740403911,
    hostOnly: false,
    httpOnly: false,
    name: 'ST-3opvp5',
    path: '/',
    sameSite: 'unspecified',
    secure: false,
    session: false,
    storeId: '0',
    value:
      'session_logininfo=AFmmF2swRQIhAOn4uA5HbN0TpIHGcBA137V-urn9BDNcG1wtXjFRTcmAAiAjghdLKk0gLBXfxfnDM-otBdUA7e8Kig0ZC8J95jMUMQ%3AQUQ3MjNmejA1MG1tYTdtV0xwT2NOYTVxR2ExbjdIVFYxUW1ackpfLXYzeHFLVE5pVG9seGlCckY4VjQzSFRqRFRHdHpqczZTbm9BRnZFdC1GdDBJdElSb2R1bDFlT3Q3ZkhnbC1iRUlFWndGc1Y4WTZXZldlcWp1eS1sX0ZOeDdDZVllRVhxdmFOZ0R4V0FvN3YxUWpqUzZyblZwQmQ3d0xB',
    id: 8,
  },
  {
    domain: '.youtube.com',
    expirationDate: 1755954538.691046,
    hostOnly: false,
    httpOnly: true,
    name: 'VISITOR_INFO1_LIVE',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value: 'FpUcl5_wYtI',
    id: 9,
  },
  {
    domain: '.youtube.com',
    expirationDate: 1755954538.691255,
    hostOnly: false,
    httpOnly: true,
    name: 'VISITOR_PRIVACY_METADATA',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value: 'CgJQSxIEGgAgDw%3D%3D',
    id: 10,
  },
  {
    domain: '.youtube.com',
    hostOnly: false,
    httpOnly: true,
    name: 'YSC',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: true,
    storeId: '0',
    value: 'd90OPMl3N0U',
    id: 11,
  },
];

const agent = ytdl.createAgent(cookies);
app.use(bodyParser.urlencoded({ extended: true })); // For form data
app.use(bodyParser.json()); // For JSON data (if your client sends JSON)

app.use(express.static('public'));

app.post('/checkInfo', async (req, res) => {
  try {
    if (!req.body.url) {
      return res.status(400).json({ message: 'Provide a url' });
    }
    //extract the url from body
    const { url } = req.body;
    //get the video info

    const info = await ytdl.getInfo(url, { agent });
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
    console.log(err);
    res.status(400).json({ message: 'Provide a valid youtube link' });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server listening on ', port);
});
module.exports = app;
