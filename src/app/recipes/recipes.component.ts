import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class RecipesComponent implements OnInit {
  recipes: any[] = [];
  firstLetter: string = 'a';
  searchQuery: string = '';

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.firstLetter = params['firstLetter'] || 'a';
      this.searchQuery = params['search'] || '';
      this.loadRecipes();
    });
  }

  loadRecipes(): void {
    if (this.searchQuery) {
      this.searchRecipes();
    } else {
      this.getRecipesByFirstLetter();
    }
  }

  getRecipesByFirstLetter(): void {
    this.recipeService.getRecipesByFirstLetter(this.firstLetter).subscribe(data => {
      this.recipes = data.meals || [];
    });
    this.updateQueryParams();
  }

  searchRecipes(): void {
    this.recipeService.searchRecipes(this.searchQuery).subscribe(data => {
      this.recipes = data.meals || [];
    });
    this.updateQueryParams();
  }

  updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        firstLetter: this.firstLetter,
        search: this.searchQuery
      },
      queryParamsHandling: 'merge'
    });
  }

  resetFilters(): void {
    this.firstLetter = 'a';
    this.searchQuery = '';
    this.updateQueryParams();
    this.loadRecipes();
  }
}
