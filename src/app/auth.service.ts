import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  //authenticated user
  private authenticatedUserSubject = new BehaviorSubject<any>(null);

  //  authenticated user changes
  authenticatedUser$: Observable<any> = this.authenticatedUserSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}&password=${password}`).pipe(
      tap((users) => {
        const authenticatedUser = users[0];
        this.authenticatedUserSubject.next(authenticatedUser);
      })
    );
  }

  signUp(email: string, password: string, fullName: string): Observable<any> {
    const newUser = { email, password, fullName };
    return this.http.post<any>(`${this.apiUrl}/users`, newUser).pipe(
      tap((createdUser) => {
        this.authenticatedUserSubject.next(createdUser);
      })
    );
  }

  logout(): void {
    this.authenticatedUserSubject.next(null);
  }

  getAuthenticatedUser(): any {
    return this.authenticatedUserSubject.value;
  }

}
