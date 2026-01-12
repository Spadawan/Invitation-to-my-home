import { elements, tileButtons, customButtons } from './dom.js';
import { appState } from './state.js';
import { startCherryBlossoms, startBackgroundHearts, attachCursorHearts } from './effects.js';
import { initTheme } from './theme.js';
import { initFlows } from './flows.js';
import { initEmailForm } from './email.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme(elements.darkmodeToggle, appState);
    startCherryBlossoms(elements.cherryBlossoms);
    startBackgroundHearts(elements.heartsContainer);
    attachCursorHearts();

    initFlows(elements, { tileButtons, customButtons });
    initEmailForm(elements);
});
