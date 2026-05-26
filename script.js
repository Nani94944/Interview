document.addEventListener('DOMContentLoaded', () => {
    const sections = [...document.querySelectorAll('.doc-section')];
    const navLinks = [...document.querySelectorAll('.nav-links li a')];
    const qaCards = [...document.querySelectorAll('.qa-card')];
    const searchInput = document.getElementById('searchInput');
    const topicButtons = [...document.querySelectorAll('.topic-chip')];
    const expandAllBtn = document.getElementById('expandAllBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    const markVisibleReadBtn = document.getElementById('markVisibleReadBtn');
    const readSummary = document.getElementById('readSummary');
    const readPercent = document.getElementById('readPercent');
    const progressBar = document.getElementById('progressBar');
    const readStorageKey = 'tgInterviewReadCards';
    const topicStorageKey = 'tgInterviewTopic';
    const openStorageKey = 'tgInterviewOpenCards';
    const notesStorageKey = 'tgInterviewQuestionNotes';
    const storage = {
        get(key, fallback) {
            try {
                return localStorage.getItem(key) || fallback;
            } catch {
                return fallback;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch {
                // Study mode still works without persistence.
            }
        }
    };
    const readCards = new Set(JSON.parse(storage.get(readStorageKey, '[]')));
    const openCards = new Set(JSON.parse(storage.get(openStorageKey, '[]')));
    const questionNotes = JSON.parse(storage.get(notesStorageKey, '{}'));
    let activeTopic = storage.get(topicStorageKey, 'all');
    let diagramRenderIndex = 0;

    const topicMap = {
        sec13: 'backend csharp',
        sec14: 'backend mvc dotnet',
        sec15: 'backend wcf services',
        sec16: 'backend sql mssql data',
        sec17: 'frontend angular',
        sec18: 'architecture'
    };

    function makeKey(card, index) {
        const section = card.closest('.doc-section')?.id || 'unknown';
        const question = card.querySelector('.qa-question')?.textContent || `question-${index}`;
        return `${section}-${question.replace(/\s+/g, '-').replace(/[^\w-]/g, '').slice(0, 90)}`;
    }

    function getVisibleCards() {
        return qaCards.filter(card => !card.hidden && !card.closest('.doc-section')?.hidden);
    }

    function saveReadState() {
        storage.set(readStorageKey, JSON.stringify([...readCards]));
    }

    function saveOpenState() {
        storage.set(openStorageKey, JSON.stringify([...openCards]));
    }

    function saveNotes() {
        storage.set(notesStorageKey, JSON.stringify(questionNotes));
    }

    function normalizeMermaidSource(source) {
        return source
            .replace(/\r/g, '')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .trim();
    }

    async function renderMermaidIn(root = document) {
        if (!window.mermaid) return;

        const diagrams = [...root.querySelectorAll('.mermaid')]
            .filter(diagram => !diagram.dataset.rendered && !diagram.dataset.rendering);

        for (const diagram of diagrams) {
            const source = normalizeMermaidSource(diagram.dataset.source || diagram.textContent);
            if (!source) continue;

            diagram.dataset.source = source;
            diagram.dataset.rendering = 'true';

            try {
                const id = `mermaid-diagram-${Date.now()}-${diagramRenderIndex++}`;
                const result = await mermaid.render(id, source);
                diagram.innerHTML = result.svg;
                diagram.dataset.rendered = 'true';
                diagram.classList.remove('mermaid-error');
            } catch (error) {
                diagram.classList.add('mermaid-error');
                diagram.innerHTML = `<div class="diagram-fallback-title">Diagram could not render</div><pre>${source.replace(/[&<>"']/g, char => ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                }[char]))}</pre>`;
                diagram.dataset.rendered = 'fallback';
            } finally {
                delete diagram.dataset.rendering;
            }
        }
    }

    function setCardOpen(card, isOpen) {
        const answer = card.querySelector('.qa-answer');
        const button = card.querySelector('.qa-question-button');
        card.classList.toggle('is-open', isOpen);
        if (answer) answer.setAttribute('aria-hidden', String(!isOpen));
        if (button) button.setAttribute('aria-expanded', String(isOpen));

        if (isOpen) {
            openCards.add(card.dataset.key);
            renderMermaidIn(card);
        } else {
            openCards.delete(card.dataset.key);
        }
        saveOpenState();
    }

    function setRead(card, isRead, silent = false) {
        card.classList.toggle('is-read', isRead);
        card.dataset.read = String(isRead);
        const button = card.querySelector('.read-toggle');
        if (button) {
            button.textContent = isRead ? 'Read' : 'Mark read';
            button.setAttribute('aria-pressed', String(isRead));
        }

        if (isRead) {
            readCards.add(card.dataset.key);
        } else {
            readCards.delete(card.dataset.key);
        }

        if (!silent) {
            saveReadState();
            updateProgress();
            applyFilters();
        }
    }

    function enhanceCards() {
        qaCards.forEach((card, index) => {
            const question = card.querySelector('.qa-question');
            const answer = card.querySelector('.qa-answer');
            if (!question || !answer || card.dataset.enhanced === 'true') return;

            const section = card.closest('.doc-section');
            const sectionId = section?.id || '';
            card.dataset.enhanced = 'true';
            card.dataset.key = makeKey(card, index);
            card.dataset.topic = topicMap[sectionId] || sectionId;
            card.dataset.search = card.textContent.toLowerCase();

            const header = document.createElement('div');
            header.className = 'qa-card-header';

            const toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'qa-question-button';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = `<span>${question.textContent}</span><span class="accordion-icon" aria-hidden="true">+</span>`;

            const readToggle = document.createElement('button');
            readToggle.type = 'button';
            readToggle.className = 'read-toggle';

            header.append(toggle, readToggle);
            question.replaceWith(header);
            answer.setAttribute('aria-hidden', 'true');

            const notes = document.createElement('div');
            notes.className = 'qa-notes';
            notes.innerHTML = `
                <label class="qa-notes-label" for="notes-${index}">My notes</label>
                <textarea id="notes-${index}" class="qa-notes-input" rows="4" placeholder="Write your own notes, examples, doubts, or revision points here..."></textarea>
                <div class="qa-notes-status" aria-live="polite"></div>
            `;
            answer.appendChild(notes);

            const notesInput = notes.querySelector('.qa-notes-input');
            const notesStatus = notes.querySelector('.qa-notes-status');
            notesInput.value = questionNotes[card.dataset.key] || '';
            card.classList.toggle('has-notes', notesInput.value.trim().length > 0);

            toggle.addEventListener('click', () => {
                setCardOpen(card, !card.classList.contains('is-open'));
            });

            readToggle.addEventListener('click', (event) => {
                event.stopPropagation();
                setRead(card, !card.classList.contains('is-read'));
            });

            let notesTimer;
            notesInput.addEventListener('input', () => {
                clearTimeout(notesTimer);
                const value = notesInput.value.trim();
                if (value) {
                    questionNotes[card.dataset.key] = notesInput.value;
                } else {
                    delete questionNotes[card.dataset.key];
                }
                card.classList.toggle('has-notes', value.length > 0);
                notesStatus.textContent = 'Saving...';
                notesTimer = setTimeout(() => {
                    saveNotes();
                    notesStatus.textContent = value ? 'Saved' : 'Note cleared';
                }, 250);
            });

            setRead(card, readCards.has(card.dataset.key), true);
            setCardOpen(card, openCards.has(card.dataset.key));
        });
    }

    function addSectionSummaries() {
        sections.forEach(section => {
            if (section.querySelector('.section-study-summary')) return;
            const cards = section.querySelectorAll('.qa-card');
            if (!cards.length) return;

            const summary = document.createElement('div');
            summary.className = 'section-study-summary';
            section.insertBefore(summary, section.querySelector('.qa-grid'));
        });
    }

    function updateProgress() {
        const total = qaCards.length;
        const read = qaCards.filter(card => card.classList.contains('is-read')).length;
        const percent = total ? Math.round((read / total) * 100) : 0;

        if (readSummary) readSummary.textContent = `${read} / ${total} read`;
        if (readPercent) readPercent.textContent = `${percent}%`;
        if (progressBar) progressBar.style.width = `${percent}%`;

        sections.forEach(section => {
            const cards = [...section.querySelectorAll('.qa-card')];
            const summary = section.querySelector('.section-study-summary');
            if (!cards.length || !summary) return;

            const sectionRead = cards.filter(card => card.classList.contains('is-read')).length;
            summary.textContent = `${sectionRead} of ${cards.length} questions read`;
        });
    }

    function topicMatches(card) {
        if (activeTopic === 'all') return true;
        if (activeTopic === 'read') return card.classList.contains('is-read');
        if (activeTopic === 'unread') return !card.classList.contains('is-read');
        return card.dataset.topic.includes(activeTopic);
    }

    function applyFilters() {
        const term = (searchInput?.value || '').trim().toLowerCase();

        qaCards.forEach(card => {
            const matchesText = !term || card.dataset.search.includes(term);
            const matchesTopic = topicMatches(card);
            const shouldShow = matchesText && matchesTopic;
            card.hidden = !shouldShow;

            if (term && shouldShow) {
                setCardOpen(card, true);
            }
        });

        sections.forEach(section => {
            const cards = [...section.querySelectorAll('.qa-card')];
            if (!cards.length) return;
            section.hidden = cards.every(card => card.hidden);
        });

        let emptyState = document.querySelector('.empty-state');
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'No questions match the current search/filter.';
            document.querySelector('.content')?.prepend(emptyState);
        }
        emptyState.classList.toggle('is-visible', getVisibleCards().length === 0);
    }

    function activateTopic(topic) {
        activeTopic = topic;
        storage.set(topicStorageKey, activeTopic);
        topicButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.topic === activeTopic);
        });
        applyFilters();
    }

    window.tgStudy = {
        activateTopic,
        applyFilters,
        renderMermaidIn,
        updateProgress,
        getVisibleCards
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;

            if (targetSection.hidden) {
                activateTopic('all');
            }

            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;

            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        });
    }, {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));

    document.addEventListener('click', (event) => {
        const topicButton = event.target.closest('.topic-chip');
        if (topicButton) {
            activateTopic(topicButton.dataset.topic);
        }
    });

    searchInput?.addEventListener('input', applyFilters);

    expandAllBtn?.addEventListener('click', () => {
        getVisibleCards().forEach(card => setCardOpen(card, true));
    });

    collapseAllBtn?.addEventListener('click', () => {
        getVisibleCards().forEach(card => setCardOpen(card, false));
    });

    markVisibleReadBtn?.addEventListener('click', () => {
        getVisibleCards().forEach(card => setRead(card, true));
    });

    const fadeObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observerInstance.unobserve(entry.target);
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    document.querySelectorAll('.layer-card, .card, .principle-card').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });

    enhanceCards();
    addSectionSummaries();
    activateTopic(activeTopic);
    updateProgress();
    renderMermaidIn(document.querySelector('.hero') || document);
});
