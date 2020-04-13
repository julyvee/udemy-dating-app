import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserForLogin } from 'src/models/userForLogin';
import { TokenResponse } from 'src/models/tokenResponse';
import { UserForRegister } from 'src/models/userForRegister';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) {}

  login(model: UserForLogin) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: TokenResponse) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(model: UserForRegister) {
    return this.http.post(this.baseUrl + 'register', model);
  }
}
