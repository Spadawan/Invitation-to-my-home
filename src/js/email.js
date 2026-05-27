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

        const templateParams = {
            to_email: OWNER_NOTIFICATION_EMAIL,
            guest_first_name: firstName,
            guest_email: firstName,
            date_options: appState.dateOptions.map(opt => `${opt.date} à ${opt.time}`).join(', '),
            food_preferences: formatSelection(appState.selectedFoods),
            user_note: appState.userNote,
            owner_email: OWNER_NOTIFICATION_EMAIL,
            email_subject: "Nouvelle participation à la soirée"
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
