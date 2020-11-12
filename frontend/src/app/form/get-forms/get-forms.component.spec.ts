import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFormsComponent } from './get-forms.component';

describe('GetFormsComponent', () => {
  let component: GetFormsComponent;
  let fixture: ComponentFixture<GetFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
