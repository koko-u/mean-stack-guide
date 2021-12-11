import { Injectable } from '@angular/core'
import { Post } from '../shared/models/post.type'
import { BehaviorSubject, concatWith, map, NEVER, Observable, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http'

type PostResponse = {
  _id: string
  title: string
  content: string
  __v: number
}

const toPost = (res: PostResponse): Post => {
  return {
    id: res._id,
    title: res.title,
    content: res.content,
  }
}

@Injectable()
export class PostsService {
  private _postsUpdated$ = new BehaviorSubject<Post[]>([])

  /**
   * signal for update posts list
   */
  get postUpdated$(): Observable<Post[]> {
    return this._postsUpdated$.asObservable()
  }

  /**
   * constructor
   *
   * @param http Angular HttpClient Service
   */
  constructor(private http: HttpClient) {}

  /**
   * add new post
   *
   * @param title Post's title
   * @param content Post's content
   *
   * @note successfully added, then notify postUpdated
   */
  add(title: string, content: string): void {
    this.http
      .post<{ post: PostResponse }>('/api/posts', { title, content })
      .pipe(
        tap((res) => console.log({ method: 'add', serverResponse: res })),
        map(({ post }) => {
          return [...this._postsUpdated$.value, toPost(post)]
        }),
        concatWith(NEVER) // ignore complete
      )
      .subscribe(this._postsUpdated$)
  }

  /**
   * get all posts
   *
   * @note successfully get the posts, then notify postUpdated
   */
  getPosts(): void {
    this.http
      .get<{ posts: PostResponse[] }>('/api/posts')
      .pipe(
        tap((res) => console.log({ method: 'getPosts', serverResponse: res })),
        map((res) => res.posts.map(toPost)),
        concatWith(NEVER) // ignore complete
      )
      .subscribe(this._postsUpdated$)
  }

  /**
   * get post by id
   *
   * @param id
   */
  getPostById$(id: string): Observable<Post> {
    return this.http.get<{ post: PostResponse }>(`/api/posts/${id}`).pipe(
      tap((res) => console.log({ method: 'getPostById', serverResponse: res })),
      map(({ post }) => {
        return toPost(post)
      })
    )
  }

  /**
   * update the post
   *
   * @param id
   * @param title
   * @param content
   */
  update(id: string, title: string, content: string) {
    this.http
      .patch<{ post: PostResponse }>(`/api/posts/${id}`, {
        title,
        content,
      })
      .pipe(
        tap((res) => console.log({ method: 'update', serverResponse: res })),
        map(({ post: updated }) => {
          return this._postsUpdated$.value.map((post) =>
            post.id === updated._id ? toPost(updated) : post
          )
        }),
        concatWith(NEVER)
      )
      .subscribe(this._postsUpdated$)
  }

  deletePost(id: string): void {
    this.http
      .delete<{ post: PostResponse }>(`/api/posts/${id}`)
      .pipe(
        tap((res) =>
          console.log({ method: 'deletePost', serverResponse: res })
        ),
        map((res) => {
          // remove deleted post's id element
          return this._postsUpdated$.value.filter(
            (post) => post.id !== res.post._id
          )
        }),
        concatWith(NEVER) // ignore complete
      )
      .subscribe(this._postsUpdated$)
  }
}
