export class Note {
  public id: number;
  public title: string;
  public content: string;
  public createdAt: string;

  constructor(title: string, content: string, createdAt: string) {
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}
