import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteosPersonalesComponent } from './posteos-personales.component';

describe('PosteosPersonalesComponent', () => {
  let component: PosteosPersonalesComponent;
  let fixture: ComponentFixture<PosteosPersonalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteosPersonalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
