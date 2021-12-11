import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, NgForm, Validators } from '@angular/forms'
import { PostsService } from '../posts.service'
import { ActivatedRoute, Router } from '@angular/router'
import { concatMap, EMPTY, Observable, tap } from 'rxjs'
import { Post } from '../../shared/models/post.type'

@Component({
  selector: 'mc-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  /**
   * post for edit when this component used for edit the post
   * when used for new post, this field is undefined
   *
   * @private
   */
  private _postForEdit: Post | undefined

  get isEditing(): boolean {
    return this._postForEdit !== undefined
  }

  /**
   * formGroup for post's entry form
   */
  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    content: ['', [Validators.required]],
  })

  /**
   * post's title has required error or not
   */
  get titleRequiredError(): boolean {
    if (this.postForm.controls['title'].errors) {
      return !!this.postForm.controls['title'].errors['required']
    }
    return false
  }

  /**
   * post's title has minlength error or not
   */
  get titleMinLengthError(): boolean {
    if (this.postForm.controls['title'].errors) {
      return !!this.postForm.controls['title'].errors['minlength']
    }
    return false
  }

  /**
   * constructor
   * @param fb formGroup builder service
   * @param postsService post manipulation service
   * @param route activatedRoute service
   * @param router routes service
   */
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        concatMap((paramMap) => {
          const id = paramMap.get('id')
          if (id === null) {
            return EMPTY
          } else {
            return this.postsService.getPostById$(id)
          }
        }),
        tap((v) => console.log({ component: 'PostCreate', value: v }))
      )
      .subscribe((post) => {
        this._postForEdit = post
        this.postForm.setValue({
          title: post.title,
          content: post.content,
        })
      })
  }

  /**
   * add new post or edit the post
   */
  async onSavePost() {
    if (this.postForm.invalid) return

    if (this.isEditing) {
      this.postsService.update(
        this._postForEdit?.id ?? '',
        this.postForm.value.title,
        this.postForm.value.content
      )
    } else {
      this.postsService.add(
        this.postForm.value.title,
        this.postForm.value.content
      )
    }

    await this.router.navigate([''], { relativeTo: this.route })
  }
}
