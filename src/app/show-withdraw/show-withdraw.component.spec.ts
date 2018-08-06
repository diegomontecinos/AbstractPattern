import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWithdrawComponent } from './show-withdraw.component';

describe('ShowWithdrawComponent', () => {
  let component: ShowWithdrawComponent;
  let fixture: ComponentFixture<ShowWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
