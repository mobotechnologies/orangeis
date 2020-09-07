import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductenquiryComponent } from './productenquiry.component';

describe('ProductenquiryComponent', () => {
  let component: ProductenquiryComponent;
  let fixture: ComponentFixture<ProductenquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductenquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
