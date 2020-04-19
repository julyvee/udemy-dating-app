import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserForLogin } from 'src/app/_models/userForLogin';
import { TokenResponse } from 'src/app/_models/tokenResponse';
import { UserForRegister } from 'src/app/_models/userForRegister';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
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
