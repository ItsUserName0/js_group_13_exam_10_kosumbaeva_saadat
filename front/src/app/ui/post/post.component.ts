import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  apiUrl = environment.apiUrl;
  postRemovingSubscription!: Subscription;
  removingId = '';
  isRemoving = false;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postRemovingSubscription = this.postsService.postRemoving.subscribe(isRemoving => {
      if (this.post.id === this.removingId) {
        this.isRemoving = isRemoving;
      }
    });
  }

  onPostRemove() {
    this.removingId = this.post.id;
    this.postsService.removePost(this.removingId).subscribe(() => {
      this.postsService.fetchPosts();
    });
  }

  ngOnDestroy(): void {
    this.postRemovingSubscription.unsubscribe();
  }
}
