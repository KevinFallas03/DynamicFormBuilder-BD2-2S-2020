import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOneComponent } from './get-one.component';

describe('GetOneComponent', () => {
  let component: GetOneComponent;
  let fixture: ComponentFixture<GetOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
