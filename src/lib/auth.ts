import { jwtDecode } from 'jwt-decode';
// /Users/bradyryun/Projects/Personal/top-content/apps/ui/src/lib/api/keywords.ts

const storageKey = "tcat";
const cookieExpiration = 30; // 30 days
const cookieOptions = "SameSite=Strict; Secure"

export class AuthService {
  
  isAuthenticated() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const isExpired = this.checkIfTokenExpired(token);
    if (isExpired) {
      this.logout();
    }
    return !isExpired;
  }

  getToken() {
    return getCookie(storageKey);
  }

  setToken(token: string) {
    this.saveToken(token);
  }

  saveToken(token: string) {
    if (token) {
      setCookie(storageKey, token, cookieExpiration, cookieOptions);
    }
  }

  checkIfTokenExpired(token: string) {
    const decodedToken = jwtDecode(token);
    const expiryDate = decodedToken.exp;
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (!expiryDate) {
      return true;
    }
    return expiryDate <= currentTime;
  }

  logout() {
    deleteCookie(storageKey);
    localStorage.clear();
    window.location.href = "/auth";
  }

}


function setCookie(cname: string, cvalue: string, exdays: number, options: string) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;" + options;
}

function getCookie(cname: string) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookieExists(name: string): boolean {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return true;
  }
  return false;
}

function deleteCookie(name: string): void {
  if (!checkCookieExists(name)) {
    console.warn(`No cookie with name: ${name}`);
    return;
  }
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
}
