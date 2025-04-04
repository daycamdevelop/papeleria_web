import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientComponent } from './new-cliente.component';

describe('NewClientComponent', () => {
  let component: NewClientComponent;
  let fixture: ComponentFixture<NewClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewClientComponent]
    });
    fixture = TestBed.createComponent(NewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
