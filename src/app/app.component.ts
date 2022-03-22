import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { TaskListModel } from 'src/shared/models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo-frontend';

  todo: TaskListModel[] = [
    {
      id: 1,
      title: 'Task 1',
      deadline: '20/02/2020',
      description: 'Ir na loja comprar algo',
    },
    {
      id: 2,
      title: 'Task 2',
      deadline: '20/02/2020',
      description: 'Ir na loja comprar algo',
    },
    {
      id: 3,
      title: 'Task 3',
      deadline: '20/02/2020',
      description: 'Ir na loja comprar algo',
    },
    {
      id: 4,
      title: 'Task 4',
      deadline: '20/02/2020',
      description: 'Ir na loja comprar algo',
    },
  ];

  done: TaskListModel[] = [];

  @ViewChild(MatAccordion) accordion: MatAccordion | any;

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      console.log('EVENT ', event);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('EVENT ', event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addTask() {
    console.log('ADD task');
  }
}
