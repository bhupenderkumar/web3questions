// API Client for Web3 Questions Backend
// This file can be used instead of the static data files

const API_BASE_URL = 'http://localhost:3001/api';

// Generate or get session ID for tracking progress
const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
};

const api = {
    // Fetch helper with session ID
    async fetch(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            'X-Session-Id': getSessionId(),
            ...options.headers
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    },

    // ============ Categories ============
    async getCategories() {
        return this.fetch('/categories');
    },

    // ============ Questions ============
    async getQuestionsByCategory(category) {
        return this.fetch(`/questions/${category}`);
    },

    async searchQuestions(query) {
        return this.fetch(`/questions?search=${encodeURIComponent(query)}`);
    },

    async getQuestionsByTag(tag) {
        return this.fetch(`/questions?tag=${encodeURIComponent(tag)}`);
    },

    // ============ Bookmarks ============
    async getBookmarks() {
        return this.fetch('/bookmarks');
    },

    async toggleBookmark(questionId) {
        return this.fetch(`/bookmarks/${questionId}`, { method: 'POST' });
    },

    // ============ Progress ============
    async getProgress() {
        return this.fetch('/progress');
    },

    async toggleCompletion(questionId) {
        return this.fetch(`/completions/${questionId}`, { method: 'POST' });
    },

    // ============ Tags ============
    async getTags() {
        return this.fetch('/tags');
    },

    // ============ Health Check ============
    async healthCheck() {
        return this.fetch('/health');
    }
};

// Export for use in app.js
window.web3Api = api;
