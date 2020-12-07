export interface Mae {
    id: string;
    nombre: string;
    apellido: string;
    carrera: string;
    inicio?: string;
}

export interface Horario extends Mae{
    MaeID: string;
    MatID: string;
    apellido: string;
    carrera: string;
    fin: string;
    inicio: string;
    nombreCompleto: string;
}

export interface Horarios {
    [hour: string]: Horario[];
}

export interface Materia {
    id: string;
    nombre: string;
    modalidad?: string;
}

export interface Evento {
    id: string;
}
