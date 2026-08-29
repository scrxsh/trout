import { CommonModule } from '@angular/common';
import { Component, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Alerta, EstadoAlerta, TipoAlerta } from './models/alerts.model';
import { AlertasService } from './services/alertas.service';
import { AlertModal } from './components/alert-modal/alert-modal';

@Component({
  selector: 'app-events',
  imports: [CommonModule, FormsModule, AlertModal],
  templateUrl: './events.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './events.css',
})


export class Events {

  private readonly alertasService = inject(AlertasService);

  readonly alertasResource = rxResource({
    stream: () => this.alertasService.getAlertas()
  });

  tiposAlerta: TipoAlerta[] = ['Critica', 'Advertencia', 'Informativa'];
  estadosAlerta: EstadoAlerta[] = ['Activa', 'Programada', 'Resuelta', 'Completada'];
//Estados visuales
  mostrarModal = signal(false);
  editandoAlerta = signal<Alerta | null>(null);

  bordeAlerta: Record<string, string> = {
    'Critica': 'border-[#f73e44]',
    'Advertencia': 'border-yellow-500',
    'Informativa': 'border-green-500',
  };

  colorAlerta: Record<string, string> = {
    'Critica': 'bg-red-500',
    'Advertencia': 'bg-yellow-500',
    'Informativa': 'bg-green-500',
  };

  colorEstado: Record<string, string> = {
    'Activa': 'bg-red-100 text-red-700',
    'Programada': 'bg-cyan-100 text-cyan-700',
    'Resuelta': 'bg-gray-100 text-gray-600',
    'Completada': 'bg-emerald-100 text-emerald-700',
  }

//Filtros
  buscarTermino = signal('');
  filtroTipo = signal<TipoAlerta | 'Todas'>('Todas');
  filtroEstado = signal<EstadoAlerta | 'Todos'>('Todos');
  mostrarFiltros = signal(false);


//Datos del backend
  alertasDestacadas = computed(() => {
    const alertas = this.alertasResource.value() ?? [];
    return alertas.filter((a) => a.destacada).slice(0,3);
  });

//Filtrar las alertas
  alertasFiltradas = computed(() => {
    const termino = this.buscarTermino().toLowerCase();
    const tipo = this.filtroTipo();
    const estado = this.filtroEstado();
    const alertas = this.alertasResource.value() ?? [];
    const idDestacadasMostrads = new Set(this.alertasDestacadas().map(a => a.id));

    return alertas
          .filter((a) => !idDestacadasMostrads.has(a.id))
          .filter((a) => a.titulo.toLowerCase().includes(termino) || a.descripcion.toLowerCase().includes(termino))
          .filter((a) => tipo === 'Todas' || a.tipo === tipo)
          .filter((a) =>  estado === 'Todos' || a.estado === estado)
    });

//Metodos para la modal
  abrirNueva(){
    this.editandoAlerta.set(null);
    this.mostrarModal.set(true);
  }

  abrirEditar(alerta: Alerta){
    this.editandoAlerta.set(alerta);
    this.mostrarModal.set(true);
  }

  cerrarModal(){
    this.mostrarModal.set(false);
    this.editandoAlerta.set(null);
  }


  guardarAlerta(datosGenerados: Omit<Alerta, 'id'>) {
    const editando = this.editandoAlerta();

    if (editando) {
      this.alertasService.actualizarAlerta(editando.id, { ...editando, ...datosGenerados }).subscribe({
        next: (alertaActualizada) => {
          // Actualización optimista del recurso
          this.alertasResource.value.update((lista) =>
            (lista ?? []).map((a) => (a.id === alertaActualizada.id ? alertaActualizada : a))
          );
          this.cerrarModal();
        }
      });
    } else {
      this.alertasService.crearAlerta(datosGenerados).subscribe({
        next: (nuevaAlerta) => {
          // Inserción optimista del recurso
          this.alertasResource.value.update((lista) => [nuevaAlerta, ...(lista ?? [])]);
          this.cerrarModal();
        }
      });
    }
  }

  eliminarAlerta(id: number){
    this.alertasService.eliminarAlerta(id).subscribe({
      next: () => {
        this.alertasResource.value.update((lista) => (lista ?? []).filter((a) => a.id !== id)
        );
      }
    });
  }

  featuredCardClass(tipo: TipoAlerta): string {
    const map: Record<TipoAlerta, string> = {
      Critica: 'featured-card--red',
      Advertencia: 'featured-card--yellow',
      Informativa: 'featured-card--green',
    };
    return map[tipo];
  }

  iconPath(tipo: TipoAlerta): string {
    const paths: Record<TipoAlerta, string> = {
      Critica: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
      Advertencia: 'M12 10.5v3.75m0 0h.008v.008H12v-.008zm.375-9.75a9 9 0 110 18 9 9 0 010-18zm0 0V3m0 1.5v.75',
      Informativa: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z',
    };
    return paths[tipo];
  }

}
