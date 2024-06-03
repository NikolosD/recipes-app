import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AreaService} from "../services/area/area.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {PaginationComponent} from "../pagination/pagination.component";
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";
import {countriesWithIcons, CountryWithIcon} from "../countries-with-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-area-filter',
  templateUrl: './area.component.html',
  standalone: true,
  imports: [
    NgForOf,
    PaginationComponent,
    RecipeCardComponent,
    NgOptimizedImage
  ],
  styleUrls: ['./area.component.css']
})
export class AreaComponent {
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;
  pagesArray: number[] = [];

  countries: CountryWithIcon[] = countriesWithIcons;


  @Output() regionSelected = new EventEmitter<string>();

  constructor(private areaService: AreaService,private router: Router) {
    this.calculateTotalPages();
  }

  ngOnInit(): void {
  }
  getVisibleCountries(): CountryWithIcon[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.countries.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.countries.length / this.itemsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  navigateToAreaMeals() {
    this.router.navigate(['/area/:country']);
  }
}
