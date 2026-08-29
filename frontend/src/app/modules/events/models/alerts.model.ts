export type TipoAlerta = 'Critica' | 'Advertencia' | 'Informativa';
export type EstadoAlerta = 'Activa' | 'Programada' | 'Resuelta' | 'Completada';

export interface Alerta {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    tipo: TipoAlerta;
    estado: EstadoAlerta;
    destacada: boolean;
}
