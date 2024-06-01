import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RecipeService} from '../recipe.service';
import {PaginationComponent} from "../pagination/pagination.component";
import {FormsModule} from "@angular/forms";
import {LoaderService} from "../loader.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PaginationComponent]
})



export class RecipesComponent implements OnInit {

  recipes: Receipt[] = [];
  firstLetter: string = 'a';
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;


  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    protected loaderService: LoaderService
  ) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.firstLetter = params['firstLetter'] || 'a';
      this.searchQuery = params['search'] || '';
      this.currentPage = +params['pageNumber'] || 1;
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
    this.loaderService.show();
    this.recipeService.getRecipesByFirstLetter(this.firstLetter).subscribe(data => {
      this.recipes = data.meals || [];
      this.calculateTotalPages();
    });
    this.updateQueryParams();
    this.loaderService.hide();
  }

  searchRecipes(): void {
    this.loaderService.show();

    this.recipeService.searchRecipes(this.searchQuery).subscribe(data => {
      this.recipes = data.meals || [];
      this.calculateTotalPages();


    });
    this.updateQueryParams();
    this.loaderService.hide();

  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.recipes.length / this.itemsPerPage);
  }

  getVisibleRecipes(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.recipes.slice(startIndex, endIndex);
  }

  updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        firstLetter: this.firstLetter,
        search: this.searchQuery,
        pageNumber: this.currentPage
      },
      queryParamsHandling: 'merge'
    });
  }

  resetFilters(): void {
    this.firstLetter = 'a';
    this.searchQuery = '';
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadRecipes();
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateQueryParams();
    this.loadRecipes();
  }



}


type Receipt = {
  strMeal: string,
  strMealThumb: string,
  strCategory: string
  strArea: string
}
