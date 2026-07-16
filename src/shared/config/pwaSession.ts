const SPLASH_SHOWN_KEY = "pijarnusa_splash_shown";

export function hasShownSplash(): boolean {
  return sessionStorage.getItem(SPLASH_SHOWN_KEY) === "1";
}

export function markSplashShown(): void {
  sessionStorage.setItem(SPLASH_SHOWN_KEY, "1");
}
