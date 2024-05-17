import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { Task } from '../../../../common/task.interface';

const tasks: Task[] = [
    {
      id: '1',
      title: 'Initial Task',
      users: [],
      description: 'This is an initial task.',
      createdAt: new Date(),
      updatedAt: new Date(),
      endTask: new Date(),
      status: { title: 'pending', color: 'grey' },
      project: {
        id: '1',
        title: 'Project 1',
        description: 'Description of Project 1',
        startDate: new Date(),
        endDate: new Date(),
        tasks: [],
        users: [],
        managers: [],
        status: [{ title: 'pending', color: 'grey' }]
      },
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Second Task',
      users: [],
      description: 'This is a second task.',
      createdAt: new Date(),
      updatedAt: new Date(),
      endTask: new Date(),
      status: { title: 'pending', color: 'grey' },
      project: {
        id: '2',
        title: 'Project 2',
        description: 'Description of Project 2',
        startDate: new Date(),
        endDate: new Date(),
        tasks: [],
        users: [],
        managers: [],
        status: [{ title: 'pending', color: 'grey' }]
      },
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Third Task',
      users: [],
      description: 'This is a third task.',
      createdAt: new Date(),
      updatedAt: new Date(),
      endTask: new Date(),
      status: { title: 'pending', color: 'grey' },
      project: {
        id: '1',
        title: 'Project 1',
        description: 'Description of Project 3',
        startDate: new Date(),
        endDate: new Date(),
        tasks: [],
        users: [],
        managers: [],
        status: [{ title: 'pending', color: 'grey' }]
      },
      priority: 'medium'
    }
  ];

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  http = inject(HttpClient);

  tasks: Task[] = [];

  constructor() {
    this.getTasks();
    setTimeout(() => {
      console.log('List of all task', this.tasks);
    }, 1000);
  }

  getTasks() {
    of(tasks).subscribe((tasks) => {
      this.tasks = tasks;
    });
    /* this.http.get<Task[]>('tasks').subscribe((tasks) => {
      this.tasks = tasks;
    }); */
    console.log('List of all task', this.tasks);
    return this.tasks;
  }

  getTask(id: string) {
    console.log('Task with id', id, this.tasks.find(task => task.id === id));
    return this.tasks.find(task => task.id === id);
  }

  getTasksByProject(projectId: string) {
    console.log('Tasks of project', projectId, this.tasks.filter(task => task.project.id === projectId));
    return this.tasks.filter(task => task.project.id === projectId);
  }

  getTasksByUser(userId: string) {
    console.log('Tasks of user', userId, this.tasks.filter(task => task.users.find(user => user.id === userId)));
    return this.tasks.filter(task => task.users.find(user => user.id === userId));
  }

}
