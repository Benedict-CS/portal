# 🌐 Benedict's Service Portal

A clean, modern, and professional portal designed to centralize access to all public services, demos, and internal infrastructure tools. Built with a focus on speed, clarity, and ease of maintenance.

## 🚀 Features

- **Categorized Dashboard**: Automatically separates public-facing projects, live demos, and internal management tools.
- **Liveness Monitoring**: Integrated health-check system with real-time status indicators.
- **Data-Driven**: Easily maintainable via a single `services.json` file.
- **Modern UI**: Apple-style "Soft UI" with staggered entry animations and tactile feedback.

## 🔗 Live Services

### Identity
- [**Personal Website**](https://benedict.winlab.tw) - Modern personal platform and CMS.

### Public Tools
- [**QRender**](https://qrender.ben.winlab.tw) - Artistic QR code generator.
- [**Markdown-to-PDF**](https://md2pdf.ben.winlab.tw) - Professional writing station.
- [**PDF Workspace**](https://pdf.ben.winlab.tw) - Unified PDF compression and management toolkit.

### Personal Services (Private Cloud)
- [**Cloud Storage**](https://cloud.ben.winlab.tw/s/2c6EcP9F3H7ix5Q) - Nextcloud (Alternative to Google Drive/iCloud).
- [**Image Service**](https://image.ben.winlab.tw/s/demo) - Immich (Alternative to Google Photos).
- [**Online Office**](https://office.ben.winlab.tw/example/) - OnlyOffice (Alternative to Google Workspace/M365).
- [**Line Service**](https://line.ben.winlab.tw) - Automated backup bot.
- [**NAS Storage**](https://nas.ben.winlab.tw) - TrueNAS SCALE (Alternative to Synology/QNAP).

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (CSS Grid/Flexbox), Inter Font.
- **Backend**: Node.js + Express.js (serving static assets).
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
To add a new card to the portal, edit `index.html` and add an `<a>` tag within the appropriate `grid` container:

```html
<a href="URL" class="card internal" target="_blank">
    <div class="card-content">
        <div class="badge internal">Label</div>
        <div class="icon">🚀</div>
        <h3>Service Name</h3>
        <p>Short description of the service.</p>
    </div>
    <div class="card-footer">
        <span>Display URL/IP</span>
    </div>
</a>
```

## 📜 License
MIT
