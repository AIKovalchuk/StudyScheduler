import { TaskCategoryType } from ".";

export type TaskType = {
  id: string;
  title: string;
  date: string;
  startedAt: string;
  closedAt?: string;
  type: TaskCategoryType;
  comment?: string;
};
