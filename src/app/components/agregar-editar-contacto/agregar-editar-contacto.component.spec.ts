import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarContactoComponent } from './agregar-editar-contacto.component';

describe('AgregarEditarContactoComponent', () => {
  let component: AgregarEditarContactoComponent;
  let fixture: ComponentFixture<AgregarEditarContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
