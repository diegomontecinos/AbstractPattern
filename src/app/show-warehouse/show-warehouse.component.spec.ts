import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWarehouseComponent } from './show-warehouse.component';

describe('ShowWarehouseComponent', () => {
  let component: ShowWarehouseComponent;
  let fixture: ComponentFixture<ShowWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
