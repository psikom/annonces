import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Annonce } from './annonce';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  private apiUrl = 'http://localhost:3000';

  private annoncesSubject = new BehaviorSubject<any[]>([]);
  annonces$: Observable<any[]> = this.annoncesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getAllAnnonces().subscribe((annonces) => {
      this.annoncesSubject.next(annonces);
    });
  }

  getAllAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/annonces`);
  }

  getAnnoncesByUserId(userId: number): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/annonces?userId=${userId}`);
  }

  getAnnonceById(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiUrl}/annonces/${id}`);
  }

  addAnnonce(newAnnonce: any): Observable<Annonce> {
    return this.http.post<Annonce>(`${this.apiUrl}/annonces`, newAnnonce);
  }

  updateAnnonce(id: number, updatedData: any): Observable<Annonce> {
    return this.http.put<Annonce>(`${this.apiUrl}/annonces/${id}`, updatedData);
  }

  deleteAnnonce(id: number): Observable<Annonce> {
    return this.http.delete<Annonce>(`${this.apiUrl}/annonces/${id}`);
  }
}
