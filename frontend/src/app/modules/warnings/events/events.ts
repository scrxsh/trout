import { CommonModule} from '@angular/common';
import { Component, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alert, AlertStatus, AlertType} from './events-model';

@Component({
  selector: 'app-events',
  imports: [CommonModule, FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events implements OnInit {
  //Mostrar el modal para la señal
  showModal = signal(false);
  //Editar la alerta
  editingAlert = signal<Alert | null>(null);

  //Formulario estatico sin backend 
  form = signal<Omit<Alert, 'id'>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Informativa',
    status: 'Activa',
    featured: false,
  });

  //Filtros de las alertas
  searchTerm = signal('');
  filterType = signal<AlertType | 'Todas'>('Todas');
  filterStatus = signal<AlertStatus | 'Todas'>('Todas');
  showFilterPanel = signal(false);

  //Llenar el JSON de las alertas
  alerts = signal<Alert[]>([
    {
      id: '1',
      title: 'Aumento de casos de gripe en la comunidad',
      description:
        'Se ha detectado un incremento del 40% en casos de gripe en el último mes.',
      date: '2024-10-25',
      type: 'Critica',
      status: 'Activa',
      featured: true,
    },
    {
      id: '2',
      title: 'Picos de calor la próxima semana',
      description:
        'Temperaturas esperadas de hasta 35°C. Recomendaciones de hidratación.',
      date: '2024-10-24',
      type: 'Advertencia',
      status: 'Activa',
      featured: true,
    },
    {
      id: '3',
      title: 'Nueva campaña de vacunación',
      description:
        'Disponible en el centro comunitario del 20 al 30 de octubre.',
      date: '2024-10-23',
      type: 'Informativa',
      status: 'Programada',
      featured: true,
    },
    {
      id: '4',
      title: 'Brote de dengue en zona norte',
      description: 'Se reportaron 15 casos confirmados en el sector norte.',
      date: '2024-10-20',
      type: 'Critica',
      status: 'Resuelta',
    },
    {
      id: '5',
      title: 'Lluvias intensas esperadas',
      description:
        'Precipitaciones de hasta 80mm durante el fin de semana.',
      date: '2024-10-15',
      type: 'Advertencia',
      status: 'Resuelta',
    },
    {
      id: '6',
      title: 'Jornada de salud mental',
      description:
        'Actividad gratuita de bienestar emocional para toda la comunidad.',
      date: '2024-10-10',
      type: 'Informativa',
      status: 'Completada',
    },
  ]);

  // ── Featured alerts (top cards) ──────────────────────────
  featuredAlerts = computed(() =>
    this.alerts().filter((a) => a.featured)
  );

  // ── Filtered table rows ──────────────────────────────────
  filteredAlerts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const type = this.filterType();
    const status = this.filterStatus();

    return this.alerts()
      .filter((a) => !a.featured)
      .filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.description.toLowerCase().includes(term)
      )
      .filter((a) => type === 'Todas' || a.type === type)
      .filter((a) => status === 'Todas' || a.status === status);
  });

  alertTypes: AlertType[] = ['Critica', 'Advertencia', 'Informativa'];
  alertStatuses: AlertStatus[] = [
    'Activa',
    'Programada',
    'Resuelta',
    'Completada',
  ];
 
  ngOnInit() {}
 
  // ── CRUD ─────────────────────────────────────────────────
  openNew() {
    this.editingAlert.set(null);
    this.form.set({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      type: 'Informativa',
      status: 'Activa',
      featured: false,
    });
    this.showModal.set(true);
  }
 
  openEdit(alert: Alert) {
    this.editingAlert.set(alert);
    this.form.set({ ...alert });
    this.showModal.set(true);
  }
 
  closeModal() {
    this.showModal.set(false);
    this.editingAlert.set(null);
  }
 
  saveAlert() {
    const f = this.form();
    if (!f.title.trim() || !f.description.trim()) return;
 
    const editing = this.editingAlert();
    if (editing) {
      this.alerts.update((list) =>
        list.map((a) => (a.id === editing.id ? { ...a, ...f } : a))
      );
    } else {
      const newAlert: Alert = {
        ...f,
        id: Date.now().toString(),
      };
      this.alerts.update((list) => [newAlert, ...list]);
    }
    this.closeModal();
  }
 
  deleteAlert(id: string) {
    this.alerts.update((list) => list.filter((a) => a.id !== id));
  }
 
  // ── Patch form field ─────────────────────────────────────
  patchForm(patch: Partial<Omit<Alert, 'id'>>) {
    this.form.update((f) => ({ ...f, ...patch }));
  }
 
  // ── Style helpers ─────────────────────────────────────────
  featuredCardClass(type: AlertType): string {
    const map: Record<AlertType, string> = {
      Critica: 'featured-card--red',
      Advertencia: 'featured-card--yellow',
      Informativa: 'featured-card--green',
    };
    return map[type];
  }
 
  featuredIconClass(type: AlertType): string {
    const map: Record<AlertType, string> = {
      Critica: 'icon-critica',
      Advertencia: 'icon-advertencia',
      Informativa: 'icon-informativa',
    };
    return map[type];
  }
 
  typeBadgeClass(type: AlertType): string {
    const map: Record<AlertType, string> = {
      Critica: 'badge badge--red',
      Advertencia: 'badge badge--yellow',
      Informativa: 'badge badge--blue',
    };
    return map[type];
  }

  
  statusBadgeClass(status: AlertStatus): string {
    const map: Record<AlertStatus, string> = {
      Activa: 'badge badge--red',
      Programada: 'badge badge--teal',
      Resuelta: 'badge badge--gray',
      Completada: 'badge badge--green',
    };
    return map[status];
  }

  featuredStatusLabel(status: AlertStatus): string {
    return status;
  }

  featuredStatusClass(status: AlertStatus): string {
    const map: Record<AlertStatus, string> = {
      Activa: 'status-pill status-pill--activa',
      Programada: 'status-pill status-pill--programada',
      Resuelta: 'status-pill status-pill--resuelta',
      Completada: 'status-pill status-pill--completada',
    };
    return map[status];
  }

  // ── Icon SVG path helpers ─────────────────────────────────
  iconPath(type: AlertType): string {
    const paths: Record<AlertType, string> = {
      Critica:
        'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
      Advertencia:
        'M12 10.5v3.75m0 0h.008v.008H12v-.008zm.375-9.75a9 9 0 110 18 9 9 0 010-18zm0 0V3m0 1.5v.75',
      Informativa:
        'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z',
    };
    return paths[type];
  }
}
