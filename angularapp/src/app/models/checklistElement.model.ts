export class ChecklistElement {
  public title: string;
  public isChecked: boolean;

  constructor(title: string, isChecked: boolean) {
    this.title = title;
    this.isChecked = isChecked;
  }
}
