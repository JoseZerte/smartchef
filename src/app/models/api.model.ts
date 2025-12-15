// src/app/models/api.model.ts (VERSIÓN CORREGIDA Y COMPLETA)

// --- I. USUARIO & AUTENTICACIÓN ---

// 1. DTO de Registro (Input para POST /usuarios)
export interface UsuarioRegistroDTO {
  nombre: string;
  email: string;
  // Usamos 'password' aquí. Si el Backend usa @JsonProperty("password") en 'contraseña', funciona.
  // ¡Mantener consistente con el JSON que se envía!
  password: string;
  avatar?: string;
  preferencias?: string[];
}

// DTO de Salida (Respuesta después de registrar)
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  avatar?: string;
}

// Respuesta del Login (Token + Usuario)
export interface AuthResponse {
  token: string;
  usuario: Usuario; // FIX para TS2339 en login.component.ts y services
  mensaje?: string;
}

// DTO para Login (Input para POST /auth/login)
export interface LoginDTO {
  email: string;
  // 🚨 FIX 1: TS2551 Error resuelto. Usamos 'contrasena' aquí, y el HTML/Componente
  // también usan 'contrasena'. El Backend DEBE estar mapeado con @JsonProperty("contrasena")
  // en el campo Java 'password' para funcionar.
  contrasena: string;
}


// --- II. RECETAS (REQ. 2) ---

// Sub-interfaz para los ingredientes dentro de la receta
export interface IngredienteDTO {
  nombre: string;
  cantidad: number;
  unidad: string;
}

// 2. DTO de Creación (Input para POST /recetas)
export interface RecetaCreacionDTO {
  titulo: string;
  descripcion: string;
  imagen: string;

  tiempoPreparacion: string;
  dificultad: string;
  tipoDieta: string;

  usuarioId: number;
  categoriaId: number;

  ingredientes: IngredienteDTO[];
}


// --- III. HISTORIAL Y OTROS (Resolución de TS2305) ---

// 3. DTO de Registro Historial
export interface HistorialRegistroDTO {
  idReceta: number;
  fechaCocinado?: string;
  comentario?: string;
}

// 🚨 FIX 2: Interfaz HistorialDTO faltante (Resolución de TS2305)
export interface HistorialDTO {
  id: number;
  idReceta: number;
  nombreReceta: string;
  fechaCocinado: string;
  // Añade otros campos que devuelva el GET /historial
}

// 4. Item Lista Compra
export interface ItemListaCompraDTO {
  // 🚨 FIX 3: Corregir de 'nombreIngrediente' a 'nombre' para que coincida con carrito.service.ts
  nombre: string;
  cantidad: number;
  unidad: string;
}

// 5. Estadísticas
export interface EstadisticaIngredienteDTO {
  nombre: string;
  recetasContadas: number;
}

export interface EstadisticaUsuarioDTO {
  nombreUsuario: string;
  recetasFavoritasContadas: number;
}

// 🚨 FIX 4: Interfaz Preferencia faltante (Resolución de TS2305)
export interface Preferencia {
  id: number;
  nombre: string; // Ej: "Vegano"
}
