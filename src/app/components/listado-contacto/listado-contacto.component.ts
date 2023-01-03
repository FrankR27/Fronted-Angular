import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Contacto } from 'src/app/interfaces/contacto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-listado-contacto',
  templateUrl: './listado-contacto.component.html',
  styleUrls: ['./listado-contacto.component.css'],
})
export class ListadoContactoComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'ID',
    'nombre',
    'apellido',
    'email',
    'telefono',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Contacto>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _contactoService: ContactoService
  ) {}

  ngOnInit(): void {
    this.obtenerContactos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Contactos por página';
    }
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  obtenerContactos() {
    this.loading = true;
    this._contactoService.getContactos().subscribe({
      next: (contactos) => {
        this.dataSource.data = contactos;
        this.loading = false;
      },
      error: (err) => {
        alert(`Error al obtener los contactos ${err.message}}`);
        this.loading = false;
      },
      complete: () => console.info('Se obtuvieron los contactos con éxito'),
    });
  }

  eliminarContacto(id_contact: number) {
    this.loading = true;

    this._contactoService.deleteContacto(id_contact).subscribe({
      next: () => {
        this.mensajeExito();
        this.obtenerContactos();
        this.loading = false;
      },
      error: (err) => {
        alert(`Hubo un error al tratar de borrar el contacto ${err.message}`);
        this.loading = false;
      },
      complete: () => console.info('Todo salio bien'),
    });
  }

  mensajeExito() {
    this._snackBar.open('El contacto fue eliminado con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
