import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';
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

  constructor() {
    this.getTasks().subscribe(
      (tasks) => {
        console.log('Tasks', tasks);
      }
    );
  }

  getTasks() {
    return of(tasks).pipe(
      map((tasks) => tasks.filter(task => task.id && task.title))
    );
    /* return this.http.get<Task[]>('tasks') */
  }

}
