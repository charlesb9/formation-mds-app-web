import { Component, inject } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [],
  template: `
    <p>
      tasklist works!
    </p>
  `,
  styles: ``
})
export class TasklistComponent {
  service = inject(TaskService);

}
