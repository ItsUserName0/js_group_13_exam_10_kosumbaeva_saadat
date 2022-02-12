export class Comment {
  constructor(public id: string, public author: string, public description: string) {
  }
}

export interface CommentData {
  newsId: string,
  author: string | null,
  description: string,
}
