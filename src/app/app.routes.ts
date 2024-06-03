import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import {AuthGuard} from "./services/auth/auth-guard.service";
import {CategoriesComponent} from "./categories/categories.component";
import {CategoryMealsComponent} from "./category-meals/category-meals.component";
import {AreaComponent} from "./area/area.component";
import {AreaMealsComponent} from "./area-meals/area-meals.component";

export const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard] },
  { path: '', component: RecipesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent , canActivate: [AuthGuard]},
  { path: 'categories', component: CategoriesComponent , canActivate: [AuthGuard]},
  { path: 'categories/:pageNumber', component: CategoriesComponent,canActivate: [AuthGuard] },
  { path: 'category-meals/:category', component: CategoryMealsComponent,canActivate: [AuthGuard] },
  { path: 'area', component: AreaComponent,canActivate: [AuthGuard]},
  { path: 'area/:country', component: AreaMealsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
