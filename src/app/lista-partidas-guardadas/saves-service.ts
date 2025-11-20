import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saves } from '../models/saves'; // Asegúrate de tener el modelo importado

@Injectable({
  providedIn: 'root'
})
export class SavesService {
  private readonly url = 'http://localhost:3000/saves'; // URL de json-server
  private readonly http = inject(HttpClient);

  /**
   * CREAR NUEVA PARTIDA (POST)
   * Genera el registro inicial en la base de datos.
   */
  createSave(newSave: Saves): Observable<Saves> {
    return this.http.post<Saves>(this.url, newSave);
  }

  /**
   * ACTUALIZAR PARTIDA (PUT)
   * Este es el que usarás más adelante para tu botón de "Guardar Manualmente".
   */
  updateSave(save: Saves): Observable<Saves> {
    return this.http.put<Saves>(`${this.url}/${save.id}`, save);
  }

  // Método para obtener una partida por ID (necesario para cargarla después)
  getSaveById(id: number): Observable<Saves> {
    return this.http.get<Saves>(`${this.url}/${id}`);
  }

  getSavesByUserId(userId: number): Observable<Saves[]> {
    // json-server filtra automáticamente con query params
    return this.http.get<Saves[]>(`${this.url}?userId=${userId}`);
  }
}