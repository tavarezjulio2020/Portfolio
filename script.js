document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE MENU (HAMBURGER)
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Toggle the menu
            navMenu.classList.toggle('active');

            // Toggle the Icon (Bars <-> X)
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
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
       2. THEME TOGGLE (DARK/LIGHT MODE)
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Check if there is a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        // Update icon if the button exists
        if (themeToggleBtn) {
            const themeIcon = themeToggleBtn.querySelector('i');
            if (savedTheme === 'light-mode') {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    // Only add the click listener if the button exists
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light-mode');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark-mode');
            }
        });
    }

    /* =========================================
       3. LANGUAGE TOGGLE (ONLY RUNS IF EXISTS)
       ========================================= */
    const langToggleBtn = document.getElementById('lang-toggle');

    // We wrap all language logic in this IF statement
    if (langToggleBtn) {
        const langTextSpan = langToggleBtn.querySelector('.lang-text');
        
        // --- STATE ---
        let currentLang = 'en'; 

        // --- DETECT BROWSER LANGUAGE ---
        const userLang = navigator.language || navigator.userLanguage; 
        if (userLang.startsWith('es')) {
            currentLang = 'es';
        }

        // Apply language immediately
        updateLanguage(currentLang);

        // --- CLICK LISTENER ---
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'es' : 'en';
            updateLanguage(currentLang);
        });

        function updateLanguage(lang) {
            // Update Button Text
            if (langTextSpan) langTextSpan.textContent = lang === 'en' ? 'ES' : 'EN';

            // Update Page Text
            const elements = document.querySelectorAll('[data-lang-en]');
            elements.forEach(el => {
                if (lang === 'es') {
                    if(el.getAttribute('data-lang-es')) el.textContent = el.getAttribute('data-lang-es');
                } else {
                    if(el.getAttribute('data-lang-en')) el.textContent = el.getAttribute('data-lang-en');
                }
            });

            // --- PDF SWITCH LOGIC ---
            const resumeBtn = document.getElementById('resume-btn');
            if (resumeBtn) {
               resumeBtn.href = lang === 'es' ? 'SpanishResume.pdf' : 'Englishresume.pdf';
            }
        }
    }
});
