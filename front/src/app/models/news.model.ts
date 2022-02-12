export class News {
  constructor(public id: string, public title: string, public description: string, public image: string, public date: string) {
  }
}

export interface NewsData {
  [key: string]: any,
  title: string,
  description: string,
  image: File | null
}
