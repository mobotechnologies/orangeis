import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesuppportComponent } from './financesuppport.component';

describe('FinancesuppportComponent', () => {
  let component: FinancesuppportComponent;
  let fixture: ComponentFixture<FinancesuppportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancesuppportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesuppportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
