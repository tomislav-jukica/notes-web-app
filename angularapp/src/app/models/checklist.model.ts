import { ChecklistElement } from "./checklistElement.model";
import { Note } from "./note.model";

export class Checklist extends Note {

  constructor(title: string, createdAt: string, color: string, tags: string) {

    super();
    this.title = title;
    this.createdAt = createdAt;
    this.color = color;
    this.tags = tags;
  }

  public elements: ChecklistElement[];
}
