import { Injectable } from '@angular/core';
import { Project } from '../interfaces/projet.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];

  constructor(private http: HttpClient) { }

  get() {
    const response = this.http.get<Project[]>(`${environment.apiUrl}/project`).subscribe(projects => this.projects = projects)
    return this.projects;
  }

  save(project: Project) {
    this.projects.push(project);
    this.http.post(`${environment.apiUrl}/project`, project).subscribe();
  }
}
