import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBodegueroComponent } from './home-bodeguero.component';

describe('HomeBodegueroComponent', () => {
  let component: HomeBodegueroComponent;
  let fixture: ComponentFixture<HomeBodegueroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBodegueroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBodegueroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
