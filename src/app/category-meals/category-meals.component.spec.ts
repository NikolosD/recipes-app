import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMealsComponent } from './category-meals.component';

describe('CategoryMealsComponent', () => {
  let component: CategoryMealsComponent;
  let fixture: ComponentFixture<CategoryMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryMealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
