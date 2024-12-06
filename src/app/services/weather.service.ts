import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get(url); // Faz a requisição GET para a API e retorna os dados como um Observable

  }
}
