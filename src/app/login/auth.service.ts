import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { environment } from 'src/environments/environment';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResult } from './login-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authStatus = new Subject<boolean>();
  public authStatus = this._authStatus.asObservable();

  constructor(protected http: HttpClient) { }

  init() {
    if (this.isAuthenticated()) {
      this.setAuthStatus(true);  
    }
  }

  getToken(): string | null {
    return localStorage.getItem("comp584-token");
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  setAuthStatus(isAuthenticated: boolean) {
    this._authStatus.next(isAuthenticated);
  }

  login(loginItem: LoginRequest): Observable<LoginResult> {
    let url = environment.baseUrl + "/api/admin";

    return this.http.post<LoginResult>(url, loginItem)
      .pipe(tap((loginResult: LoginResult) => { // Added parentheses around the parameter
        if (loginResult.success && loginResult.token) {
          localStorage.setItem("comp584-token", loginResult.token);
          this.setAuthStatus(true); //publish authentication status
        }
      }));
  }
  logout() {
    localStorage.removeItem("comp584-token");
    this.setAuthStatus(false); //publish
  }
}

