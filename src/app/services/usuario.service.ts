

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioRegistroDTO, AuthResponse, Usuario, LoginDTO, Preferencia } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly baseUrl = 'http://localhost:8080';

  private usuarioActual = new BehaviorSubject<Usuario | null>(this.cargarUsuarioDesdeStorage());
  usuarioActual$ = this.usuarioActual.asObservable();

  constructor() {
    this.cargarUsuarioDesdeStorage();
  }



  private guardarSesion(response: AuthResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
    this.usuarioActual.next(response.usuario);
  }

  private cargarUsuarioDesdeStorage(): Usuario | null {
    const usuarioJson = localStorage.getItem('usuario');
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  }


  registrarUsuario(usuario: UsuarioRegistroDTO): Observable<AuthResponse> {
    const url = `${this.baseUrl}/usuarios`;
    return this.http.post<AuthResponse>(url, usuario).pipe(
      tap(response => {

        this.guardarSesion(response);
      })
    );
  }


  login(credenciales: LoginDTO): Observable<AuthResponse> {
    const url = `${this.baseUrl}/auth/login`; // Endpoint común
    return this.http.post<AuthResponse>(url, credenciales).pipe(
      tap(response => {
        this.guardarSesion(response);
      })
    );
  }


  obtenerPreferencias(): Observable<Preferencia[]> {
    // Asumimos el endpoint /preferencias
    return this.http.get<Preferencia[]>(`${this.baseUrl}/preferencias`);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('usuario');
    this.usuarioActual.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.usuarioActual.getValue();
  }

  getUserId(): number | null {
    return this.usuarioActual.getValue()?.id || null;
  }
}
