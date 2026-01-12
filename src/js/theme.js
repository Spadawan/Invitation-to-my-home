const initTheme = (toggle, appState) => {
    const initialDarkMode = false;
    document.documentElement.classList.remove('dark-mode');
    document.body.classList.toggle('dark-mode', initialDarkMode);
    appState.darkMode = initialDarkMode;

    if (!toggle) return;

    toggle.checked = initialDarkMode;
    toggle.addEventListener('change', (event) => {
        const isDark = event.target.checked;
        document.body.classList.toggle('dark-mode', isDark);
        appState.darkMode = isDark;
    });
};

export { initTheme };
