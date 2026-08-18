export type AlertType = 'Critica' | 'Advertencia' | 'Informativa';
export type AlertStatus = 'Activa' | 'Programada' | 'Resuelta' | 'Completada';

export interface Alert {
    id: string;
    title: string;
    description: string;
    date: string;
    type: AlertType;
    status: AlertStatus;
    featured?: boolean;
}