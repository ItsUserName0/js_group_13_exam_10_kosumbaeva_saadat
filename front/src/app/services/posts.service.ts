import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject, tap } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../environments/environment';
import { News, NewsData } from '../models/news.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postsChange = new Subject<Post[]>();
  postsFetching = new Subject<boolean>();
  postRemoving = new Subject<boolean>();
  commentsChange = new Subject<Comment[]>();

  constructor(private http: HttpClient) {
  }

  fetchPosts() {
    this.postsFetching.next(true);
    this.http.get<Post[]>(environment.apiUrl + '/news').pipe(
      map(response => {
        return response.map(item => {
          return new Post(item.id, item.title, item.image, item.date);
        });
      })
    ).subscribe({
      next: (result => {
        this.postsChange.next(result);
        this.postsFetching.next(false);
      }),
      error: () => {
        this.postsFetching.next(false);
      }
    });
  }

  fetchNews(id: string) {
    return this.http.get<News | null>(environment.apiUrl + `/news/${id}`).pipe(
      map(result => {
        if (!result) return null;
        return new News(id, result.title, result.description, result.image, result.date);
      })
    )
  }

  fetchComments(id: string) {
    return this.http.get<Comment[]>(environment.apiUrl + `/comments?news_id=${id}`).pipe(
      map(result => {
        return result.map(item => {
          return new Comment(item.id, item.author, item.description);
        })
      })
    ).subscribe(result => {
      this.commentsChange.next(result);
    });
  }

  createPost(postData: NewsData) {
    const formData = new FormData();

    Object.keys(postData).forEach(key => {
      if (postData[key] !== null) {
        formData.append(key, postData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/news', formData);
  }

  removePost(id: string) {
    this.postRemoving.next(true);
    return this.http.delete(environment.apiUrl + `/news/${id}`).pipe(
      tap({
        next: () => {
          this.postRemoving.next(false);
        },
        error: () => {
          this.postRemoving.next(false);
        }
      }));
  }

  removeComment(id: string) {
    return this.http.delete(environment.apiUrl + `/comments/${id}`);
  }
}
