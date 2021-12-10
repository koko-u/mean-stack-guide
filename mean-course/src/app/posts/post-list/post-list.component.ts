import { Component, OnDestroy, OnInit } from '@angular/core'
import { Post } from '../../shared/models/post.type'
import { PostsService } from '../posts.service'
import { map, Observable, Subscription, tap } from 'rxjs'

@Component({
  selector: 'mc-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // get posts$(): Observable<Post[]> {
  //   return this.postsService.posts$
  // }
  //
  // get anyPost$(): Observable<boolean> {
  //   return this.posts$.pipe(
  //     map((posts) => posts.length > 0),
  //     tap(console.dir)
  //   )
  // }
  posts: Post[] = []
  get anyPost(): boolean {
    return this.posts.length > 0
  }
  private postsSubscription: Subscription | undefined

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsSubscription = this.postsService.postUpdated$.subscribe(
      (posts) => (this.posts = posts)
    )
    this.postsService.getPosts()
  }

  ngOnDestroy(): void {
    if (this.postsSubscription !== undefined) {
      this.postsSubscription.unsubscribe()
    }
  }
}
