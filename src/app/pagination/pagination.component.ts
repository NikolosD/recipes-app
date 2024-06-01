import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  get pagesArray(): number[] {
    if(this.totalPages <= 1){
      return []
    }
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(pageNumber: number): void {
    this.pageChange.emit(pageNumber);
  }
}
