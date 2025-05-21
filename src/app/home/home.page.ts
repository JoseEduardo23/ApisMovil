import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  offset = 0;
  limit = 150; // Traemos 150 para hacer búsqueda más amplia
  loading = false;
  searchTerm = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    if (this.loading) return;
    this.loading = true;
    this.http
      .get<any>(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
      .subscribe(res => {
        this.pokemons = res.results;
        this.filteredPokemons = this.pokemons;
        this.loading = false;
      });
  }

  filterPokemons() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(term)
    );
  }

  getImageUrl(pokemonUrl: string): string {
    // Extrae el id del URL del pokemon
    const parts = pokemonUrl.split('/').filter(Boolean);
    const id = parts[parts.length - 1];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}