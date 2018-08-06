import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarGrocerComponent } from './menubar-grocer.component';

describe('MenubarGrocerComponent', () => {
  let component: MenubarGrocerComponent;
  let fixture: ComponentFixture<MenubarGrocerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubarGrocerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarGrocerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
