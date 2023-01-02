import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoContactoComponent } from './listado-contacto.component';

describe('ListadoContactoComponent', () => {
  let component: ListadoContactoComponent;
  let fixture: ComponentFixture<ListadoContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
