// category-meals.component.ts
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { MealsService } from '../meals.service';
import {NgForOf} from "@angular/common";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-category-meals',
  templateUrl: './category-meals.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./category-meals.component.css']
})
export class CategoryMealsComponent implements OnInit {
  category: string | undefined;
  meals: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private mealsService: MealsService
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
      });
    }
  }
}
