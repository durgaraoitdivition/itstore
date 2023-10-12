import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagetypeComponent } from './packagetype.component';

describe('PackagetypeComponent', () => {
  let component: PackagetypeComponent;
  let fixture: ComponentFixture<PackagetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagetypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
