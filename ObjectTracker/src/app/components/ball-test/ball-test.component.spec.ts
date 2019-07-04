import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallTestComponent } from './ball-test.component';

describe('BallTestComponent', () => {
  let component: BallTestComponent;
  let fixture: ComponentFixture<BallTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
