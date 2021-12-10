import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedContainerComponent } from './fixed-container.component';

describe('FixedContainerComponent', () => {
  let component: FixedContainerComponent;
  let fixture: ComponentFixture<FixedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
