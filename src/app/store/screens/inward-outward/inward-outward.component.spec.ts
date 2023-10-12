import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardOutwardComponent } from './inward-outward.component';

describe('InwardOutwardComponent', () => {
  let component: InwardOutwardComponent;
  let fixture: ComponentFixture<InwardOutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardOutwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
