document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE MENU (HAMBURGER)
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    /* =========================================
       2. THEME TOGGLE
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if (themeToggleBtn) {
            const themeIcon = themeToggleBtn.querySelector('i');
            themeIcon.classList.remove('fa-sun'); // Icon for dark mode
            themeIcon.classList.add('fa-moon');   // Icon for light mode
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const themeIcon = themeToggleBtn.querySelector('i');
            
            if (body.classList.contains('light-mode')) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    /* =========================================
       3. LANGUAGE TOGGLE (WORKS FOR ALL PAGES)
       ========================================= */
    const langToggleBtn = document.getElementById('lang-toggle');
    // Finds elements with data-en instead of data-lang-en
    const textElements = document.querySelectorAll('[data-en]'); 

    let currentLang = localStorage.getItem('language') || 'en';

    function updateLanguage(lang) {
        // Update all text elements
        textElements.forEach(el => {
            const newText = el.getAttribute(`data-${lang}`);
            if (newText) {
                el.textContent = newText;
            }
        });

        // Update Toggle Button Text
        if (langToggleBtn) {
            // If current lang is EN, show 'ES' option. If ES, show 'EN'
            langToggleBtn.textContent = lang === 'en' ? 'ES' : 'EN';
        }

        // Update PDF Resume Link (Specific to Home Page)
        const resumeBtn = document.getElementById('resume-btn');
        if (resumeBtn) {
            resumeBtn.href = lang === 'es' ? 'SpanishResume.pdf' : 'Englishresume.pdf';
        }

        localStorage.setItem('language', lang);
        currentLang = lang;
    }

    // Initialize
    updateLanguage(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'es' : 'en';
            updateLanguage(newLang);
        });
    }
});