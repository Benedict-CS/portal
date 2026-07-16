const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;
const HEALTH_TIMEOUT_MS = 5000;

// Build an allowlist of service URLs from services.json.
// The /api/health endpoint proxies requests to a caller-supplied URL, so it
// must only be allowed to reach URLs we already publish, otherwise it becomes
// a Server-Side Request Forgery (SSRF) vector into internal networks.
function loadAllowedUrls() {
    try {
        const raw = fs.readFileSync(path.join(__dirname, 'services.json'), 'utf8');
        const categories = JSON.parse(raw);
        const urls = new Set();
        for (const category of categories) {
            for (const service of category.services || []) {
                if (service && typeof service.url === 'string') {
                    urls.add(service.url);
                }
            }
        }
        return urls;
    } catch (err) {
        console.error('Failed to load services.json allowlist:', err.message);
        return new Set();
    }
}

const allowedUrls = loadAllowedUrls();

app.use(express.static(path.join(__dirname)));

// Health check API
app.get('/api/health', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).json({ error: 'URL is required' });

    // Only allow health checks against URLs published in services.json (anti-SSRF).
    if (!allowedUrls.has(targetUrl)) {
        return res.status(403).json({ online: false, error: 'URL not allowed' });
    }

    let urlObj;
    try {
        urlObj = new URL(targetUrl);
    } catch (e) {
        return res.status(400).json({ online: false, error: 'Invalid URL' });
    }

    const client = urlObj.protocol === 'https:' ? https : http;

    // Guard so we only ever send one response, even if multiple events fire.
    let settled = false;
    const finish = (payload) => {
        if (settled) return;
        settled = true;
        res.json(payload);
    };

    const request = client.get(targetUrl, { timeout: HEALTH_TIMEOUT_MS }, (response) => {
        // Treat 2xx/3xx as online; consume the stream so the socket can be freed.
        const isOnline = response.statusCode >= 200 && response.statusCode < 400;
        response.resume();
        finish({ online: isOnline, status: response.statusCode });
    });

    request.on('error', () => {
        finish({ online: false });
    });

    request.on('timeout', () => {
        request.destroy();
        finish({ online: false });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portal service running on port ${PORT}`);
});
