export interface RecetaIngrediente {
  id: number;
  cantidad: number;
  unidad: string;
  ingrediente: {
    id: number;
    nombre: string;
  };
}

export interface Receta {
  id: number;
  titulo: string; // <-- coincide con el backend
  descripcion: string;
  imagen: string;
  tiempo_preparacion: string;
  dificultad: string;
  tipo_dieta: string;
  fecha_creacion: string;
  usuarioId: number;
  categoriaId: number;
  ingredientesReceta: RecetaIngrediente[]; // <-- coincide con backend
  preferencias?: string[];
  tags?: string[];
}

export interface RecetaFavorita {
  id: number;
  titulo: string;
  usuarioId: number;
  liked?: boolean;
  imagen?: string;  // <-- añadimos opcional
  nombre?: string;  // <-- opcional si quieres compatibilidad con templates antiguos
}


export interface RecetaCocinada {
  id: number;
  titulo: string;   // <-- antes era 'nombre'
  imagen: string;
  fecha: string;
  liked?: boolean;  // opcional, para UI
}

