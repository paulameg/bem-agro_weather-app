import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="height: 400px;"></div>`,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @Input() latitude!: number;
  @Input() longitude!: number;

  private map!: L.Map;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude'] || changes['longitude']) {
      this.updateMap();
    }
  }

  private initializeMap(): void {
    if (!this.map) {
      this.map = L.map('map').setView([this.latitude, this.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 10,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      setTimeout(() => {
        this.map.invalidateSize();
      }, 100);

      // Criando e adicionando um marcador personalizado
      this.addCustomMarker(this.latitude, this.longitude);
    }
  }

  private addCustomMarker(lat: number, lon: number): void {
    const icon = L.icon({
      iconUrl: 'assets/marker-icon.png',
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    L.marker([lat, lon], { icon: icon }).addTo(this.map);
  }

  private updateMap(): void {
    if (this.map) {
      this.map.setView([this.latitude, this.longitude], 13);
      this.addCustomMarker(this.latitude, this.longitude);
    } else {
      this.initializeMap();
    }
  }
}
