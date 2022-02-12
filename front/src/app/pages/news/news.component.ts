import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { News } from '../../models/news.model';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';
import { Comment, CommentData } from '../../models/comment.model';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  apiUrl = environment.apiUrl;
  commentsChangeSubscription!: Subscription;
  comments: Comment[] = [];
  comment!: Comment;
  news!: News;
  removingId = '';

  constructor(private route: ActivatedRoute, private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.news = <News>data['news'];
    });
    this.commentsChangeSubscription = this.postsService.commentsChange.subscribe(comments => {
      this.comments = comments;
    })
    this.postsService.fetchComments(this.news.id);
  }

  onCommentRemove(id: string) {
    this.postsService.removeComment(id).subscribe(() => {
      this.postsService.fetchComments(this.news.id);
    });
  }

  createComment() {
    const commentData: CommentData = this.form.value;
    commentData.newsId = this.news.id;
    this.postsService.createComment(commentData).subscribe(() => {
      this.postsService.fetchComments(this.news.id);
    });
  }

  ngOnDestroy(): void {
    this.commentsChangeSubscription.unsubscribe();
  }

}
