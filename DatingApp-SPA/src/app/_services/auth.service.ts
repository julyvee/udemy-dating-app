import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserForLogin } from 'src/models/userForLogin';
import { TokenResponse } from 'src/models/tokenResponse';
import { UserForRegister } from 'src/models/userForRegister';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: UserForLogin) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: TokenResponse) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodeToken();
          console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: UserForRegister) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}