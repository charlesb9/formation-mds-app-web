import { Injectable } from '@angular/core';
import { Project } from '../interfaces/projet.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];

  constructor() { }

  get() {
    let value = localStorage.getItem("project");
    if (value) {
      this.projects = JSON.parse(value);
      return this.projects;
    }
    return undefined;
  }

  save(project: Project) {
    this.projects.push(project);
    return localStorage.setItem("project", JSON.stringify(this.projects));
  }
}
