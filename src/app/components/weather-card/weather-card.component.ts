import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  @Input() weatherData: any;


  getIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  }
}
