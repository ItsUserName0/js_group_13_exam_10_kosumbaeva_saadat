import { Component, OnInit } from '@angular/core';
import { News } from '../../models/news.model';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {
  news!: News;
  commentsChangeSubscription!: Subscription;
  removingId = '';
  comment!: Comment;
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute, private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.news = <News>data['news'];
    });
    this.commentsChangeSubscription = this.postsService.commentsChange.subscribe(result => {
      this.comments = result;
    })
    this.postsService.fetchComments(this.news.id);
  }

  onCommentRemove(id: string) {
    this.postsService.removeComment(id).subscribe(() => {
      this.postsService.fetchComments(this.news.id);
    });
  }
}
