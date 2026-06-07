# 🌐 Benedict's Service Portal

A clean, modern, and professional portal designed to centralize access to all public services, demos, and internal infrastructure tools. Built with a focus on speed, clarity, and ease of maintenance.

## 🚀 Features

- **Categorized Dashboard**: Automatically separates public-facing projects, live demos, and internal management tools.
- **Service Badges**: Quick visual identification of service status (Public, Demo, Internal).
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices.
- **Docker Ready**: One-command deployment for production environments.
- **Automated Deployment**: Includes a shell script for seamless updates from GitHub.

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
