export type EventDetails = {
  key: string;
  title: string;
  description: string;
  executionTime: number;
  date: number;
  isCyclic: boolean;
  cyclicTime: number;
  isNotification: boolean;
  notificationTime: number;
  priority: number;
  updatedAt: number;
  createdAt: number;
  userUid: string;
  days: object;
  active: boolean;
  deleted: boolean;
};
