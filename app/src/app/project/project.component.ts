import { ProjectForm, Task, TaskForm, StatusForm, Project } from './../interfaces/projet.interface';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from './project.service';
import { ActivatedRoute } from '@angular/router';
import { AppModal } from 'src/app/components/modal.component';
import {ButtonComponent} from 'src/app/components/button.component';
import { DatePickerComponent } from 'src/app/components/date-picker.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppModal,
    ButtonComponent,
    DatePickerComponent,
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
  project: Project = {
    _id: "",
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    tasks: [],
    status: []
  };
  
  projectForm = new FormGroup<ProjectForm>({
    title: new FormControl("",{nonNullable : true}),
    description: new FormControl("",{nonNullable : true}),
    tasks: new FormArray<FormGroup<TaskForm>>([]),
    status: new FormArray<FormControl<{name: string, color: string}>>([]),
    startDate: new FormControl(new Date(), {nonNullable: true}),
    endDate: new FormControl(new Date(), {nonNullable: true})
  }, {updateOn: 'blur'})

  statusForm = new FormGroup<StatusForm>({
    title: new FormControl("", {nonNullable: true}),
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
      this.project = project;
    })
  }

  addStatus(status: {title: string, color: string}) {
    this.project.status.push(status);
    this.projectService.update(this.project).subscribe((project) => {
      this.project = project;
    });
  }

  setShowAddProject() {
    this.showProjectModal = !this.showProjectModal;
    if (!this.showProjectModal) this.reset();
  }

  reset() {
    this.projectForm.reset();
  }

  get projet() {
    return this.projectForm.value;
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
    this.projectForm.controls.tasks.push(form);
  }


  save(event: Event) {
    event.preventDefault();
    this.projectService.save(this.projectForm.getRawValue()).subscribe((project) => {
      console.log(project);
    });
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
