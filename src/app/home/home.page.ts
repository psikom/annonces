import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../annonce.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Annonce } from '../annonce';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  annonces$: Observable<Annonce[]>;
  filteredAnnonces: Annonce[];
  allAnnonces: Annonce[];
  authenticatedUser: any;
  expandedAnnonceId: number | null = null;
  selectedCategory: string = 'houses';

  constructor(private annonceService: AnnonceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authenticatedUser = this.authService.getAuthenticatedUser();
    this.annonces$ = this.annonceService.getAllAnnonces();
    this.annonces$.subscribe((annonces) => {
      this.filteredAnnonces = [...annonces];
      this.allAnnonces = [...annonces];
    });
  }

  filterAnnonces(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredAnnonces = this.allAnnonces.filter(
      (annonce) =>
        annonce.titel.toLowerCase().includes(searchTerm) || annonce.description.toLowerCase().includes(searchTerm)
    );
  }

  toggleExpand(annonceId: number) {
    this.expandedAnnonceId = this.expandedAnnonceId === annonceId ? null : annonceId;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category == 'all') {
      this.filteredAnnonces = this.allAnnonces;
    } else
      this.filteredAnnonces = this.allAnnonces.filter(
        (annonce) =>
          annonce.category.toLowerCase().includes(category)
      );

  }
}
