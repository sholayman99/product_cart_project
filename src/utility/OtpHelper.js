export function setToken(token) {
  sessionStorage.setItem("token", token);
}

export function getToken() {
  return sessionStorage.getItem("token");
}

export function removeToken() {
  sessionStorage.clear();
  window.location.href = "/login";
}

export function ManageTokenExpire(code) {
  if (code === 401) {
    sessionStorage.clear();
    window.location.href = "/login";
  }
}

export function setEmail(email) {
  sessionStorage.setItem("email", email);
}

export function getEmail() {
   return sessionStorage.getItem("email");
}
