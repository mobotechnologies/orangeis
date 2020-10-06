import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstregistrationComponent } from './gstregistration.component';

describe('GstregistrationComponent', () => {
  let component: GstregistrationComponent;
  let fixture: ComponentFixture<GstregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
