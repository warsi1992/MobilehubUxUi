import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryImageService {

  private api = environment.apiUrl+'CategoryImages';

  constructor(private http: HttpClient) { }

  upload(categoryId: number, file: File): Observable<any> {

    const form = new FormData();

    form.append('file', file);

    return this.http.post(
      `${this.api}/${categoryId}`,
      form
    );

  }

}