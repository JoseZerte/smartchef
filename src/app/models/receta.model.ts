// 1. Definimos el objeto de Ingrediente tal como sale en tu JSON (plano, sin anidar)
export interface IngredienteDTO {
  nombre: string;
  cantidad: number;
  unidad: string;
  // id es opcional porque a veces el DTO de salida no lo manda en la lista simplificada
  id?: number;
}

// 2. Tu modelo de Receta principal (Adaptado al JSON real de tu Backend)
export interface Receta {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;

  // 🚨 CORREGIDO: Tu backend envía CamelCase, no snake_case
  tiempoPreparacion: string;
  dificultad: string;
  tipoDieta: string;
  fechaCreacion: string;

  // IDs de relación
  usuarioId: number;
  categoriaId: number;

  // 🚨 CORREGIDO: Tu backend envía una lista llamada "ingredientes"
  // y dentro tiene objetos planos (IngredienteDTO), no "ingrediente.nombre"
  ingredientes: IngredienteDTO[];

  // Campos opcionales
  preferencias?: string[];
  tags?: string[];

  // Objetos opcionales por si el backend cambia y envía el objeto entero
  usuario?: any;
  categoria?: any;
}

// 3. Mantenemos tus interfaces extra SIN CAMBIOS (para no romper otras pantallas)
export interface RecetaFavorita {
  id: number;
  titulo: string;
  usuarioId: number;
  liked?: boolean;
  imagen?: string;
  nombre?: string;
}

export interface RecetaCocinada {
  id: number;
  titulo: string;
  imagen: string;
  fecha: string;
  liked?: boolean;
}
