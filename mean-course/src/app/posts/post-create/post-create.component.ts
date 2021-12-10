import { Component, ViewChild } from '@angular/core'
import { FormBuilder, NgForm, Validators } from '@angular/forms'
import { PostsService } from '../posts.service'

@Component({
  selector: 'mc-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  enteredTitle: string = ''
  enteredContent: string = ''

  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    content: ['', [Validators.required]],
  })

  private _formDirective: NgForm | undefined
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

  get titleRequiredError(): boolean {
    if (this.postForm.controls['title'].errors) {
      return !!this.postForm.controls['title'].errors['required']
    }
    return false
  }
  get titleMinLengthError(): boolean {
    if (this.postForm.controls['title'].errors) {
      return !!this.postForm.controls['title'].errors['minlength']
    }
    return false
  }

  constructor(private fb: FormBuilder, private postsService: PostsService) {}

  onAddPost() {
    if (this.postForm.invalid) return

    this.postsService.add(
      this.postForm.value.title,
      this.postForm.value.content
    )
    this.formDirective.resetForm()
  }
}
