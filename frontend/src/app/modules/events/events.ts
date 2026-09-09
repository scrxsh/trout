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
    const idDestacadasMostradas = new Set(this.alertasDestacadas().map(a => a.id));

    return alertas
          .filter((a) => !idDestacadasMostradas.has(a.id))
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



}
