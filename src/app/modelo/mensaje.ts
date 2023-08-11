export interface Mensaje {
    hora:      string;
    id:        string;
    respuesta: Respuesta;
  }
  export interface Respuesta {
    answer?:       string;
    id?:           number;
    moreOptions?:  boolean;
    moreQuestion?: boolean;
    options?:      string;
    response:     string;
  }
  