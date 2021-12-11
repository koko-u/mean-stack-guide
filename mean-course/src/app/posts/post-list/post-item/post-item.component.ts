import { Component, Input, OnInit } from '@angular/core'
import { Post } from '../../../shared/models/post.type'
import { PostsService } from '../../posts.service'
import { ActivatedRoute, Router } from '@angular/router'
import { LoadingDataService } from '../../../shared/loading-data.service'

@Component({
  selector: 'mc-post-item[post]',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
  providers: [LoadingDataService],
})
export class PostItemComponent {
  private _post: Post | undefined

  /**
   * post for this row component
   */
  get post(): Post {
    if (this._post === undefined) {
      throw new Error('no post attribute')
    }
    return this._post
  }

  /**
   * set post from parent component
   * @param value
   */
  @Input()
  set post(value: Post) {
    this._post = value
  }

  /**
   * constructor
   *
   * @param postsService post manipulation service
   * @param route
   * @param router
   * @param loading
   */
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    public loading: LoadingDataService
  ) {}

  /**
   * delete this post
   */
  delete() {
    this.postsService
      .deletePost(this.post.id)
      .pipe(this.loading.setup())
      .subscribe()
  }

  async edit() {
    await this.router.navigate(['edit', this.post.id], {
      relativeTo: this.route,
    })
  }
}
