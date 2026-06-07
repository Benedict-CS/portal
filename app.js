async function initPortal() {
    const mainContainer = document.getElementById('portal-main');
    
    try {
        const response = await fetch('services.json');
        const categories = await response.json();
        
        mainContainer.innerHTML = '';
        
        categories.forEach(category => {
            const section = document.createElement('section');
            section.className = 'portal-section';
            
            section.innerHTML = `<h2 class="section-title">${category.category}</h2>`;
            
            const grid = document.createElement('div');
            grid.className = 'grid';
            
            category.services.forEach(service => {
                const card = document.createElement('a');
                card.href = service.url;
                card.className = 'card';
                card.target = '_blank';
                card.dataset.url = service.url;
                
                card.innerHTML = `
                    <div class="status-indicator">
                        <div class="status-dot"></div>
                        <span class="status-text">Checking</span>
                    </div>
                    <div class="icon-wrapper">${service.icon}</div>
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="card-footer">
                        <span>${new URL(service.url).hostname}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                `;
                grid.appendChild(card);
            });
            
            section.appendChild(grid);
            mainContainer.appendChild(section);
        });

        checkHealth();
    } catch (error) {
        mainContainer.innerHTML = '<div style="text-align:center; padding:100px;">System Error</div>';
    }
}

async function checkHealth() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(async (card) => {
        const indicator = card.querySelector('.status-indicator');
        const statusText = card.querySelector('.status-text');
        const url = card.dataset.url;
        
        try {
            const response = await fetch(`/api/health?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            
            if (data.online) {
                indicator.classList.add('online');
                statusText.textContent = 'Online';
            } else {
                indicator.classList.add('offline');
                statusText.textContent = 'Offline';
            }
        } catch (error) {
            indicator.classList.add('offline');
            statusText.textContent = 'Error';
        }
    });
}

document.addEventListener('DOMContentLoaded', initPortal);
