import { Component, Input } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {countriesWithIcons} from "../countries-with-icons";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe: Recipe | undefined;
  constructor(private router: Router) {}

  redirectToCategory(category: string | undefined): void {
    this.router.navigate(['/category-meals', category]);
  }
  redirectToAreaMeal(area: string | undefined): void {
    this.router.navigate(['/area/', area]);
  }



  viewRecipe(recipeId: string | undefined): void {
    this.router.navigate(['/recipes', recipeId]);
  }

  getCountryIcon(countryName: string | undefined): string {
    const country = this.countriesWithIcons.find(c => c.name === countryName);
    return country ? `assets/flags/${country.icon}` : '';
  }

  protected readonly countriesWithIcons = countriesWithIcons;
}



export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}
