import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalCreateComponent } from './approvalcreate.component';

describe('ApprovalsComponent', () => {
  let component: ApprovalCreateComponent;
  let fixture: ComponentFixture<ApprovalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
