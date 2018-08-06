import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrder0Component } from './show-order0.component';

describe('ShowOrder0Component', () => {
  let component: ShowOrder0Component;
  let fixture: ComponentFixture<ShowOrder0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOrder0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrder0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
