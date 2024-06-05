import { Component, Input } from '@angular/core';
import { Project } from '../interfaces/projet.interface';

@Component({
  selector: 'projet-card',
  standalone: true,
  imports: [],
  templateUrl: './projet-card.component.html',
  styleUrl: './projet-card.component.css'
})
export class ProjetCardComponent {
  @Input() projet!: Project;

  constructor() { }

}
