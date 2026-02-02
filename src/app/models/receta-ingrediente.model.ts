//porfavor que con esto funcione ya eh
import { Ingrediente } from './ingrediente.model'; // Importar el modelo básico

export interface IngredienteReceta {
  id: number;
  cantidad: number;
  unidad: string;

  // 🚨 CLAVE: Aquí se anida el Ingrediente real
  ingrediente: Ingrediente;


}
