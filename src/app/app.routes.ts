import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import {AuthGuard} from "./auth-guard.service";
import {CategoriesComponent} from "./categories/categories.component";
import {CategoryMealsComponent} from "./category-meals/category-meals.component";

export const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent , canActivate: [AuthGuard]},
  { path: 'categories', component: CategoriesComponent , canActivate: [AuthGuard]},
  { path: 'categories/:pageNumber', component: CategoriesComponent,canActivate: [AuthGuard] },
  { path: 'category-meals/:category', component: CategoryMealsComponent,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
