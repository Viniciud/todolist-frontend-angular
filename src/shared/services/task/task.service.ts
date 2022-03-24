import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaskListModel, TaskModel } from 'src/shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<TaskListModel[]>(`${environment.API_BASE_URL}/tasks`);
  }

  getTaskById(id: string) {
    return this.http.get<TaskListModel>(`${environment.API_BASE_URL}/tasks/${id}`);
  }

  createTask(newTask: TaskModel) {
    return this.http.post<TaskModel>(`${environment.API_BASE_URL}/tasks`, newTask);
  }

  editTask(id: string, editedTask: TaskModel) {
    return this.http.put<TaskModel>(`${environment.API_BASE_URL}/tasks/${id}`, editedTask);
  }

  deleteTask(id: string) {
    return this.http.delete(`${environment.API_BASE_URL}/tasks/${id}`);
  }

  completeTask(id: string) {
    return this.http.patch(`${environment.API_BASE_URL}/tasks/${id}/completed`,{});
  }

}
