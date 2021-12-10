import { Component, Input, OnInit } from '@angular/core'
import { Post } from '../../../shared/models/post.type'

@Component({
  selector: 'mc-post-item[post]',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
  private _post: Post | undefined
  get post(): Post {
    if (this._post === undefined) {
      throw new Error('no post attribute')
    }
    return this._post
  }
  @Input()
  set post(value: Post) {
    this._post = value
  }

  constructor() {}
}
