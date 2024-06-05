import { JsonPipe } from '@angular/common';
import { ProjectForm, Task, TaskForm, StatusForm, Project } from './../interfaces/projet.interface';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from './project.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {}

  showProjectModal = false;
  showStatusModal = false;
  projectService = inject(ProjectService);
  id : string = "";
  
  projetForm = new FormGroup<ProjectForm>({
    _id: new FormControl("", {nonNullable: true}),
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
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.loadProject();
      }
    });
    
  }

  loadProject() {
    this.projectService.getOne(this.id).subscribe((project) => {
      this.projetForm.patchValue(project);
    })
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
