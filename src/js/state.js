const selection = {
    locations: [],
    foods: [],
    drinks: []
};

const appState = {
    darkMode: false,
    dateOptions: [],
    selectedLocations: [],
    selectedFoods: [],
    selectedDrinks: [],
    userNote: '',
    invitationEmailSent: false
};

const syncSelections = () => {
    appState.selectedLocations = [...selection.locations];
    appState.selectedFoods = [...selection.foods];
    appState.selectedDrinks = [...selection.drinks];
};

const formatSelection = (items) => {
    const cleaned = items
        .map(item => item.replace(/^custom:\s*/i, '').replace(/\s+/g, ' ').trim())
        .filter(Boolean);
    return cleaned.length ? cleaned.join(', ') : 'None selected';
};

export { appState, selection, syncSelections, formatSelection };
