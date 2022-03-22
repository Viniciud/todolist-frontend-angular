export interface TaskModel {
  title: string;
  description: string;
  deadline: string;
}

export interface TaskListModel {
  id: number;
  title: string;
  description: string;
  deadline: string;
  createdAt?: string;
  completedAt?: string;
}


