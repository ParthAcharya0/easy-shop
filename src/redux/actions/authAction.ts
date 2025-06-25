export function setAccessToken(token: string) {
  return { type: "auth/setAccessToken", payload: token };
}

export function setUser(info: any) {
  return { type: "auth/setUserInfo", payload: info };
}
