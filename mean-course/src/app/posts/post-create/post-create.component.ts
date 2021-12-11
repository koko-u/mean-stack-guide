import { Component, ViewChild } from '@angular/core'
import { FormBuilder, NgForm, Validators } from '@angular/forms'
import { PostsService } from '../posts.service'

@Component({
  selector: 'mc-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  /**
   * formGroup for post's entry form
   */
  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    content: ['', [Validators.required]],
  })

  private _formDirective: NgForm | undefined

  /**
   * post's entry form directive
   *
   * @note which used for clear the form
   */
  get formDirective(): NgForm {
    if (this._formDirective === undefined) {
      throw new Error('no formDirective attribute form')
    }
    return this._formDirective
  }
  @ViewChild('formDirective')
  set formDirective(value: NgForm) {
    this._formDirective = value
  }

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
   */
  constructor(private fb: FormBuilder, private postsService: PostsService) {}

  /**
   * add new post
   */
  onAddPost() {
    if (this.postForm.invalid) return

    this.postsService.add(
      this.postForm.value.title,
      this.postForm.value.content
    )
    this.formDirective.resetForm()
  }
}
