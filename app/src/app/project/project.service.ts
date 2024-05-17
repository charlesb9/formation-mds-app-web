import { Injectable } from '@angular/core';
import { Project } from '../interfaces/projet.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  get() {
    let value = localStorage.getItem("project");
    if (value) {
      return JSON.parse(value) as Project;
    }
    return undefined;
  }

  update(project: Project) {
    console.log("data updated");
    return localStorage.setItem("project", JSON.stringify(project));
  }
}
