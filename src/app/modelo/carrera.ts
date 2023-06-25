import { Materia } from "./materia";

export class Carrera {
  id?: number;
  descripcion: string = '';
  duracion?: number;
  fecha_creacion?: Date;
  creacion_usuario_id?: number;
  fecha_modificion?: Date;
  modificacion_usuario_id?: number;
  materia?: Materia[];
}

