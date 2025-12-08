// auth.ts

let cachedUser: any | null = null;

export async function fetchUser(): Promise<any | null> {
  if (cachedUser !== null)
    return cachedUser;
  try {
    const res = await fetch("/api/me", { credentials: "include" });
    if (!res.ok)
      return null;
    const data = await res.json();
    cachedUser = data.user;
    return cachedUser;
  } catch {
    return null;
  }
}

export function clearUserCache() {
  cachedUser = null;
}

export async function isLoggedIn(): Promise<boolean> {
  const user = await fetchUser();
  return !!user;
}

export async function signOut() {
  await fetch("/api/signout", { method: "POST", credentials: "include" });
  clearUserCache(); 
  window.location.href = "/sginin";
}
