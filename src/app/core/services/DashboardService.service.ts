import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/Dashboard';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = environment.apiUrl+'/Dashboard';

  constructor(private http: HttpClient) { }

  getDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.api);
  }
}