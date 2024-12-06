import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet'; // Biblioteca Leaflet para mapas interativos

@Component({
  selector: 'app-map',
  template: `<div id="map" style="height: 400px;"></div>`,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @Input() latitude!: number;
  @Input() longitude!: number;

  private map!: L.Map;

  // Método chamado automaticamente quando os valores de latitude ou longitude mudam
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude'] || changes['longitude']) {
      this.updateMap(); // Atualiza o mapa sempre que a posição mudar
    }
  }

  private initializeMap(): void {
    if (!this.map) {
      // Cria o mapa no elemento com id "map" e centraliza na posição inicial
      this.map = L.map('map').setView([this.latitude, this.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 10,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      // Corrige problemas de renderização ao carregar o mapa
      setTimeout(() => {
        this.map.invalidateSize();
      }, 100);

      // Adiciona um marcador personalizado na posição inicial
      this.addCustomMarker(this.latitude, this.longitude);
    }
  }

  // Cria um marcador personalizado ao mapa
  private addCustomMarker(lat: number, lon: number): void {
    const icon = L.icon({
      iconUrl: 'assets/marker-icon.png',
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    // Adiciona o marcador no mapa
    L.marker([lat, lon], { icon: icon }).addTo(this.map);
  }

  // Atualiza a posição do mapa ou inicializa caso ainda não tenha sido criado
  private updateMap(): void {
    if (this.map) {
      // Atualiza a visão do mapa para a nova posição
      this.map.setView([this.latitude, this.longitude], 13);
      this.addCustomMarker(this.latitude, this.longitude);
    } else {
      // Inicializa o mapa se ele ainda não existir
      this.initializeMap();
    }
  }
}
