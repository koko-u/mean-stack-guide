import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const hasMimeTypeValidator = (...mimeTypes: string[]): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value
    if (!file) return null
    if (!(file instanceof File)) return null

    if (mimeTypes.includes(file.type)) return null

    return { hasMimeType: { mimeType: file.type } }
  }
}
