export const logout = async () => {
  document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict`;
  window.location.href = "/login";
};
