import { Component, inject } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { Project } from '../interfaces/projet.interface';
import { ProjetCardComponent } from '../projet-card/projet-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProjetCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  projectService = inject(ProjectService);
  projects: Project[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAll().subscribe((projects) => {
      console.log(projects);
      projects.forEach(project => {
        this.projects.push(project);
      });
    });
  }

  redirectToProject(id: string) {
    this.router.navigate([`/project/${id}`]);
  }

}
