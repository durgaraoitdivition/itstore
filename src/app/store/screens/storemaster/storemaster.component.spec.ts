import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoremasterComponent } from './storemaster.component';

describe('StoremasterComponent', () => {
  let component: StoremasterComponent;
  let fixture: ComponentFixture<StoremasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoremasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoremasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
