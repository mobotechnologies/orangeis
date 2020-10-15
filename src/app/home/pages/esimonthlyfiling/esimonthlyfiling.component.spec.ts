import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimonthlyfilingComponent } from './esimonthlyfiling.component';

describe('EsimonthlyfilingComponent', () => {
  let component: EsimonthlyfilingComponent;
  let fixture: ComponentFixture<EsimonthlyfilingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimonthlyfilingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimonthlyfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
