import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgregarJugdaor } from './form-agregar-jugdaor';

describe('FormAgregarJugdaor', () => {
  let component: FormAgregarJugdaor;
  let fixture: ComponentFixture<FormAgregarJugdaor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAgregarJugdaor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAgregarJugdaor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
