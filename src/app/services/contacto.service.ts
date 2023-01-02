import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto } from '../interfaces/contacto';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  private myAppUrl: string = environment.apiUrl;
  private myApiUrl: string = 'contacts/';

  constructor(private http: HttpClient) {}

  getContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getContacto(contactoId: number): Observable<Contacto> {
    return this.http.get<Contacto>(
      `${this.myAppUrl}${this.myApiUrl}${contactoId}`
    );
  }

  deleteContacto(contactoId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.myAppUrl}${this.myApiUrl}${contactoId}`
    );
  }

  addContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(
      `${this.myAppUrl}${this.myApiUrl}`,
      contacto
    );
  }

  updateContacto(contactoId: number, contacto: Contacto): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}${contactoId}`,
      contacto
    );
  }
}
