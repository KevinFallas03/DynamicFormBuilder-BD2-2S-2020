import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillTemplateComponent } from './fill-template.component';

describe('FillTemplateComponent', () => {
  let component: FillTemplateComponent;
  let fixture: ComponentFixture<FillTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
