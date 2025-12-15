// src/app/models/usuario.model.ts

// DTO: Objeto que Angular envía al backend para registrar un usuario
export interface UsuarioRegistroDTO {
  nombre: string;
  email: string;
  // IMPORTANTE: El backend debe hashear esta contraseña antes de guardarla en 'contraseña'
  password: string;
  // Las preferencias son una lista de nombres de preferencia (ej: ['Vegano', 'Sin Lactosa'])
  preferencias: string[];
}

// Model: Objeto que la API devuelve (puede ser solo el token, o el usuario sin contraseña)
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  avatar?: string;
}

// Respuesta de Login/Registro (si te devuelve un token)
export interface AuthResponse {
  token: string;
  usuario: Usuario;
}
