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
    // Check browser language (e.g., "es-ES", "es", "en-US")
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
        // Update Button Text (Show the option to switch TO)
        langTextSpan.textContent = lang === 'en' ? 'ES' : 'EN';

        // Select all elements with data-lang attributes
        const elements = document.querySelectorAll('[data-lang-en]');

        elements.forEach(el => {
            if (lang === 'es') {
                if(el.dataset.langEs) el.textContent = el.dataset.langEs;
            } else {
                if(el.dataset.langEn) el.textContent = el.dataset.langEn;
            }
        });
    }


    // --- 3. THEME TOGGLE FUNCTIONALITY ---
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Check if class exists to determine current mode
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon'); // Change icon to moon
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun'); // Change icon to sun
        }
    });

});