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

  /**
   * post list to display screen
   */
  posts: Post[] = []

  /**
   * has any posts or not
   */
  get anyPost(): boolean {
    return this.posts.length > 0
  }

  /**
   * @private
   * postsService's postUpdated observable subscription
   */
  private postsSubscription: Subscription | undefined

  /**
   * constructor
   *
   * @param postsService posts manipulation service
   */
  constructor(private postsService: PostsService) {}

  /**
   * subscribe postsService's postUpdated observable
   * on init the component
   */
  ngOnInit(): void {
    this.postsSubscription = this.postsService.postUpdated$.subscribe(
      (posts) => (this.posts = posts)
    )
    // invoke http get request
    this.postsService.getPosts()
  }

  /**
   * unsubscribe postUpdated observable on destroy
   */
  ngOnDestroy(): void {
    if (this.postsSubscription !== undefined) {
      this.postsSubscription.unsubscribe()
    }
  }
}
