import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from 'src/app/interfaces/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-agregar-editar-contacto',
  templateUrl: './agregar-editar-contacto.component.html',
  styleUrls: ['./agregar-editar-contacto.component.css'],
})
export class AgregarEditarContactoComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;
  accion: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _contactoService: ContactoService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
    });

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.accion = 'Editar';
      this.obtenerContacto(this.id);
    }
  }

  obtenerContacto(id: number) {
    this.loading = true;
    this._contactoService.getContacto(id).subscribe((data) => {
      this.form.setValue({
        nombre: data.name,
        apellido: data.lastname,
        email: data.email,
        telefono: data.phone,
      });
      this.loading = false;
    });
  }

  agregarEditarContacto() {
    this.loading = true;

    const contacto: Contacto = {
      name: this.form.get('nombre')?.value,
      lastname: this.form.get('apellido')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('telefono')?.value,
    };

    if (this.id != 0) {
      contacto.id = this.id;
      this.editarContacto(this.id, contacto);
    } else {
      this.agregarContacto(contacto);
    }
  }

  editarContacto(id: number, contacto: Contacto) {
    this.loading = true;
    this._contactoService.updateContacto(id, contacto).subscribe(() => {
      this.mensajeExito('actualizado');
      this.loading = false;
      this.router.navigateByUrl('/listContactos');
    });
  }

  agregarContacto(contacto: Contacto) {
    this._contactoService.addContacto(contacto).subscribe({
      next: () => {
        this.mensajeExito('creado');
        this.loading = false;
        this.router.navigateByUrl('/listContactos');
      },
      error: (err) => {
        alert(`Error al crear los contactos ${err.message}}`);
        this.loading = false;
      },
      complete: () => console.info('Se obtuvieron los contactos con éxito'),
    });
  }

  mensajeExito(text: string) {
    this._snackBar.open(`El contacto fue ${text} con éxito`, '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
