export interface TaskModel {
  title: string;
  description: string;
  deadline: string;
}

export class TaskListModel {
  id: string | any;
  title: string | any;
  description: string | any;
  deadline: string | any;
  createdAt?: string;
  completedAt?: string;
}


