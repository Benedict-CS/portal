# 🌐 Benedict's Service Portal

A clean, modern, and professional portal designed to centralize access to all public services, demos, and internal infrastructure tools. Built with a focus on speed, clarity, and ease of maintenance.

## 🚀 Features

- **Categorized Dashboard**: Automatically separates public-facing projects, live demos, and internal management tools.
- **Liveness Monitoring**: Integrated health-check system with real-time status indicators. The backend only probes URLs published in `services.json` (allowlist), so the endpoint cannot be abused as an open proxy (SSRF-safe).
- **Data-Driven**: Easily maintainable via a single `services.json` file.
- **Modern UI**: Apple-style "Soft UI" with staggered entry animations and tactile feedback.

## 🔗 Live Services

### Identity
- [**Personal Website**](https://benedict.winlab.tw) - Modern personal platform and CMS.

### Public Tools
- [**QRender**](https://qrender.ben.winlab.tw) - Artistic QR code generator.
- [**Markdown-to-PDF**](https://md2pdf.ben.winlab.tw) - Professional writing station.
- [**PDF Workspace**](https://pdf.ben.winlab.tw) - Unified PDF compression and management toolkit.
- [**Photo Portfolio**](https://gallery.ben.winlab.tw) - Travel photo portfolio with interactive world map and country-grouped timeline.

### Personal Services (Private Cloud)
- [**Cloud Storage**](https://cloud.ben.winlab.tw/s/2c6EcP9F3H7ix5Q) - Nextcloud (Alternative to Google Drive/iCloud).
- [**Image Service**](https://image.ben.winlab.tw/s/demo) - Immich (Alternative to Google Photos).
- [**Online Office**](https://office.ben.winlab.tw/example/) - OnlyOffice (Alternative to Google Workspace/M365).
- [**Line Service**](https://line.ben.winlab.tw) - Automated backup bot.
- [**NAS Storage**](https://nas.ben.winlab.tw) - TrueNAS SCALE (Alternative to Synology/QNAP).

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (CSS Grid/Flexbox), native system font stack.
- **Backend**: Node.js + Express.js (serves static assets and the `/api/health` proxy).
- **DevOps**: Docker, Shell Scripting, Git.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v20+) or Docker.

### Local Development
```bash
# Clone the repository
git clone https://github.com/Benedict-CS/portal.git
cd portal

# Install dependencies
npm install

# Start the dev server
npm start
```
The portal will be available at `http://localhost:3000`.

### Production Deployment (Docker)
```bash
# Build the image
docker build -t benedict-portal .

# Run the container
docker run -d -p 3000:3000 --name my-portal benedict-portal
```

## 🔄 Automated Updates
Use the provided `deploy.sh` to update your running instance with the latest code from GitHub:
```bash
chmod +x deploy.sh
./deploy.sh
```

## ➕ How to Add a New Service
The portal is data-driven — cards are rendered at runtime from `services.json`.
Add a new entry under the appropriate category:

```json
{
  "name": "Service Name",
  "url": "https://service.example.com",
  "description": "Short description of the service.",
  "icon": "🚀"
}
```

After deploying the updated file, the new card appears with a live status
indicator (the backend pings the URL via `/api/health`).

> Note: the backend reads the `services.json` allowlist at startup. Restart the
> server (or redeploy the container) after editing the file so new URLs are
> accepted by the health-check endpoint.

## 📜 License
MIT
