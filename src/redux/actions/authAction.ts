export function setAccessToken(token: string) {
  return { type: "auth/setAccessToken", payload: token };
}
