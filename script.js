// 1. Select the HTML elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// 2. Add the click event listener
if (hamburger) {
    hamburger.addEventListener('click', () => {
        // This toggles the 'active' class we defined in CSS above
        navMenu.classList.toggle('active');
        
        // Optional: Toggle the icon between 'bars' and 'times' (X)
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 3. Close menu when a link is clicked (UX Improvement)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        // Reset icon
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTS ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const langTextSpan = langToggleBtn.querySelector('.lang-text');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // --- STATE ---
    let currentLang = 'en'; // Default
    let currentTheme = 'dark'; // Default

    // --- 1. LANGUAGE DETECTION ---
    const userLang = navigator.language || navigator.userLanguage; 
    if (userLang.startsWith('es')) {
        currentLang = 'es';
    } else {
        currentLang = 'en';
    }

    // Apply the detected language immediately
    updateLanguage(currentLang);

    // --- 2. LANGUAGE TOGGLE FUNCTIONALITY ---
    langToggleBtn.addEventListener('click', () => {
        // Toggle state
        currentLang = currentLang === 'en' ? 'es' : 'en';
        updateLanguage(currentLang);
    });

    function updateLanguage(lang) {
        // Update Button Text
        langTextSpan.textContent = lang === 'en' ? 'ES' : 'EN';

        // Update Text Content
        const elements = document.querySelectorAll('[data-lang-en]');
        elements.forEach(el => {
            if (lang === 'es') {
                if(el.dataset.langEs) el.textContent = el.dataset.langEs;
            } else {
                if(el.dataset.langEn) el.textContent = el.dataset.langEn;
            }
        });

        // --- PDF SWITCH LOGIC ---
        const resumeBtn = document.getElementById('resume-btn');
        if (resumeBtn) {
            // If lang is 'es', use SpanishResume.pdf, otherwise use Resume.pdf
           resumeBtn.href = lang === 'es' ? 'SpanishResume.pdf' : 'Englishresume.pdf';
        }
    }

    // --- 3. THEME TOGGLE FUNCTIONALITY ---
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon'); 
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun'); 
        }
    });

});
