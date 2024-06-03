import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private apiUrl: string = 'https://www.themealdb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  getMealsByCategory(category: string): Observable<any> {
    const url = `${this.apiUrl}filter.php?c=${category}`;
    return this.http.get<any>(url);
  }
}
