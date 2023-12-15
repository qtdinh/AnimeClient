import { Component } from '@angular/core';
import { Character } from './character';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-series',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {
  characters: Character[] = [];

    constructor(http: HttpClient) {
      http.get<Character[]>(environment.baseUrl + "/api/character").subscribe({
        next: result => {
          this.characters = result;
        },
        error: error => {
          console.error(error);
        }
    });
  }
}