import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSliderComponent } from './clients-slider.component';

describe('ClientsSliderComponent', () => {
  let component: ClientsSliderComponent;
  let fixture: ComponentFixture<ClientsSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
