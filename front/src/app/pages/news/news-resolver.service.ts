import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PostsService } from '../../services/posts.service';
import { News } from '../../models/news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsResolverService implements Resolve<News> {

  constructor(private postsService: PostsService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<News> | Observable<never> {
    const id = route.params['id'];
    return this.postsService.fetchNews(id).pipe(mergeMap(news => {
      if (news) return of(news);
      void this.router.navigate(['/']);
      return EMPTY;
    }));
  }

}
