import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationTabsComponent } from './administration-tabs.component';

describe('AdministrationTabsComponent', () => {
  let component: AdministrationTabsComponent;
  let fixture: ComponentFixture<AdministrationTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
