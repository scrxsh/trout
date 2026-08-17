import { Component } from '@angular/core';
import { LastReport } from './last-report/last-report';
import { Graphs } from "./graphs/graphs";
import { Kpis } from "./kpis/kpis";

@Component({
  selector: 'app-dashboard',
  imports: [LastReport, Graphs, Kpis],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
