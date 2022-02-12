import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsResolverService } from './pages/news/news-resolver.service';

const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'posts/new', component: EditPostComponent},
  {
    path: 'news/:id', component: NewsComponent, resolve: {
      news: NewsResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
