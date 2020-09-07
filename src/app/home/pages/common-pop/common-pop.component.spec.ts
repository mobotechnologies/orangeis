import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPopComponent } from './common-pop.component';

describe('CommonPopComponent', () => {
  let component: CommonPopComponent;
  let fixture: ComponentFixture<CommonPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
