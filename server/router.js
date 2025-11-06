// Simple client-side router for news detail pages
class Router {
    constructor() {
        this.routes = {};
        this.init();
    }

    init() {
        // Handle initial load
        this.handleRoute();

        this.interceptNavigation();

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    handleRoute() {
        const path = window.location.pathname;
        const route = this.routes[path];
        if (route) {
            route();
        } else if (path.startsWith('/news/')) {
            this.handleNewsDetail(path);
        }
    }

    handleNewsDetail(path) {
        const newsId = path.split('/news/')[1];
        if (newsId) {
            window.location.href = `news-detail.html?id=${newsId}`;
        }
    }

    navigateToNews(newsId) {
        // Direct navigation (no pushState to avoid 404 on back)
        window.location.href = `news-detail.html?id=${newsId}`;
    }

    // Handle back navigation properly
    handleBackNavigation() {
        // If coming from news-detail page, go to index.html instead of root
        if (document.referrer.includes('news-detail.html')) {
            window.location.href = 'index.html';
        }
    }

    // Override browser navigation for news URLs
    interceptNavigation() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href.includes('/news/') && !link.href.includes('news-detail.html')) {
                e.preventDefault();
                // Extract ID from full href (works with relative or absolute)
                const hrefParts = link.href.split('/news/');
                const newsId = hrefParts.length > 1 ? hrefParts[1].split(/[?#]/)[0] : null;
                if (newsId) {
                    this.navigateToNews(newsId);
                }
            }
        });
    }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Router();
});
