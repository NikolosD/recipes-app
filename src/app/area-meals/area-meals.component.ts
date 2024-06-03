import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AreaService} from "../services/area/area.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-area-meals',
  templateUrl: './area-meals.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./area-meals.component.css']
})
export class AreaMealsComponent implements OnInit {
  selectedCountry: string | undefined;
  meals: any[] = [];

  constructor(private route: ActivatedRoute, private areaService: AreaService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedCountry = params.get('country')!;
      this.fetchMeals();
    });
  }

  fetchMeals(): void {
    this.areaService.getMealsByArea(this.selectedCountry).subscribe(
      (data: any) => {
        this.meals = data.meals;
      }
    );
  }
}
