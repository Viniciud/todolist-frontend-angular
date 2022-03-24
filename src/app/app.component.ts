import { SimpleStorageService } from './core/SimpleStorage/simple-storage.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ConfirmDialogDataModel } from 'src/shared/models/data-modal.model';
import { TaskListModel } from 'src/shared/models/task.model';
import { TaskService } from 'src/shared/services/task/task.service';
import { ModalFormTaskComponent } from './components/modal-form-task/modal-form-task.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input() formGroup: FormGroup | any;

  dialogRef: any;

  dataModal = new ConfirmDialogDataModel();

  todo: TaskListModel[] = [];
  doing: TaskListModel[] = [];
  done: TaskListModel[] = [];

  data: TaskListModel[] = [];

  @ViewChild(MatAccordion) accordion: MatAccordion | any;

  constructor(
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private taskService: TaskService,
    private simpleStorage: SimpleStorageService,
    private _snackBar: MatSnackBar
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.updateTasks();
  }

  updateTasks() {
    this.todo = [];
    this.doing = [];
    this.done = [];
    this.data = [];

    this.taskService.getTasks().subscribe((result) => {
      this.data = result;

      this.data.map((item: TaskListModel) => {
        if (item.completedAt == null) {
          this.todo.push(item);
        } else {
          this.done.push(item);
        }
      });
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      console.log('EVENT ', event);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (event.previousContainer.id == 'cdk-drop-list-1') {
        this.openSnack('Não é permitido voltar uma tarefa!', 'errorSnackbar');
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        if (event.container.id == 'cdk-drop-list-1') {
          let item: TaskListModel = event.container.data[event.currentIndex];
          this.taskService.completeTask(item.id).subscribe(() => {
            this.openSnack('Tarefa completada com sucesso!', 'successSnackbar');
            this.updateTasks();
          });
        }
      }
    }
  }

  addTask() {
    this.openConfirmModal(
      'Nova Tarefa',
      'Preencha os campos',
      '',
      'Cancelar',
      'Salvar',
      1
    );
  }

  editTask(task: TaskListModel) {
    this.simpleStorage.setData('taskToEdit', task);
    this.openConfirmModal(
      'Nova Tarefa',
      'Preencha os campos',
      '',
      'Cancelar',
      'Salvar',
      2,
      task
    );
  }

  deleteTask(task: TaskListModel) {
    this.taskService.deleteTask(task.id).subscribe((result) => {
      this.openSnack(
        'Tarefa deletada com Sucesso!!',
        'successSnackbar'
      );
      this.updateTasks();
    },
    error => {
      this.openSnack(
        'Ocorreu algum erro, tente novamente!!',
        'errorSnackbar'
      );
      this.updateTasks();
    }
    )
  }

  openConfirmModal(
    title: string,
    subtitle: string,
    message: string,
    closeButton: string,
    confirmButton: string,
    type: number,
    task: any = null
  ) {
    this.dataModal.title = title;
    this.dataModal.subtitle = subtitle;
    this.dataModal.message = message;
    this.dataModal.closeButton = closeButton;
    this.dataModal.confirmButton = confirmButton;
    this.dataModal.type = type;

    let data = this.dataModal;

    /* istanbul ignore next */
    this.dialogRef = this.dialog.open(ModalFormTaskComponent, {
      data,
    });

    if (type == 1) {
      this.dialogRef.afterClosed().subscribe((option: any) => {
        this.confirmDialog(option, 1);
      });
    } else if (type == 2) {
      this.dialogRef.afterClosed().subscribe((option: any) => {
        this.confirmDialog(option, 2, task);
      });
    }
  }

  confirmDialog(option: boolean, type: number, data: any = null) {
    console.log('OPTION ', option);

    if (type == 1) {
      if (option == true) {
        let newTask = this.simpleStorage.getData('taskToCreate');

        this.taskService.createTask(newTask).subscribe(
          () => {
            this.openSnack(
              'Tarefa Cadastrada com Sucesso!!',
              'successSnackbar'
            );
            this.updateTasks();
          },
          (error) => {
            this.openSnack(
              'Ocorreu algum erro, tente novamente!!',
              'errorSnackbar'
            );
          }
        );
      }
    }
    else if(type == 2) {
      if (option == true) {
        let taskTosend: TaskListModel = this.simpleStorage.getData('taskToEdit');
        console.log('taskToEdit ', taskTosend)

        this.taskService.editTask(data.id, taskTosend).subscribe(
          () => {
            this.openSnack(
              'Tarefa Editada com Sucesso!!',
              'successSnackbar'
            );
            this.updateTasks();
          },
          (error) => {
            this.openSnack(
              'Ocorreu algum erro, tente novamente!!',
              'errorSnackbar'
            );
          }
        );
      }
    }
  }

  mapTaskToSend(taskToMap: TaskListModel) {
    let taskToSend: TaskListModel | any;
    taskToSend.title = taskToMap.title;
    taskToSend.description = taskToMap.description;
    taskToSend.deadline = taskToMap.deadline;

    return taskToSend;
  }

  openSnack(message: string, cssClass: string | any = null) {
    this._snackBar.open(message, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [cssClass, 'mat-accent'],
    });
  }
}
