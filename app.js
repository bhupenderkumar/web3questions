document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const searchInput = document.getElementById('searchInput');

    const sections = {
        basic: document.getElementById('basicSection'),
        intermediate: document.getElementById('intermediateSection'),
        advanced: document.getElementById('advancedSection'),
        projects: document.getElementById('projectsSection'),
        rust: document.getElementById('rustSection'),
        bookmarks: document.getElementById('bookmarksSection'),
        progress: document.getElementById('progressSection'),
        searchResults: document.getElementById('searchResults'),
    };

    const navItems = document.querySelectorAll('.nav-item');

    // --- State Management ---
    let state = {
        completed: new Set(JSON.parse(localStorage.getItem('completed')) || []),
        bookmarks: new Set(JSON.parse(localStorage.getItem('bookmarks')) || []),
        activeSection: 'basic',
    };

    const saveState = () => {
        localStorage.setItem('completed', JSON.stringify(Array.from(state.completed)));
        localStorage.setItem('bookmarks', JSON.stringify(Array.from(state.bookmarks)));
    };

    // --- Rendering ---
    const renderAll = () => {
        renderSection('basic', web3Data.basic, document.getElementById('basicQuestions'));
        renderSection('intermediate', web3Data.intermediate, document.getElementById('intermediateQuestions'));
        renderSection('advanced', web3Data.advanced, document.getElementById('advancedQuestions'));
        renderProjects();
        renderRustTutorial();
        updateProgress();
        renderBookmarks();
        renderProgressDashboard();
        navigateTo(state.activeSection);
    };

    const renderSection = (sectionKey, data, container) => {
        container.innerHTML = '';
        data.forEach((item, index) => {
            const questionId = `${sectionKey}-${index}`;
            const card = createQuestionCard(item, questionId);
            container.appendChild(card);
        });
    };

    const createQuestionCard = (item, id) => {
        const card = document.createElement('div');
        card.className = `question-card ${state.completed.has(id) ? 'completed' : ''}`;
        card.dataset.id = id;

        const isBookmarked = state.bookmarks.has(id);

        card.innerHTML = `
            <div class="question-header">
                <div class="question-number">${id.split('-')[1] * 1 + 1}</div>
                <div class="question-content">
                    <h3 class="question-title">${item.title}</h3>
                    <div class="question-tags">
                        ${item.tags.map(tag => `<span class="tag ${tag.startsWith('difficulty-') ? tag : ''}">${tag.replace('difficulty-', '')}</span>`).join('')}
                    </div>
                </div>
                <div class="question-actions">
                    <button class="action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" title="Bookmark">⭐</button>
                    <button class="action-btn complete-btn ${state.completed.has(id) ? 'completed' : ''}" title="Mark as complete">✔️</button>
                    <button class="action-btn expand-btn" title="Show answer">
                        <span class="expand-icon">▼</span>
                    </button>
                </div>
            </div>
            <div class="question-answer">
                <div class="answer-content">${item.answer}</div>
            </div>
        `;

        // Add event listeners
        card.querySelector('.expand-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('expanded');
        });
        card.querySelector('.question-header').addEventListener('click', () => card.classList.toggle('expanded'));

        card.querySelector('.bookmark-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleBookmark(id);
        });

        card.querySelector('.complete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCompleted(id);
        });

        return card;
    };

    const renderProjects = () => {
        const container = document.getElementById('projectsList');
        container.innerHTML = '';
        web3Data.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = `project-card ${state.completed.has(project.id) ? 'completed' : ''}`;
            card.dataset.id = project.id;
            card.innerHTML = `
                <div class="project-header">
                    <div class="project-icon">${project.icon}</div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-meta">
                        <div class="project-difficulty ${project.difficulty.toLowerCase()}">
                            <span>${project.difficulty}</span>
                        </div>
                        <div class="project-tech">
                            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
                 <div class="project-details">
                    <div class="detail-section">
                        <h4 class="detail-title">Core Features</h4>
                        <ul class="feature-list">
                            ${project.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="project-actions">
                     <button class="project-btn">View Details</button>
                     <button class="action-btn complete-btn ${state.completed.has(project.id) ? 'completed' : ''}" title="Mark as complete">✔️</button>
                </div>
            `;
            card.querySelector('.project-header').addEventListener('click', () => card.classList.toggle('expanded'));
            card.querySelector('.project-btn').addEventListener('click', () => card.classList.toggle('expanded'));
            card.querySelector('.complete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleCompleted(project.id);
            });
            container.appendChild(card);
        });
    };

    const renderRustTutorial = () => {
        // Implementation for Rust tutorial rendering
    };

    const updateProgress = () => {
        ['basic', 'intermediate', 'advanced', 'projects', 'rust'].forEach(sectionKey => {
            const total = web3Data[sectionKey]?.length || 0;
            if (total === 0) return;

            const completedCount = Array.from(state.completed).filter(id => id.startsWith(sectionKey)).length;
            const progress = total > 0 ? (completedCount / total) * 100 : 0;

            document.getElementById(`${sectionKey}Progress`).textContent = `${completedCount}/${total}`;
            const progressBar = document.getElementById(`${sectionKey}ProgressBar`);
            if(progressBar) progressBar.style.width = `${progress}%`;
            const progressText = document.getElementById(`${sectionKey}ProgressText`);
            if(progressText) progressText.textContent = `${Math.round(progress)}% Complete`;
        });
        document.getElementById('bookmarkCount').textContent = state.bookmarks.size;
    };
    
    const renderBookmarks = () => {
        const container = document.getElementById('bookmarksList');
        container.innerHTML = '';
        if (state.bookmarks.size === 0) {
            container.innerHTML = `<div class="empty-state">
                <div class="empty-state-icon">⭐</div>
                <h3 class="empty-state-title">No Bookmarks Yet</h3>
                <p class="empty-state-text">Bookmark questions or projects to find them here later.</p>
            </div>`;
            return;
        }
        state.bookmarks.forEach(id => {
            const [sectionKey, index] = id.split('-');
            const item = web3Data[sectionKey][index];
            if (item) {
                const card = createQuestionCard(item, id);
                container.appendChild(card);
            }
        });
    };

    const renderProgressDashboard = () => {
        // Implementation for progress dashboard
    };

    // --- Actions ---
    const toggleBookmark = (id) => {
        if (state.bookmarks.has(id)) {
            state.bookmarks.delete(id);
        } else {
            state.bookmarks.add(id);
        }
        saveState();
        const btn = document.querySelector(`.question-card[data-id="${id}"] .bookmark-btn`);
        if (btn) {
            btn.classList.toggle('bookmarked', state.bookmarks.has(id));
        }
        updateProgress();
        renderBookmarks();
        showToast(state.bookmarks.has(id) ? 'Bookmarked!' : 'Bookmark removed.');
    };

    const toggleCompleted = (id) => {
        if (state.completed.has(id)) {
            state.completed.delete(id);
        } else {
            state.completed.add(id);
        }
        saveState();
        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) {
            card.classList.toggle('completed', state.completed.has(id));
            const btn = card.querySelector('.complete-btn');
            if(btn) btn.classList.toggle('completed', state.completed.has(id));
        }
        updateProgress();
        renderProgressDashboard();
    };

    const showToast = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // --- Navigation ---
    const navigateTo = (sectionId) => {
        state.activeSection = sectionId;
        Object.values(sections).forEach(section => {
            if (section) section.style.display = 'none';
        });
        if (sections[sectionId]) {
            sections[sectionId].style.display = 'block';
        }

        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.section === sectionId);
        });
        mainContent.scrollTop = 0;
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            navigateTo(sectionId);
        });
    });

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // --- Search ---
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            performSearch(query);
        } else {
            navigateTo(state.activeSection);
        }
    });

    const performSearch = (query) => {
        const results = [];
        ['basic', 'intermediate', 'advanced'].forEach(sectionKey => {
            web3Data[sectionKey].forEach((item, index) => {
                if (item.title.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query)) {
                    results.push({ ...item, id: `${sectionKey}-${index}` });
                }
            });
        });

        const resultsContainer = document.getElementById('searchResultsList');
        resultsContainer.innerHTML = '';
        results.forEach(item => {
            const card = createQuestionCard(item, item.id);
            resultsContainer.appendChild(card);
        });

        document.getElementById('searchResultsCount').textContent = `${results.length} results found for "${query}"`;
        navigateTo('searchResults');
    };

    // --- Init ---
    renderAll();
    hljs.highlightAll();
});
