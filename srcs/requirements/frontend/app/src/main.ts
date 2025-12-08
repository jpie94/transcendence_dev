// main.ts

import './css/style.css'
import "font-awesome/css/font-awesome.min.css"

import { navigate } from "./router"; // ⬅️ le fichier que tu montres ci-dessus
import { createAlert, removeAlert } from "./ui/alerts";
import { createDialog, isDialogOpen, closeDialog } from "./ui/dialog";
import { initGlobalEvents } from "./ui/globalEvents";
import { renderNavbar, initNavbar } from "./ui/navbar";
import { renderFooter } from "./ui/footer";

// Rendre la fonction globale
(window as any).createAlert = createAlert;
(window as any).removeAlert = removeAlert;
(window as any).createDialog = createDialog;
(window as any).isDialogOpen = isDialogOpen;
(window as any).closeDialog = closeDialog;

document.body.innerHTML = `
  ${await renderNavbar()}
  <main id="app" class="flex-grow flex"></main>
  ${renderFooter()}
  <section class="nb-alert-container"></section>
`;

initNavbar();

initGlobalEvents();

// Démarrage de la SPA
window.addEventListener("DOMContentLoaded", async () => {
  await navigate(window.location.pathname);
});
