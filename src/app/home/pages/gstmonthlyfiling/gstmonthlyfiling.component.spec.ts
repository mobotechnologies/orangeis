import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstmonthlyfilingComponent } from './gstmonthlyfiling.component';

describe('GstmonthlyfilingComponent', () => {
  let component: GstmonthlyfilingComponent;
  let fixture: ComponentFixture<GstmonthlyfilingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstmonthlyfilingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstmonthlyfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
