// router.ts

// import { fetchUser } from "./auth";
// import { renderNavbar, initNavbar } from "./ui/navbar";
// import { renderFooter } from "./ui/footer";
import { renderSignIn } from "./pages/signin";
import { renderSignUp } from "./pages/signup";
import { renderForgotPassword } from "./pages/forgotpassword";
import { renderTournament } from "./pages/tournament";
import { renderProfile } from "./pages/profile";
import { renderGame } from "./pages/game";
import { renderChat } from "./pages/chat";
import { renderNotFound } from "./pages/notfound";
import { renderPrivacy } from "./pages/privacy";
import { renderTerms } from "./pages/terms";

type Route = {
  path: string;
  render: () => string;
  restricted?: boolean;
};

function updateActiveLinks(path: string) {
  path = path == "/" ? "/tournament" : path;
  const links = document.querySelectorAll(".nb-navbar-link");
  links.forEach(link => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === path);
  });
}

export const routes: Route[] = [
  { path: "/", render: renderTournament },
  { path: "/signin", render: renderSignIn },
  { path: "/signup", render: renderSignUp },
  { path: "/forgotpassword", render: renderForgotPassword },
  { path: "/tournament", render: renderTournament },
  { path: "/profile", render: renderProfile, restricted: true },
  { path: "/game", render: renderGame, restricted: true },
  { path: "/chat", render: renderChat, restricted: true },
  { path: "/privacy", render: renderPrivacy },
  { path: "/terms", render: renderTerms },
];

export async function navigate(path: string) {
  const route = routes.find(r => r.path === path);
  const app = document.getElementById("app") as HTMLElement;
  // const navbarHTML = await renderNavbar();
  // const footerHTML = renderFooter();
  if (!route) {
    app.innerHTML = /* navbarHTML + */ renderNotFound() /* + footerHTML */;
    // initNavbar();
    history.pushState({}, "", path);
    return;
  }

  // if (route.restricted) {
  //   const user = await fetchUser();
  //   if (!user)
  //     return navigate("/signin");
  // }

  app.innerHTML = /* navbarHTML + */ route.render() /* + footerHTML */;
  // initNavbar();
  history.pushState({}, "", path);
  updateActiveLinks(path);
}

window.onpopstate = () => navigate(window.location.pathname);

