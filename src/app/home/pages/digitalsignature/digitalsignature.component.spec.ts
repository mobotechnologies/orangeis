import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalsignatureComponent } from './digitalsignature.component';

describe('DigitalsignatureComponent', () => {
  let component: DigitalsignatureComponent;
  let fixture: ComponentFixture<DigitalsignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalsignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalsignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
