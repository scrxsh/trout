import { Component } from '@angular/core';
import { Facts } from './table.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {

  facts: Facts[] = [
    {id: 1, description: 'Hacinamiento domiciliario', icon: 'home_work', state: 'Crítico', percent: 88},
    {id: 2, description: 'Disponibilidad de acueducto potable', icon: 'water_drop', state: 'Alto', percent: 76},
    {id: 3, description: 'Adherencia al esquema de vacunación', icon: 'vaccines', state: 'Moderado', percent: 62},
    {id: 4, description: 'Retraso en la anteción', icon: 'schedule', state: 'En control', percent: 45},
    {id: 5, description: 'Contaminación del aire', icon: 'air_purifier_gen', state: 'Bajo', percent: 28}
  ]

  stateColor: Record<string, string> = {
    'Crítico': 'text-red-500',
    'Alto': 'text-blue-500',
    'Moderado': 'text-cyan-500',
    'En control': 'text-yellow-500',
    'Bajo': 'text-gray-500'
  };

  bgStateColor: Record<string, string> = {
    'Crítico': 'bg-red-500',
    'Alto': 'bg-blue-500',
    'Moderado': 'bg-cyan-500',
    'En control': 'bg-yellow-500',
    'Bajo': 'bg-gray-500'
  };

  spanFact: Record<string, string> = {
    'Crítico': 'text-red-700 bg-red-50 border-red-100',
    'Alto': 'text-blue-700 bg-blue-50 border-blue-100',
    'Moderado': 'text-cyan-700 bg-cyan-50 border-cyan-100',
    'En control': 'text-yellow-700 bg-yellow-50 border-yellow-100',
    'Bajo': 'text-gray-700 bg-gray-50 border-gray-100'
  }
}
