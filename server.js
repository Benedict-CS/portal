const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// Health check API
app.get('/api/health', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).json({ error: 'URL is required' });

    try {
        const urlObj = new URL(targetUrl);
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const request = client.get(targetUrl, { timeout: 5000 }, (response) => {
            // Any response (even 404 or 500) means the server is "up" in a basic sense
            // But we can be more strict if needed. Let's consider 2xx/3xx as online.
            const isOnline = response.statusCode >= 200 && response.statusCode < 400;
            res.json({ online: isOnline, status: response.statusCode });
            response.resume(); // Consume the stream
        });

        request.on('error', () => {
            res.json({ online: false });
        });

        request.on('timeout', () => {
            request.destroy();
            res.json({ online: false });
        });
    } catch (e) {
        res.status(400).json({ online: false, error: 'Invalid URL' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portal service running on port ${PORT}`);
});
