import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxSatComponent } from './max-sat.component';

describe('MaxSatComponent', () => {
  let component: MaxSatComponent;
  let fixture: ComponentFixture<MaxSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaxSatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
