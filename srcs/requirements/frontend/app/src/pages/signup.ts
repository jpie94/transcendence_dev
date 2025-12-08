// pages/signup.ts

import { registerSubmit } from "../core/events";
import { sendJSON } from "../sendJSON";

export function renderSignUp(): string {
  return `
    <div class="flex-grow flex flex-col items-center justify-center text-center px-2">
      <h1 class="text-2xl mb-6">Sign up</h1>
      <form id="signUpForm" data-action="signup.submit" class="flex flex-col gap-2 w-full max-w-xs">
        <input
          name="username"
          type="text"
          placeholder="Username"
          class="nb-input default nb-rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          class="nb-input default nb-rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          class="nb-input default nb-rounded"
        />
        <input
          name="passwordConfirm"
          type="password"
          placeholder="Confirm password"
          class="nb-input default nb-rounded"
        />
        
        <button type="submit" class="nb-button warning nb-rounded">Sign up</button>

        <label class="nb-label">
          <input type="checkbox" name="accept_tos" class="nb-checkbox default">
            <span>
              I accept the <a href="/terms" data-action="global.nav" class="hover:underline">Terms of Service</a> and <a href="/privacy" data-action="global.nav" class="hover:underline">Privacy Policy</a>
            </span>
        </label>
      </form>
      <div class="mt-4 text-sm md:text-base">
        <a href="/signin" data-action="global.nav" class="hover:underline">Already have an account? Sign in</a>
      </div>
    </div>
  `;
}

registerSubmit("signup.submit", async (_e: Event) => {
  // e.preventDefault();

  const email = (document.getElementsByName("email")[0] as HTMLInputElement).value;
  const username = (document.getElementsByName("username")[0] as HTMLInputElement).value;
  const password = (document.getElementsByName("password")[0] as HTMLInputElement).value;
  const passwordConfirm = (document.getElementsByName("passwordConfirm")[0] as HTMLInputElement).value;
  const res = await sendJSON("/api/signup", { username, email, password, passwordConfirm });

  if (res.ok)
    window.location.href = "/signin";
  else
    console.log("Sign up failed");
});