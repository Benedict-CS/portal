async function initPortal() {
    const mainContainer = document.getElementById('portal-main');
    
    try {
        const response = await fetch('services.json');
        const categories = await response.json();
        
        mainContainer.innerHTML = ''; // Clear loading
        
        categories.forEach(category => {
            const section = document.createElement('section');
            section.className = 'portal-section';
            
            const title = document.createElement('h2');
            title.className = 'section-title';
            title.textContent = category.category;
            section.appendChild(title);
            
            const grid = document.createElement('div');
            grid.className = 'grid';
            
            category.services.forEach(service => {
                const card = document.createElement('a');
                card.href = service.url;
                card.className = 'card';
                card.target = '_blank';
                card.dataset.url = service.url; // For health checks
                
                card.innerHTML = `
                    <div class="card-content">
                        <div class="status-indicator" title="Checking status..."></div>
                        <div class="icon">${service.icon}</div>
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                    </div>
                    <div class="card-footer">
                        <span>${new URL(service.url).hostname}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                `;
                grid.appendChild(card);
            });
            
            section.appendChild(grid);
            mainContainer.appendChild(section);
        });

        // Start Health Checks
        checkHealth();

    } catch (error) {
        console.error('Failed to load services:', error);
        mainContainer.innerHTML = '<div class="error">Error loading services. Please try again later.</div>';
    }
}

async function checkHealth() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(async (card) => {
        const indicator = card.querySelector('.status-indicator');
        const url = card.dataset.url;
        
        try {
            // We use our own server as a proxy to avoid CORS issues
            const response = await fetch(`/api/health?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            
            if (data.online) {
                indicator.className = 'status-indicator online';
                indicator.title = 'Service is online';
            } else {
                indicator.className = 'status-indicator offline';
                indicator.title = 'Service is offline';
            }
        } catch (error) {
            indicator.className = 'status-indicator offline';
            indicator.title = 'Status check failed';
        }
    });
}

document.addEventListener('DOMContentLoaded', initPortal);
