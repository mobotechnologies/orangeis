import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsiregistrationComponent } from './esiregistration.component';

describe('EsiregistrationComponent', () => {
  let component: EsiregistrationComponent;
  let fixture: ComponentFixture<EsiregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsiregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsiregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
