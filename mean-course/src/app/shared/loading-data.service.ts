import { Injectable } from '@angular/core'
import { BehaviorSubject, MonoTypeOperatorFunction, tap } from 'rxjs'

@Injectable()
export class LoadingDataService {
  /**
   * now loading the post from the server
   */
  isLoading$ = new BehaviorSubject<boolean>(false)

  setup<T>(): MonoTypeOperatorFunction<T> {
    return tap({
      subscribe: () => {
        this.isLoading$.next(true)
      },
      complete: () => {
        this.isLoading$.next(false)
      },
    })
  }

  constructor() {}
}
