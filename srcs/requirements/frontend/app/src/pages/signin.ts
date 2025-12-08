// pages/signin.ts

import { registerSubmit } from "../core/events";
import { sendJSON } from "../sendJSON";

export function renderSignIn(): string {
  return `
    <div class="flex-grow flex flex-col items-center justify-center text-center px-2">
      <h1 class="text-2xl mb-6">Sign in</h1>
      <form id="signInForm" data-action="signin.submit" class="flex flex-col gap-2 w-full max-w-xs">
        <input
          name="email"
          type="text"
          placeholder="Email"
          class="nb-input default nb-rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          class="nb-input default nb-rounded"
        />
        <button type="submit" class="nb-button warning nb-rounded">
          Sign in
        </button>
      </form>
      <div class="mt-4 text-sm md:text-base flex flex-col gap-2">
        <a href="/signup" data-action="global.nav" class="hover:underline">Don't have an account? Sign up</a>
        <a href="/forgotpassword" data-action="global.nav" class="hover:underline">Forgot password?</a>
      </div>
    </div>
    `;
}

registerSubmit("signin.submit", async (_e: Event) => {
  // e.preventDefault();

  const email = (document.getElementsByName("email")[0] as HTMLInputElement).value;
  const password = (document.getElementsByName("password")[0] as HTMLInputElement).value;
  const res = await sendJSON("/api/signin", { email, password });

  if (res.ok)
    window.location.href = "/profile";
  else
    console.log("Connection failed");
});