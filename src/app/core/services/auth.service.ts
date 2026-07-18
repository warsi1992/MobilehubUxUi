import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/LoginResponse';
import { RegisterRequest } from '../models/register-request';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private api = environment.apiUrl+'/Auth';


  login(request: LoginRequest) {
  return this.http.post<LoginResponse>(
    `${this.api}/login`,
    request
  );
}
register(request: RegisterRequest) {
  console.log(this.api);
  return this.http.post<any>(
    `${this.api}/register`,
    request
  );
}
isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('firstName');
  localStorage.removeItem('role');
}
}