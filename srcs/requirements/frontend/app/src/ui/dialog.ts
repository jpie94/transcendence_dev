// ui/dialog.ts

import { registerClick } from "../core/events";

/*
 * Vérifie si une boîte de dialogue est actuellement ouverte.
 * @returns {boolean} True si un dialogue est présent dans le DOM.
 */
export function isDialogOpen(): boolean {
  return document.querySelector('.nb-dialog') !== null;
}

export function closeDialog(): void {
  const overlay = document.querySelector('.nb-dialog')?.parentElement;
  overlay?.remove();
}

/*
 * Crée et affiche une boîte de dialogue dynamique
 * @param {Object} options - Les options de configuration
 * @param {string} options.title - Le titre du dialogue
 * @param {string} options.message - Le contenu HTML du corps
 * @param {string} options.type - Le style (default, primary, success, warning, error)
 * @param {boolean} options.rounded - Si vrai, ajoute la classe
 * @param {string} options.confirmText - Texte du bouton de confirmation
 * @param {string} options.cancelText - Texte du bouton d'annulation (null pour cacher)
 * @param {Function} options.onConfirm - Fonction appelée au clic sur confirmer
 * @param {Function} options.onCancel - Fonction appelée au clic sur annuler
 */
export function createDialog({
  // title = "Information",
  message = "Ceci est un message.",
  type = "default",
  rounded = true,
  confirmText = "OK",
  cancelText = "Annuler",
  onConfirm = () => {},
  onCancel = () => {}
}: DialogOptions = {}): void {
  // 1. Créer l'overlay (fond sombre)
  const overlay = document.createElement('div');
  overlay.dataset.action = 'dialog.click';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.backdropFilter = 'blur(2px)';
  overlay.style.padding = '0.25rem';

  // 2. Créer la structure du dialogue
  const dialog = document.createElement('div');
  dialog.className = `nb-dialog ${type} ${rounded ? 'nb-rounded' : ''}`;
  // 3. Contenu HTML interne
  // <div class="nb-dialog-header nb-rounded-top">
  //   ${title}
  // </div>
  dialog.innerHTML = `
    <div class="nb-dialog-body">
      ${message}
    </div>
    <div class="nb-dialog-footer">
      ${cancelText ? `<button class="nb-button default ${rounded ? 'nb-rounded' : ''} btn-cancel" data-action="dialog.cancel">${cancelText}</button>` : ''}
      <button class="nb-button ${type === 'default' ? 'primary' : type} ${rounded ? 'nb-rounded' : ''} btn-confirm" data-action="dialog.confirm" >${confirmText}</button>
    </div>
  `;

  // 5. Gestion des événements
  const closeDialog = () => {
    overlay.remove();
  };

  // // Bouton Annuler
  // if (cancelText) {
  //   dialog.querySelector('.btn-cancel')?.addEventListener('click', () => {
  //     if (onCancel)
  //       onCancel();
  //     closeDialog();
  //   });
  // }

  // // Bouton Confirmer
  // if (confirmText) {
  //   dialog.querySelector('.btn-confirm')?.addEventListener('click', () => {
  //     if (onConfirm)
  //       onConfirm();
  //     closeDialog();
  //   });
  // }

  // // Fermer en cliquant à l'extérieur (sur l'overlay)
  // overlay.addEventListener('click', (e: Event) => {
  //   if (e.target === overlay) {
  //     if (onCancel)
  //       onCancel();
  //     closeDialog();
  //   }
  // });

  // Bouton Annuler
  registerClick('dialog.confirm', (_e: Event) => {
    if (onConfirm)
      onConfirm();
    closeDialog();
  });

  // Bouton Confirmer
  registerClick('dialog.cancel', (_e: Event) => {
    if (onCancel)
      onCancel();
    closeDialog();
  });

  // // Fermer en cliquant à l'extérieur (sur l'overlay)
  // registerClick('dialog.click', (_e: Event) => {
  //   if (_e.target === overlay) {
  //     if (onCancel)
  //       onCancel();
  //     closeDialog();
  //   }
  // });



  // 6. Assemblage et insertion dans le DOM
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
}