# Dépannage EmailJS (mail organisateur)

Si le mail reçu reste exactement l’ancien texte en anglais ("Hello there... Warm regards, Phuc...") alors le contenu est très probablement défini dans le **template EmailJS distant**, pas dans ce repo.

## Pourquoi
Le front envoie déjà des paramètres personnalisés (`email_subject`, `email_greeting`, `email_intro`, `email_signature`, etc.) via `src/js/email.js`.
Si l’email reçu ne change pas, c’est que le template EmailJS utilise encore du texte statique ancien (ou d’autres variables).

## Vérifications à faire dans EmailJS
1. Ouvrir EmailJS > **Email Templates**.
2. Vérifier le template id utilisé par le code: `will-you-date-me-form`.
3. Vérifier le service id utilisé: `will-you-date-me`.
4. Dans le contenu du template, remplacer le texte statique par les variables envoyées:
   - `{{email_greeting}}`
   - `{{email_intro}}`
   - `{{guest_summary}}`
   - `{{date_options}}`
   - `{{food_preferences}}`
   - `{{user_note}}`
   - `{{email_signature}}`
5. Supprimer les blocs statiques `Location(s)` et `Drink choice(s)` (ou les rendre conditionnels).
6. Faire un envoi test depuis EmailJS puis depuis le site.

## Point important
Le code du site ne peut pas supprimer une phrase écrite en dur dans l’éditeur de template EmailJS.
