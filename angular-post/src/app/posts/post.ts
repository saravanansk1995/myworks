export interface Post {
  //id?: string,
  id?:number,
  userId?:number;
  title: string,
  body: string,
  date?:  Date,
  comments?: string[],
}
