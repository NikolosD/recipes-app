import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loggedInKey = 'isLoggedIn';

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.setLoggedIn(true);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.setLoggedIn(false);
  }

  private setLoggedIn(value: boolean): void {
    localStorage.setItem(this.loggedInKey, value ? 'true' : 'false');
  }

  isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem(this.loggedInKey);
    return isLoggedIn === 'true';
  }
}
