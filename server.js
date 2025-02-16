const express = require('express');
const { TikTokDownloader } = require('tiktok-video-downloader');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving static files (CSS, JS)

// Home route
app.get('/', (req, res) => {
    res.render('index', { video: null, error: null });
});

// Download route
app.post('/download', async (req, res) => {
    const tiktokUrl = req.body.url;

    try {
        // Fetch video data
        const downloader = new TikTokDownloader();
        const videoData = await downloader.getVideo(tiktokUrl);

        // Render the video data
        res.render('index', { video: videoData, error: null });
    } catch (err) {
        res.render('index', { video: null, error: 'Invalid TikTok URL or unable to download video.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
