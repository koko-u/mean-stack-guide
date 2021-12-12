import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { PostsService } from '../posts.service'
import { ActivatedRoute, Router } from '@angular/router'
import { concatMap, EMPTY, iif, Subscription, tap, throwError } from 'rxjs'
import { Post } from '../../shared/models/post.type'
import { LoadingDataService } from '../../shared/loading-data.service'
import { readFile } from '../../shared/rx-file-reader'
import { hasMimeTypeValidator } from './mime-type.validator'

@Component({
  selector: 'mc-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
  providers: [LoadingDataService],
})
export class PostCreateComponent implements OnInit, OnDestroy {
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
    image: [
      null,
      [
        Validators.required,
        hasMimeTypeValidator('image/png', 'image/jpeg', 'image/gif'),
      ],
    ],
  })

  /**
   * image for preview
   *
   * @note
   * this field is populated by postForm's image value is changed
   */
  previewImage: string | undefined

  private previewImageSubscription: Subscription | undefined

  /**
   * post's title validation error message
   */
  get titleErrorMessage(): string | undefined {
    if (this.postForm.controls['title'].errors) {
      if (this.postForm.controls['title'].errors['required']) {
        return 'Please enter a post title'
      }
      if (this.postForm.controls['title'].errors['minlength']) {
        return 'title length should be at least 3'
      }
      return 'Something wrong ;('
    }
    return undefined
  }
  get imageErrorMessage(): string | undefined {
    if (this.postForm.controls['image'].errors) {
      if (this.postForm.controls['image'].errors['required']) {
        return 'Please attach a image'
      }
      if (this.postForm.controls['image'].errors['hasMimeType']) {
        return 'You can attach only jpeg, gif, png files'
      }
      return 'Something wrong ;('
    }
    return undefined
  }

  /**
   * constructor
   * @param fb formGroup builder service
   * @param postsService post manipulation service
   * @param route activatedRoute service
   * @param router routes service
   * @param loading isLoading Control service
   */
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    public loading: LoadingDataService
  ) {}

  ngOnInit(): void {
    this.fetchPostForEdit()
    this.previewImageSubscription = this.subscribePreviewImage()
  }
  ngOnDestroy() {
    if (this.previewImageSubscription) {
      this.previewImageSubscription.unsubscribe()
    }
  }

  /**
   * add new post or edit the post
   */
  async onSavePost() {
    if (this.postForm.invalid) return

    const savePost$ = iif(
      () => this.isEditing,
      this.postsService.update(
        this._postForEdit?.id ?? '',
        this.postForm.value.title,
        this.postForm.value.content
      ),
      this.postsService.add(
        this.postForm.value.title,
        this.postForm.value.content
      )
    )

    savePost$.pipe(this.loading.setup()).subscribe({
      complete: async () => {
        await this.router.navigate([''], { relativeTo: this.route })
      },
    })
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files
    if (!files) return
    if (files.length === 0) {
      this.postForm.patchValue({ image: null })
    } else {
      this.postForm.patchValue({ image: files[0] })
    }
    //this.postForm.controls['image'].updateValueAndValidity()
    this.postForm.controls['image'].markAsDirty()
  }

  /**
   * fetch post data from id parameter when this component is used to edit the post
   *
   * @note
   * when this component is used to create a new post, _postForEdit field is undefined and postForm is blank.
   *
   * @private
   */
  private fetchPostForEdit() {
    this.route.paramMap
      .pipe(
        concatMap((paramMap) => {
          const id = paramMap.get('id')
          if (id === null) {
            return EMPTY
          } else {
            return this.postsService.getPostById$(id).pipe(this.loading.setup())
          }
        })
      )
      .subscribe((post) => {
        this._postForEdit = post
        this.postForm.patchValue({
          title: post.title,
          content: post.content,
        })
      })
  }

  /**
   * set imagePreview when postForm's image value has changed.
   *
   * @private
   */
  private subscribePreviewImage(): Subscription {
    return this.postForm.controls['image'].valueChanges
      .pipe(
        concatMap((value: any) => {
          if (value instanceof Blob) {
            return readFile(value)
          } else {
            return throwError(
              () => new Error('image control value is not a File')
            )
          }
        })
      )
      .subscribe((image) => (this.previewImage = image))
  }
}
