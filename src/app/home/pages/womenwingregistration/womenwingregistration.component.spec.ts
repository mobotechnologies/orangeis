import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenwingregistrationComponent } from './womenwingregistration.component';

describe('WomenwingregistrationComponent', () => {
  let component: WomenwingregistrationComponent;
  let fixture: ComponentFixture<WomenwingregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenwingregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenwingregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
