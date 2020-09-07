import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeraccountsetupComponent } from './consumeraccountsetup.component';

describe('ConsumeraccountsetupComponent', () => {
  let component: ConsumeraccountsetupComponent;
  let fixture: ComponentFixture<ConsumeraccountsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumeraccountsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeraccountsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
