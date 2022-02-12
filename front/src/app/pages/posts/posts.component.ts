import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts!: Post[];
  postsFetchingSubscription!: Subscription;
  postsChangeSubscription!: Subscription;
  isFetching = false;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsChangeSubscription = this.postsService.postsChange.subscribe(posts => {
      this.posts = posts;
    });
    this.postsFetchingSubscription = this.postsService.postsFetching.subscribe(isFetching => {
      this.isFetching = isFetching;
    });
    this.postsService.fetchPosts();
  }

  ngOnDestroy(): void {
    this.postsChangeSubscription.unsubscribe();
    this.postsFetchingSubscription.unsubscribe();
  }

}
