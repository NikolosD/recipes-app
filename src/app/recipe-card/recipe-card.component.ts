import { Component, Input } from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe: Recipe | undefined;
  constructor(private router: Router) {}

  redirectToCategory(category: string | undefined): void {
    this.router.navigate(['/category-meals', category]);
  }

  viewRecipe(recipeId: string | undefined): void {
    this.router.navigate(['/recipes', recipeId]);
  }
}



export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}
