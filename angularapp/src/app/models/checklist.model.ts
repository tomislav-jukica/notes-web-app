import { ChecklistElement } from "./checklistElement.model";

export class Checklist {
  public id: number;
  public title: string;
  public createdAt: string;
  public isPinned: boolean;
  public color: string;
  public tags: string;
  public elements: ChecklistElement[];
}
