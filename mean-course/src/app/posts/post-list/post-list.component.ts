import { Component, OnDestroy, OnInit } from '@angular/core'
import { Post } from '../../shared/models/post.type'
import { PostsService } from '../posts.service'
import { map, Observable, Subscription, tap } from 'rxjs'
import { LoadingDataService } from '../../shared/loading-data.service'

@Component({
  selector: 'mc-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [LoadingDataService],
})
export class PostListComponent implements OnInit, OnDestroy {
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
   * @param loading isLoading control service
   */
  constructor(
    private postsService: PostsService,
    public loading: LoadingDataService
  ) {}

  /**
   * subscribe postsService's postUpdated observable
   * on init the component
   */
  ngOnInit(): void {
    this.postsSubscription = this.postsService.postUpdated$.subscribe(
      (posts) => (this.posts = posts)
    )
    // invoke http get request
    this.postsService.getPosts().pipe(this.loading.setup()).subscribe()
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
