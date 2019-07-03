import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasDetectorComponent } from './canvas-detector.component';

describe('CanvasDetectorComponent', () => {
  let component: CanvasDetectorComponent;
  let fixture: ComponentFixture<CanvasDetectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasDetectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
