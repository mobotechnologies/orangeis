import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyincoperationComponent } from './companyincoperation.component';

describe('CompanyincoperationComponent', () => {
  let component: CompanyincoperationComponent;
  let fixture: ComponentFixture<CompanyincoperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyincoperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyincoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
