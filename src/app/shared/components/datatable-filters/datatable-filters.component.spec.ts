import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableFiltersComponent } from './datatable-filters.component';

describe('DatatableFiltersComponent', () => {
  let component: DatatableFiltersComponent;
  let fixture: ComponentFixture<DatatableFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatableFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
