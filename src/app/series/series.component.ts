import { Component } from '@angular/core';
import { SeriesItem } from './seriesitem';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {
  series: SeriesItem[] = [];

    constructor(http: HttpClient) {
      http.get<SeriesItem[]>(environment.baseUrl + "/api/series").subscribe({
        next: result => {
          this.series = result;
        },
        error: error => {
          console.error(error);
        }
    });
  }
}