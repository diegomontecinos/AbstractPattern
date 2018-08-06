import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDispatchComponent } from './show-dispatch.component';

describe('ShowDispatchComponent', () => {
  let component: ShowDispatchComponent;
  let fixture: ComponentFixture<ShowDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
