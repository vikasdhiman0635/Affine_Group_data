import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContectCurdComponent } from './contect-curd.component';

describe('ContectCurdComponent', () => {
  let component: ContectCurdComponent;
  let fixture: ComponentFixture<ContectCurdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContectCurdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContectCurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
