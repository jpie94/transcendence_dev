// ui/globalEvents.ts

import { registerClick, registerKeydown } from "../core/events";
import { navigate } from "../router";
import { closeNavbar, isNavbarOpen } from "./navbar";

export function initGlobalEvents() {
  registerClick("global.nav", (e: Event) => {
    const target = e.target as HTMLElement;

    if (target.tagName === "A" && target.getAttribute("href")) {
      e.preventDefault();

      const href = target.getAttribute("href")!;
      if (href === "/signout") {
        // signOut();
        console.log("Signout");
      } else {
        navigate(href);
      }
      return;
    }
  });

  // registerKeydown("global.escape", (e) => {
  //   if (e.key === "Escape" && isNavbarOpen())
  //     closeNavbar();
  //   else if (e.key === "Escape" && isDialogOpen())
  //     closeDialog();
  //   // else if (e.key === "Escape" && isChatPanelOpen())
  //   // closeChatPanel();
  // });

  document.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement | null;
    if (target && !target.closest(".nb-navbar") && isNavbarOpen())
      closeNavbar();
    else if (target && !target.closest(".nb-dialog") && isDialogOpen())
      closeDialog();
  });

}
