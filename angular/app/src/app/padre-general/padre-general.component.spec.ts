import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadreGeneralComponent } from './padre-general.component';

describe('PadreGeneralComponent', () => {
  let component: PadreGeneralComponent;
  let fixture: ComponentFixture<PadreGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadreGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadreGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
