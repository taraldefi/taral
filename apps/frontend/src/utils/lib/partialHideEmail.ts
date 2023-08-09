export function partiallyHideEmail(email: string): string {
  const parts = email.split("@");
  const username = parts[0];
  const domain = parts[1];

  if (username.length <= 2) {
    // If the username is too short, only show the first character
    return username[0] + "*****@" + domain;
  }

  const visibleUsername = username[0] + username[1];
  const stars = "*".repeat(username.length - 3);
  return visibleUsername + stars + "@" + domain;
}
