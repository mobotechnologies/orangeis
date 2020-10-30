import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutwomenComponent } from './aboutwomen.component';

describe('AboutwomenComponent', () => {
  let component: AboutwomenComponent;
  let fixture: ComponentFixture<AboutwomenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutwomenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutwomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
