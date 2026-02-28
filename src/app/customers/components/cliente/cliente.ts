import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-cliente',
  imports: [RouterOutlet],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente implements OnInit {
  public clienteService = inject(ClienteService);
  ngOnInit() {
    this.clienteService.cargarClientes();
  }
}
