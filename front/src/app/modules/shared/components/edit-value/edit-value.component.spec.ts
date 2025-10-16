import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditValueComponent } from './edit-value.component';

describe('ConfirmComponent', () => {
  let component: EditValueComponent;
  let fixture: ComponentFixture<EditValueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditValueComponent]
    });
    fixture = TestBed.createComponent(EditValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
