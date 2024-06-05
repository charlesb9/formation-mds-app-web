import { TaskService } from './task.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../../common/task.interface';


@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule,
  ],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.scss'
})
export class TaskformComponent implements OnInit{

  TaskService = inject(TaskService);

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      users: this.fb.array([]),
      description: [''],
      endTask: ['', Validators.required],
      status: ['pending', Validators.required],
      project: ['', Validators.required],
      priority: ['medium', Validators.required]
    });
}

ngOnInit(): void {}

  get users(): FormArray {
    return this.taskForm.get('users') as FormArray;
  }

  addUser() {
    const user = this.fb.group({
      name: ['', Validators.required],
    });
    this.users.push(user);
  }

  removeUser(index: number) {
    this.users.removeAt(index);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: '',
        title: this.taskForm.value.title,
        users: this.taskForm.value.users,
        description: this.taskForm.value.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        endTask: this.taskForm.value.endTask,
        status: this.taskForm.value.status,
        project: this.taskForm.value.project,
        priority: this.taskForm.value.priority
      };
      console.log(newTask);
      this.TaskService.createTask(newTask);
    }
  }
}