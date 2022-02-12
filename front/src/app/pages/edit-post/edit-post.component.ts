import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { NewsData } from '../../models/news.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  constructor(private postsService: PostsService, private router: Router) {
  }

  ngOnInit(): void {
  }

  createPost() {
    const postData: NewsData = this.form.value;
    this.postsService.createPost(postData).subscribe(() => {
      this.postsService.fetchPosts();
      void this.router.navigate(['']);
    });
  }

}

