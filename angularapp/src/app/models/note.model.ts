export abstract class Note {
  public id: number;
  public title: string;
  public createdAt: string;
  public isPinned: boolean;
  public color: string;
  public tags: string;

}
export class NormalNote extends Note{
  public getContent(): string {
    return this.content;
  }

  public content: string;
  
  constructor(title: string, content: string, createdAt: string, color: string, tags:string) {
   
    super();
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.color = color;
    this.tags = tags;
  }
}
