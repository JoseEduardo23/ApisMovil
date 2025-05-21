import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle',
  standalone: true,
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class DetallePage implements OnInit {
  pokemon: any;
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    if (nombre) {
      this.fetchPokemon(nombre);
    }
  }

  fetchPokemon(nombre: string) {
    this.loading = true;
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Maneja error si quieres
      }
    });
  }

  getTypes(): string {
    return this.pokemon?.types?.map((t: any) => t.type.name).join(', ') || '';
  }

  getAbilities(): string {
    return this.pokemon?.abilities?.map((a: any) => a.ability.name).join(', ') || '';
  }

  getImageUrl(): string {
    return this.pokemon?.sprites?.front_default || '';
  }
}