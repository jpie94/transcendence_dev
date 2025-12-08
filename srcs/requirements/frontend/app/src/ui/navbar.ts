// ui/navbar.ts

// import { fetchUser, signOut } from "../auth";
// import { navigate } from "../router";

// Export one canonical render function
export async function renderNavbar(): Promise<string> {
  const user = null; // await fetchUser(); // Vérifie la session côté backend

  if (!user) {
    return `
      <nav class="nb-navbar nb-rounded" role="navigation" aria-label="Main navigation">
        <a href="/" class="nb-navbar-brand">PONG</a>
        <button class="nb-navbar-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="hamburger" aria-hidden="true"></span>
        </button>
        <ul id="main-nav" class="nb-navbar-nav" role="menubar" aria-hidden="false">
          <li class="nb-navbar-item" role="none"><a role="menuitem" class="nb-navbar-link text-success active" href="/signin" data-action="global.nav">Sign in</a></li>
          <li class="nb-navbar-item" role="none"><a role="menuitem" class="nb-navbar-link" href="/signup" data-action="global.nav">Sign up</a></li>
        </ul>
      </nav>`;
  }

  return `
    <nav class="nb-navbar nb-rounded" role="navigation" aria-label="Main navigation">
      <a href="/" class="nb-navbar-brand">PONG</a>
      <button class="nb-navbar-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="hamburger" aria-hidden="true"></span>
      </button>
      <ul id="main-nav" class="nb-navbar-nav" role="menubar" aria-hidden="false">
        <li class="nb-navbar-item" role="none"><a role="menuitem" class="nb-navbar-link active" href="/game" data-action="global.nav">Game</a></li>
        <li class="nb-navbar-item" role="none"><a role="menuitem" class="nb-navbar-link" href="/tournament" data-action="global.nav">Tournament</a></li>
        <li class="nb-navbar-item" role="none"><a role="menuitem" class="nb-navbar-link" href="/chat" data-action="global.nav">Chat</a></li>
        <li class="nb-navbar-item" role="none"><a role="menuitem" class="nb-navbar-link" href="/profile" data-action="global.nav">Profile</a></li>
        <li class="nb-navbar-item" role="none"><a role="menuitem" class="nb-navbar-link text-error" href="/signout" data-action="global.nav">Sign out</a></li>
      </ul>
    </nav>`;
}

// PUBLIC API :
export let closeNavbar = () => {};
export let isNavbarOpen = () => false;

export function initNavbar() {
  const navbar = document.querySelector<HTMLElement>('.nb-navbar');
  const toggle = document.querySelector<HTMLElement>('.nb-navbar-toggle');
  const nav = document.getElementById('main-nav');

  function setOpen(open: boolean) {
    navbar?.classList.toggle('open', open);
    toggle?.classList.toggle('active', open);
    toggle?.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav?.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  toggle?.addEventListener('click', () => {
    const isOpen = navbar?.classList.contains('open');
    setOpen(!isOpen);
  });
  
  closeNavbar = () => setOpen(false);
  isNavbarOpen = () => navbar?.classList.contains("open") ?? false;
}
