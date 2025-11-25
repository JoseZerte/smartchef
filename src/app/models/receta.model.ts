export interface Receta {
  id: number;
  nombre: string;
  imagen: string;
  dificultad: 'Muy baja' | 'Baja' | 'Media' | 'Alta';
  tiempo: string;
  ingredientes: string[];
}

export interface RecetaFavorita {
  id: number;
  nombre: string;
  imagen: string;
  liked: boolean;
}

