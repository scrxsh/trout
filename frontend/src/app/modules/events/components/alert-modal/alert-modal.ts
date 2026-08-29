import { Component, input, output, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Alerta, EstadoAlerta, TipoAlerta} from '../../models/alerts.model'

@Component({
  selector: 'app-alert-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './alert-modal.html',
  styleUrl: './alert-modal.css',
})
export class AlertModal {

  alerta = input<Alerta|null>(null);
  cerrar = output<void>();
  guardar = output<Omit<Alerta, 'id'>>();

  tiposAlerta: TipoAlerta[] = ['Critica', 'Advertencia', 'Informativa'];
  estadosAlerta: EstadoAlerta[] = ['Activa', 'Programada', 'Resuelta', 'Completada'];

  //Formulario reactivo con Signals, (placeholder)
  form = signal<Omit<Alerta, 'id'>>({
    titulo: '',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0],
    tipo: 'Informativa',
    estado: 'Activa',
    destacada: false,
  });

  constructor(){
    effect(() => {
      const a = this.alerta();
      if(a){
        this.form.set({ ...a })
      } else {
          this.form.set({
          titulo: '',
          descripcion: '',
          fecha: new Date().toISOString().split('T')[0],
          tipo: 'Informativa',
          estado: 'Activa',
          destacada: false,
        });
      }
    });
  }

  patchForm(patch: Partial<Omit<Alerta, 'id'>>) {
    this.form.update((f) => ({ ...f, ...patch }));
  }

  onGuardar() {
    const f = this.form();
    if (!f.titulo.trim() || !f.descripcion.trim()) return;
    this.guardar.emit(f);
  }



}
