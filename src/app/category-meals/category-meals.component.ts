import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealsService } from '../meals.service';
import { NgForOf } from "@angular/common";
import { RecipeCardComponent } from "../recipe-card/recipe-card.component";
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-category-meals',
  templateUrl: './category-meals.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RecipeCardComponent,
    PaginationComponent
  ],
  styleUrls: ['./category-meals.component.css']
})
export class CategoryMealsComponent implements OnInit {
  category: string | undefined;
  meals: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  pagesArray: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private mealsService: MealsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.loadCategoryMeals();
    });
  }

  loadCategoryMeals(): void {
    if (this.category) {
      this.mealsService.getMealsByCategory(this.category).subscribe(data => {
        this.meals = data.meals;
        this.calculateTotalPages();
      });
    }
  }

  getVisibleRecipes(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.meals.slice(startIndex, endIndex);
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.meals.length / this.itemsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
