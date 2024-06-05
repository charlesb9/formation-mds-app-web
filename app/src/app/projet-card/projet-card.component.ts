import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() redirect = new EventEmitter<string>();

  constructor() {}

  redirectToProject(id: string) {
    this.redirect.emit(id);
  }
}
