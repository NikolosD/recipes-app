import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  getRecipesByFirstLetter(letter: string): Observable<any> {
    return this.http.get(`${this.apiUrl}search.php?f=${letter}`);
  }

  getRecipeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}lookup.php?i=${id}`);
  }

  searchRecipes(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}search.php?s=${query}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}categories.php`);
  }
}
