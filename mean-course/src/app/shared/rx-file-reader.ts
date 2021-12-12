/**
 * Read the text contents of a File or Blob using the FileReader interface.
 * This is an async interface so it makes sense to handle it with Rx.
 * @param {blob} File | Blob
 * @return Observable<string>
 */
import { Observable } from 'rxjs'

export const readFile = (blob: Blob): Observable<string> => {
  return new Observable((subscriber) => {
    const reader = new FileReader()

    reader.onerror = (err) => subscriber.error(err)
    reader.onabort = (err) => subscriber.error(err)
    reader.onload = () => {
      const value = reader.result
      if (value) {
        subscriber.next(value as string)
      }
    }
    reader.onloadend = () => subscriber.complete()

    reader.readAsDataURL(blob)
  })
}
