const TOKEN_KEY = "pijarnusa_token";
const USER_KEY = "pijarnusa_user";

export interface StoredUser {
  user_id: string;
  role: string;
  display_role: string;
  name: string;
  email: string;
  status: string;
  kyc_status: string;
}

export function saveSession(token: string, user: StoredUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): StoredUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
