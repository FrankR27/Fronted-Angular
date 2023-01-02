import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contacto } from 'src/app/interfaces/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-ver-contacto',
  templateUrl: './ver-contacto.component.html',
  styleUrls: ['./ver-contacto.component.css'],
})
export class VerContactoComponent implements OnInit, OnDestroy {
  id!: number;
  loading: boolean = false;
  contacto!: Contacto;
  routeSub!: Subscription;

  constructor(
    private _contactoService: ContactoService,
    private aRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.aRoute.params.subscribe((data) => {
      this.id = data['id'];
      this.obtenerContacto(this.id);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  obtenerContacto(contactoId: number) {
    this.loading = true;
    this._contactoService.getContacto(contactoId).subscribe({
      next: (contacto) => {
        this.contacto = contacto;
        this.loading = false;
      },
      error: (err) => {
        alert(`Error al tratar de cargar el contacto ${err.message}`);
        this.loading = false;
      },
      complete: () => console.info('Se obtuvo el contacto con éxito'),
    });
  }
}
