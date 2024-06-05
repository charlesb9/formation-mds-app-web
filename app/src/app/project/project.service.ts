import { Injectable } from '@angular/core';
import { Project, ProjectForm } from '../interfaces/projet.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Project[]> {
    return this.http.get<{data: Project[]}>(`${environment.apiUrl}/project`).pipe(
      map((response) => response.data),
    );
  }

  getOne(id: string): Observable<Project> {
    return this.http.get<{data: Project}>(`${environment.apiUrl}/project/${id}`).pipe(
      map((response) => response.data),
    );
  }

  save(project: Project) {
    this.projects.push(project);
    this.http.post(`${environment.apiUrl}/project`, project).subscribe();
  }
}
