import { DueObject } from './DueObject';

export interface TodoItem {
  id: number;
  url?: string;
  order?: number;
  due: DueObject;
  content: string;
  priority?: number;
  parentId?: number;
  assignee?: number;
  assigner?: number;
  sectionId?: number;
  projectId?: number;
  completed: boolean;
  commentCount?: number;
  description?: string;
  labelsId?: Array<number>;
}
