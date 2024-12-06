import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '67bdcad329a13a75682e5155d10d297b'; // Chave da API OpenWeatherMap
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  // Método para buscar dados do clima de uma cidade
  getWeather(city: string): Observable<any> {

    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=pt_br`; // Monta a URL com parâmetros para a requisição

    // Faz a requisição GET para a API e retorna os dados como um Observable e tratamento de erro
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Erro ao buscar dados do clima:', error);
        return throwError(() => new Error('Não foi possível obter dados climáticos. Tente novamente mais tarde.'));
      })
    );



  }
}
