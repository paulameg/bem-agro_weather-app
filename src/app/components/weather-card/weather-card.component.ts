import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  @Input() weatherData: any; // Propriedade de entrada que recebe os dados climáticos

  // Método para obter a URL do ícone do clima com base no código do ícone
  getIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  }
}
