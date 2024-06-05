import { Injectable } from '@angular/core';
import { Project } from '../interfaces/projet.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];

  constructor(private http: HttpClient) { }

  get(): Observable<Project[]> {
    return this.http.get<{data: Project[]}>(`${environment.apiUrl}/project`).pipe(
      map((response) => response.data),
    );
  }

  save(project: Project) {
    this.projects.push(project);
    this.http.post(`${environment.apiUrl}/project`, project).subscribe();
  }
}
