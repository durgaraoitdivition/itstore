import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardComponent } from './outward.component';

describe('OutwardComponent', () => {
  let component: OutwardComponent;
  let fixture: ComponentFixture<OutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
