import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductwhishlistComponent } from './productwhishlist.component';

describe('ProductwhishlistComponent', () => {
  let component: ProductwhishlistComponent;
  let fixture: ComponentFixture<ProductwhishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductwhishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductwhishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
