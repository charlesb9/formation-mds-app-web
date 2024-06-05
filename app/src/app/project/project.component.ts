import { JsonPipe } from '@angular/common';
import { ProjectForm, Task, TaskForm, StatusForm } from './../interfaces/projet.interface';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  showProjectModal = false;
  showStatusModal = false;
  projectService = inject(ProjectService);
  randomId =  Math.floor(Math.random() * 1000000).toString();
  
  projetForm = new FormGroup<ProjectForm>({
    id: new FormControl(this.randomId, {nonNullable : true}),
    title: new FormControl("",{nonNullable : true}),
    description: new FormControl("",{nonNullable : true}),
    tasks: new FormArray<FormGroup<TaskForm>>([]),
    status: new FormArray<FormControl<{name: string, color: string}>>([]),
    startDate: new FormControl(new Date(), {nonNullable: true}),
    endDate: new FormControl(new Date(), {nonNullable: true})
  }, {updateOn: 'blur'})

  statusForm = new FormGroup<StatusForm>({
    name: new FormControl("", {nonNullable: true}),
    color: new FormControl("", {nonNullable: true})
  }, {updateOn: 'blur'})

  ngOnInit() {
    let projects = this.projectService.get();
    if (projects) {
      projects.forEach(project => {
        project.tasks.forEach(task => {
          this.addTask(task);
        });
        project.status.forEach(status => {
          this.addStatus(status);
        });
      })
    }
  }

  addStatus(status?: {name: string, color: string}) {
    let control : FormControl<{name: string, color: string}> = new FormControl({name: "", color: ""}, {nonNullable: true});
    if (status) control.patchValue(status);
    this.projetForm.controls.status.push(control);
  }

  setShowAddProject() {
    this.showProjectModal = !this.showProjectModal;
    if (!this.showProjectModal) this.reset();
  }

  reset() {
    this.projetForm.reset();
  }

  get projet() {
    return this.projetForm.value;
  }

  addTask(task?: Task) {
    let form = new FormGroup<TaskForm>({
      title: new FormControl("", {nonNullable: true}),
      description: new FormControl("", {nonNullable: true}),
      status: new FormControl("", {nonNullable: true}),
      start: new FormControl("", {nonNullable: true}),
      end: new FormControl("", {nonNullable: true})
    })
    if (task) form.patchValue(task);
    this.projetForm.controls.tasks.push(form);
  }


  save(event: Event) {
    event.preventDefault();
    this.projectService.save(this.projetForm.getRawValue());
    this.setShowAddProject();
    this.reset();
  }
  
  /** Modal Status */
  setShowAddStatus() {
    this.showStatusModal = !this.showStatusModal;
    if (!this.showStatusModal) this.reset();
  }
  saveStatus(event: Event) {
    event.preventDefault();
    this.addStatus(this.statusForm.getRawValue());
    this.setShowAddStatus();
    this.statusForm.reset();
  }
}
