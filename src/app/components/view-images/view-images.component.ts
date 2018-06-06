import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { Post } from '../../interfaces/post';
import { BrowserService } from '../../services/browser.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-view-images',
  template: `
    <ng-container *ngFor='let node of posts'>
      <app-card-image [post]='node'></app-card-image>
    </ng-container>
  `,
  styleUrls: ['view-images.component.scss'],
})
export class ViewImagesComponent implements OnInit, OnDestroy {
  public authState$$;

  public posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private afAuth: AngularFireAuth,
    private browser: BrowserService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  private onChangeAuthState() {
    const posts$ = this.postsService.getPostsAsPhoto((ref) => {
      return ref.limit(50).orderBy('createdAt', 'desc');
    });
    const posts$$ = posts$.subscribe((docs) => {
      this.posts = docs;
      posts$$.unsubscribe();
    });
  }

  public ngOnInit() {
    const authState$ = this.afAuth.authState;
    this.authState$$ = authState$.subscribe(() => {
      this.onChangeAuthState();
    });
    this.browser.updateSnapshot(this.activatedRoute.snapshot);
  }

  public ngOnDestroy() {
    this.authState$$.unsubscribe();
  }
}
