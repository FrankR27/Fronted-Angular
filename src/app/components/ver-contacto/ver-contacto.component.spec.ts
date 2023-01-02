import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerContactoComponent } from './ver-contacto.component';

describe('VerContactoComponent', () => {
  let component: VerContactoComponent;
  let fixture: ComponentFixture<VerContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
