import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceTestComponent } from './distance-test.component';

describe('DistanceTestComponent', () => {
  let component: DistanceTestComponent;
  let fixture: ComponentFixture<DistanceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanceTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
