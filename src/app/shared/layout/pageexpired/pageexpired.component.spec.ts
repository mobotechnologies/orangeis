import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageexpiredComponent } from './pageexpired.component';

describe('PageexpiredComponent', () => {
  let component: PageexpiredComponent;
  let fixture: ComponentFixture<PageexpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageexpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageexpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
