import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportChangeComponent } from './passport-change.component';

describe('PassportChangeComponent', () => {
  let component: PassportChangeComponent;
  let fixture: ComponentFixture<PassportChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
