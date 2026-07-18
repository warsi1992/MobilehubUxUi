import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeCategory } from '../models/home-category';
import { environment } from '../../../environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/Categories`;

  getCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(this.api);

  }

  getCategory(id: number): Observable<Category> {

    return this.http.get<Category>(
      `${this.api}/${id}`
    );

  }

  create(category: any) {

    return this.http.post(this.api, category);

  }

createcat(category: any): Observable<number> {
  return this.http.post<number>(this.api, category);
}

  update(id: number, category: any) {

    return this.http.put(
      `${this.api}/${id}`,
      category
    );

  }
  updatecat(id: number, category: any) {

    return this.http.put(
      `${this.api}/Updatecat/${id}`,
      category
    );

  }

  delete(id: number) {

    return this.http.delete(
      `${this.api}/${id}`
    );

  }
    getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  

    getHomeCategories(): Observable<HomeCategory[]> {
    return this.http.get<HomeCategory[]>(`${this.api}/home`);
  }

}