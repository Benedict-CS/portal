# CLAUDE.md - Portal Development Guide

## Project Overview
A professional, data-driven service portal with a Node.js Express backend and a Vanilla JS/CSS frontend. Featuring a "Soft UI" aesthetic and real-time liveness indicators.

## Core Tech Stack
- **Backend**: Node.js, Express.js.
- **Frontend**: Vanilla HTML/CSS/JS (No frameworks).
- **Deployment**: Docker, Shell Script (`deploy.sh`).
- **Data Source**: `services.json` (The source of truth for all project cards).

## Key Files & Structure
- `index.html`: Main entry point. Minimal structure, dynamic rendering.
- `services.json`: **EDIT THIS FILE** to add, remove, or modify services.
- `app.js`: Frontend logic, dynamic card rendering, staggered animations, and health checks.
- `style.css`: Design system (Apple-style Soft UI).
- `server.js`: Express server and `/api/health` proxy for status checks.
- `deploy.sh`: Deployment script for building/running Docker containers.

## Critical Maintenance Rules (AI MUST FOLLOW)
1. **Content Updates**: Never add cards directly to `index.html`. Always update `services.json`.
2. **Design Language**: Maintain the "Soft UI" aesthetic. High corner radii (24px), subtle shadows, and centered typography.
3. **Animations**: Keep the staggered entry animation (`card.visible` class with timeout).
4. **Health Checks**: New services must be compatible with the status indicator system in `app.js`.

## Common Commands
- **Start Dev Server**: `node server.js`
- **Manual Health Check**: `curl http://localhost:3000/api/health?url=https://google.com`
- **Local Docker Build**: `docker build -t benedict-portal .`
- **Deploy**: `./deploy.sh` (Stops, builds, and restarts the container).

## Deployment Details
- **Port**: 3000.
- **Auto-restart**: `unless-stopped`.
- **Target Environment**: Linux VM / TrueNAS Scale Docker.
