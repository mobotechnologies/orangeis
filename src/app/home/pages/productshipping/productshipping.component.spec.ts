import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductshippingComponent } from './productshipping.component';

describe('ProductshippingComponent', () => {
  let component: ProductshippingComponent;
  let fixture: ComponentFixture<ProductshippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductshippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductshippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
