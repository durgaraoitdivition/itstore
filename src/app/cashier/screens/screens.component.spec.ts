import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cashierScreensComponent } from './screens.component';

describe('cashierScreensComponent', () => {
  let component: cashierScreensComponent;
  let fixture: ComponentFixture<cashierScreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ cashierScreensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(cashierScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
