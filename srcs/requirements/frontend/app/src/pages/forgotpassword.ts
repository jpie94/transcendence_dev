// pages/forgotpassword.ts

import { registerSubmit } from "../core/events";
import { sendJSON } from "../sendJSON";

export function renderForgotPassword(): string {
  return `
    <div class="flex-grow flex flex-col items-center justify-center text-center px-2">
      <h1 class="text-2xl mb-6">Forgot Password</h1>
      <form id="forgotPasswordForm" data-action="forgotpassword.submit" class="flex flex-col gap-2 w-full max-w-xs">
        <input
          name="email"
          type="text"
          placeholder="Email"
          class="nb-input default nb-rounded"
        />
        <button type="submit" class="nb-button warning nb-rounded">
          Reset
        </button>
      </form>
      <div class="mt-4 text-sm md:text-base">
        <a href="/signin" data-action="global.nav" class="hover:underline">Back to Sign in?</a>
      </div>
    </div>
    `;
}


registerSubmit("forgotpassword.submit", async (_e: Event) => {
  // e.preventDefault();

  const email = (document.getElementsByName("email")[0] as HTMLInputElement).value;
  const res = await sendJSON("/api/forgotpassword", { email });
  if (res.ok) {

    const raw = await res.text();

    if (!raw) {
      return null; 
    }

    return JSON.parse(raw);

    // window.location.href = "/signin";
  }
  else {
    console.log("Connection failed");

    const err = await res.text();
    throw new Error(err || `HTTP ${res.status}`);
  }
});