import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarContactoComponent } from './components/agregar-editar-contacto/agregar-editar-contacto.component';
import { ListadoContactoComponent } from './components/listado-contacto/listado-contacto.component';
import { VerContactoComponent } from './components/ver-contacto/ver-contacto.component';

const routes: Routes = [
  { path: '', redirectTo: 'listContactos', pathMatch: 'full' },
  { path: 'listContactos', component: ListadoContactoComponent },
  { path: 'agregarContacto', component: AgregarEditarContactoComponent },
  { path: 'verContacto/:id', component: VerContactoComponent },
  { path: 'editarContacto/:id', component: AgregarEditarContactoComponent },
  { path: '**', redirectTo: 'listContactos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
