import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorTestComponent } from './sensor-test.component';

describe('SensorTestComponent', () => {
  let component: SensorTestComponent;
  let fixture: ComponentFixture<SensorTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
