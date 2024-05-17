import { Component, inject } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { Project } from '../interfaces/projet.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  projectService = inject(ProjectService);
  projects: Project[] = [];

  ngOnInit() {
    const projects = this.projectService.get();
    if (projects) {
      this.projects = projects; 
      console.log(this.projects);
    }
  }

}
