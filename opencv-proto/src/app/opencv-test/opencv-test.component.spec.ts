import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpencvTestComponent } from './opencv-test.component';

describe('OpencvTestComponent', () => {
  let component: OpencvTestComponent;
  let fixture: ComponentFixture<OpencvTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpencvTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpencvTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
