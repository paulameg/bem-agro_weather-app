import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  // Método que busca coordenadas (latitude e longitude) de uma cidade
  getCoordinates(city: string): Observable<any> {
    return this.http.get(this.baseUrl, {
      params: {
        q: city,
        format: 'json',
        limit: '1',
      },
    }).pipe(
      catchError(error => {
        console.error('Erro ao buscar coordenadas:', error);
        return throwError(() => new Error('Falha ao obter coordenadas. Verifique sua conexão ou tente novamente mais tarde.')); // Tratamento de erro
      })
    );
  }
}
