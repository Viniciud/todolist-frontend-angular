import { SimpleStorageService } from './../../core/SimpleStorage/simple-storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/shared/services/task/task.service';
import { TaskListModel } from 'src/shared/models/task.model';
@Component({
  selector: 'app-modal-form-task',
  templateUrl: './modal-form-task.component.html',
  styleUrls: ['./modal-form-task.component.css']
})
export class ModalFormTaskComponent implements OnInit {
  formGroup: FormGroup = this.formBuilder.group({
    title: new FormControl(null),
    description: new FormControl(null),
    deadline: new FormControl(null),
  });

  option: Boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalFormTaskComponent>,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private simpleStorage: SimpleStorageService
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  showTaskToEdit: TaskListModel = new TaskListModel;

  ngOnInit(): void {
    this.showTaskToEdit.id = null;
    this.showTaskToEdit.title = null;
    this.showTaskToEdit.description = null;
    this.showTaskToEdit.deadline = null;
    let taskToEdit: TaskListModel = this.simpleStorage.getData('taskToEdit');
    if(taskToEdit != undefined) {
      this.showTaskToEdit = taskToEdit;
    }
  }

  confirmarOperacao(value: boolean) {
    this.option = value;
    this.dialogRef.close(value);

    if(value == true) {
      if(this.data.type == 1) {
        this.addTask();
      }
      else if(this.data.type == 2) {
        this.editTask();
      }
    }
  }

  public addTask() {
    console.log('FORMGROUP ', this.formGroup.value);
    this.simpleStorage.setData('taskToCreate', this.formGroup.value);
  }

  public editTask() {
    console.log('FORMGROUP ', this.formGroup.value);
    this.simpleStorage.setData('taskToEdit', this.formGroup.value);
  }
}
