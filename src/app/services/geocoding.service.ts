import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  getCoordinates(city: string): Observable<any> {
    return this.http.get(this.baseUrl, {
      params: {
        q: city,
        format: 'json',
        limit: '1',
      },
    });
  }
}
