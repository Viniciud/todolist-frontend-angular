import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormTaskComponent } from './modal-form-task.component';

describe('ModalFormTaskComponent', () => {
  let component: ModalFormTaskComponent;
  let fixture: ComponentFixture<ModalFormTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
