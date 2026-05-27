import { appState, formatSelection } from './state.js';
import { createStar } from './effects.js';

const disableForm = (els) => {
    els.emailForm?.classList.add('disabled');
    if (els.emailSuccess) els.emailSuccess.style.display = 'block';
    if (els.userEmailInput) els.userEmailInput.disabled = true;
    if (els.sendEmailBtn) els.sendEmailBtn.disabled = true;
};

const OWNER_NOTIFICATION_EMAIL = 'simon.paindavoine@gmail.com'; // Adresse qui reçoit la participation

const initEmailForm = (els) => {
    if (!els.emailForm || !els.userEmailInput) return;

    const markAsSent = () => {
        disableForm(els);
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createStar(els.completionHearts), i * 100);
        }
    };

    els.emailForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const firstName = els.userEmailInput.value.trim();

        if (!firstName) {
            if (els.emailError) {
                els.emailError.style.display = 'block';
            }
            els.userEmailInput.focus();
            return;
        }

        if (els.emailError) els.emailError.style.display = 'none';
        if (els.sendEmailBtn) {
            els.sendEmailBtn.textContent = 'Envoi...';
            els.sendEmailBtn.disabled = true;
        }

        const combinedNote = [appState.userNote?.trim(), firstName]
            .filter(Boolean)
            .join(' - ');

        const templateParams = {
            to_email: OWNER_NOTIFICATION_EMAIL,
            guest_first_name: firstName,
            guest_name: firstName,
            date_options: appState.dateOptions.map(opt => `${opt.date} à ${opt.time}`).join(', '),
            food_preferences: formatSelection(appState.selectedFoods),
            guest_first_name_label: firstName,
            user_note: combinedNote,
            owner_email: OWNER_NOTIFICATION_EMAIL,
            location_preferences: '',
            drink_preferences: '',
            email_signature: 'Simon & Elizabeth',
            email_subject: "Nouvelle réponse au formulaire d’invitation",
            email_greeting: 'Bonjour,',
            email_intro: `Nouvelle réponse reçue de ${firstName}.`,
            guest_summary: `Prénom de l'invité·e : ${firstName}`,
            hide_locations: 'true',
            hide_drinks: 'true',
            location_label: '',
            drink_label: ''
        };

        emailjs.send('will-you-date-me', 'will-you-date-me-form', templateParams)
            .then(() => {
                if (els.sendEmailBtn) els.sendEmailBtn.textContent = "Envoyer l'invitation";
                if (els.sendEmailBtn) els.sendEmailBtn.disabled = false;
                if (els.emailSuccess) els.emailSuccess.style.display = 'block';
                appState.invitationEmailSent = true;
                markAsSent();
            })
            .catch(() => {
                if (els.sendEmailBtn) {
                    els.sendEmailBtn.textContent = 'Réessayer';
                    els.sendEmailBtn.disabled = false;
                }
                if (els.emailError) {
                    els.emailError.textContent = "Échec de l'envoi de l'invitation. Merci de réessayer.";
                    els.emailError.style.display = 'block';
                }
            });
    });

    els.userEmailInput.addEventListener('input', () => {
        const firstName = els.userEmailInput.value.trim();
        if (!firstName) {
            if (els.emailError) els.emailError.style.display = 'block';
        } else if (els.emailError) {
            els.emailError.style.display = 'none';
        }
    });

    if (appState.invitationEmailSent) {
        disableForm(els);
    }
};

export { initEmailForm };
