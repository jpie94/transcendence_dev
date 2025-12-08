// ui/alert.ts

import { registerClick } from "../core/events";

// Gestion des alertes dynamiques
/*
 * Crée et affiche une alerte dynamique
 * @param {Object} options - Les options de configuration
 * @param {string} options.title - Le titre du dialogue
 * @param {string} options.message - Le contenu HTML du corps
 * @param {string} options.type - Le style (default, primary, success, warning, error)
 * @param {boolean} options.rounded - Si vrai, ajoute la classe .nb-rounded
 * @param {number} options.duration - Durée avant disparition automatique (ms), 0 pour ne pas auto-fermer
*/

let alertIdCounter = 0;

export function removeAlert(alertId: string): void {
  const el = document.getElementById(alertId);
  if (el)
    el.remove();
}

export function createAlert({
  title = "Information",
  message = "Ceci est un message.",
  type = "default",
  rounded = true,
  duration = 4000
}: AlertOptions = {}): string {
  const alertId = `alert-${++alertIdCounter}`;

  const alert = document.createElement('div');
  alert.id = alertId;
  alert.classList.add('nb-alert', `${type}`);
  if (rounded)
    alert.classList.add('nb-rounded');
  const titleHtml = title ? `<h5>${title}</h5>` : '';
  alert.innerHTML = `
    <button class="nb-close-alert" data-action="${alertId}.close"></button>
    <div class="nb-alert-body">
      ${titleHtml}
      <p>
        ${message}
      </p>
    </div>
  `;

    // alert.querySelector('.nb-close-alert')?.addEventListener('click', () => {
    //   alert.remove();
    // });

    registerClick(`${alertId}.close`, (_e: Event) => {
      removeAlert(alertId);
    });

    const container = document.getElementsByClassName('nb-alert-container')[0] || document.body;
    container.appendChild(alert);

    if (duration > 0) {
      setTimeout(() => removeAlert(alertId), duration);
    }

    return alertId;
}