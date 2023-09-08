export class Note {
  public id: number;
  public title: string;
  public content: string;
  public createdAt: string;
  public isPinned: boolean;
  public color: string;

  constructor(title: string, content: string, createdAt: string, color: string) {
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.color = color;
  }
}
