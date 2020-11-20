export class Message {
  header: string;
  content: Object;
}

export enum Header {
  Directive = 'directive',
  Data = 'data',
}
