import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import {NgForOf} from "@angular/common";
import {PaginationComponent} from "../pagination/pagination.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  standalone: true,
  imports: [
    NgForOf,
    PaginationComponent
  ],
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  pagesArray: number[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentPage = +params['pageNumber'] || 1;
      this.fetchCategories();
    });
  }

  fetchCategories(): void {
    this.categoriesService.getCategories().subscribe(data => {
      console.log(data)
      if (data) {
        this.categories = data.categories;
        this.calculateTotalPages();
      }
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getVisibleCategories(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.categories.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.router.navigate(['/categories', pageNumber]);
  }
}

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryDescription: string;
  strCategoryThumb: string;
}

