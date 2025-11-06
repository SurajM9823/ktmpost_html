// Dynamic Featured Articles
class FeaturedArticles {
    constructor() {
        this.apiUrl = `${BASE_URL}/articles`;
        this.init();
    }

    async init() {
        try {
            const articles = await this.fetchArticles();
            const featuredArticles = articles.filter(article => article.isFeatured).slice(0, 2);
            this.updateFeaturedSection(featuredArticles);
        } catch (error) {
            console.error('Error loading featured articles:', error);
        }
    }

    async fetchArticles() {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    updateFeaturedSection(featuredArticles) {
        if (featuredArticles.length < 2) return;

        // First featured article
        const firstTitle = document.getElementById('first-featured-title');
        const firstImg = document.getElementById('first-featured-img');
        const firstAuthorName = document.getElementById('first-featured-author-name');
        const firstDate = document.getElementById('first-featured-date');
        const firstImgLink = firstImg ? firstImg.closest('a') : null;
        const firstAuthorLink = firstAuthorName ? firstAuthorName.closest('a') : null;

        if (firstTitle) {
            firstTitle.innerHTML = `<a href="/news/${featuredArticles[0].id}">${featuredArticles[0].title}</a>`;
        }
        if (firstImg) {
            firstImg.src = featuredArticles[0].featuredImage || 'images/logo/logo.png';
            firstImg.alt = featuredArticles[0].title;
        }
        if (firstImgLink) {
            firstImgLink.href = `/news/${featuredArticles[0].id}`;
        }
        if (firstAuthorName) {
            firstAuthorName.textContent = featuredArticles[0].author.name;
        }
        if (firstAuthorLink) {
            firstAuthorLink.href = `/news/${featuredArticles[0].id}`;
        }
        if (firstDate) {
            const timeText = this.getRelativeTime(featuredArticles[0].publishDate + ' ' + featuredArticles[0].publishTime);
            firstDate.innerHTML = `<i class="ph-clock"></i> ${timeText}`;
        }

        // Second featured article
        const secondTitle = document.getElementById('second-featured-title');
        const secondImg = document.getElementById('second-featured-img');
        const secondAuthorName = document.getElementById('second-featured-author-name');
        const secondDate = document.getElementById('second-featured-date');
        const secondImgLink = secondImg ? secondImg.closest('a') : null;
        const secondAuthorLink = secondAuthorName ? secondAuthorName.closest('a') : null;

        if (secondTitle) {
            secondTitle.innerHTML = `<a href="/news/${featuredArticles[1].id}">${featuredArticles[1].title}</a>`;
        }
        if (secondImg) {
            secondImg.src = featuredArticles[1].featuredImage || 'images/logo/logo.png';
            secondImg.alt = featuredArticles[1].title;
        }
        if (secondImgLink) {
            secondImgLink.href = `/news/${featuredArticles[1].id}`;
        }
        if (secondAuthorName) {
            secondAuthorName.textContent = featuredArticles[1].author.name;
        }
        if (secondAuthorLink) {
            secondAuthorLink.href = `/news/${featuredArticles[1].id}`;
        }
        if (secondDate) {
            const timeText = this.getRelativeTime(featuredArticles[1].publishDate + ' ' + featuredArticles[1].publishTime);
            secondDate.innerHTML = `<i class="ph-clock"></i> ${timeText}`;
        }
    }

    getRelativeTime(publishDateTime) {
        const now = new Date();
        const publish = new Date(publishDateTime);
        const diffMs = now - publish;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 60) {
            return `${diffMins} minutes`;
        } else if (diffHours < 24) {
            return `${diffHours} hours, ${diffMins % 60} minutes`;
        } else {
            return `${diffDays} days ago`;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FeaturedArticles();
});