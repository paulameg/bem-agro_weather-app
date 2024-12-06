import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { GeocodingService } from './services/geocoding.service';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { MapComponent } from './components/map/map.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchBarComponent,
    WeatherCardComponent,
    MapComponent,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  weatherData: any;
  latitude: any;
  longitude: any;
  hasSearched = false;
  isLoading = false;


  constructor(
    private weatherService: WeatherService,
    private geocodingService: GeocodingService
  ) {}

  fetchWeather(city: string): void {
    this.isLoading = true;
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;
      this.latitude = data.coord.lat;
      this.longitude = data.coord.lon;
      this.hasSearched = true;
      this.isLoading = false;
    },
    (error) => {
      console.error('Erro ao buscar dados do clima:', error);
      this.isLoading = false;
    });
  }
}
