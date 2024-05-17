import { JsonPipe } from '@angular/common';
import { ProjectForm, Task, TaskForm } from './../interfaces/projet.interface';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  projectService = inject(ProjectService);
  
  projetForm = new FormGroup<ProjectForm>({
    id: new FormControl("",{nonNullable : true}),
    title: new FormControl("",{nonNullable : true}),
    tasks: new FormArray<FormGroup<TaskForm>>([]),
    status: new FormArray<FormControl<string>>([])
  }, {updateOn: 'blur'})

  ngOnInit() {
    let project = this.projectService.get();
    if (project) {
      const {tasks, status, ...rest} = project;
      this.projetForm.patchValue(rest);
      tasks.forEach(task => this.addTask(task));
      status.forEach(s => this.addStatus(s));
    }
    this.projetForm.valueChanges.subscribe(e => {
      this.update();
    });
  }

  addStatus(status?: string) {
    let control : FormControl<string> = new FormControl("", {nonNullable: true});
    if (status) control.patchValue(status);
    this.projetForm.controls.status.push(control);
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


  update() {
    this.projectService.update(this.projetForm.getRawValue());
  }
  
}
