import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service'; // Serviço para buscar dados climáticos
import { GeocodingService } from './services/geocoding.service'; // Serviço para localizar coordenadas

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { MapComponent } from './components/map/map.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Icone de carregamento
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchBarComponent,
    WeatherCardComponent,
    MapComponent,
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  weatherData: any;
  latitude: any;
  longitude: any;
  hasSearched = false; // Indica se uma busca foi realizada
  isLoading = false; // Indica se os dados estão sendo carregados


  constructor(
    private weatherService: WeatherService,
    private geocodingService: GeocodingService
  ) {}

  // Método para buscar os dados climáticos com base em uma cidade
  fetchWeather(city: string): void {
    this.isLoading = true;
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;
      this.latitude = data.coord.lat;
      this.longitude = data.coord.lon;
      this.hasSearched = true;
      this.isLoading = false;
    },
    // Callback para quando ocorre um erro
    (error) => {
      console.error('Erro ao buscar dados do clima:', error);
      this.isLoading = false;
      alert('Não foi possível obter os dados do clima. Por favor, tente novamente mais tarde.');
    });
  }
}
