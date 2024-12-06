import { Component, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule,MatButtonModule,
    MatIconModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>(); // Evento para enviar o valor da cidade ao app.component
  city: string = ''; // Armazena o nome da cidade digitado pelo usuário
  weatherData: any = null; //Armazena os dados do clima

  // Método chamado quando o botão de busca é clicado
  onSearch() {

    // Verifica se o campo de cidade não está vazio ou só com espaços
    if (this.city.trim()) {
      this.search.emit(this.city.trim()); // Emite o valor da cidade
    }
  }
}

