function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}.`);
  }
  return value;
}

export const env = {
  apiBaseUrl: requireEnv("NEXT_PUBLIC_API_BASE_URL"),
};
