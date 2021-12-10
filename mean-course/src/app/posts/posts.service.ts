import { Injectable } from '@angular/core'
import { Post } from '../shared/models/post.type'
import { map, Observable, Subject, tap } from 'rxjs'
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
  private _posts: Post[] = []

  private _postsUpdated$ = new Subject<Post[]>()

  get postUpdated$(): Observable<Post[]> {
    return this._postsUpdated$.asObservable()
  }

  constructor(private http: HttpClient) {}

  add(title: string, content: string): void {
    this.http
      .post<{ post: PostResponse }>('/api/posts', { title, content })
      .pipe(
        map((res) => toPost(res.post)),
        tap((res) => console.log({ res }))
      )
      .subscribe((post) => {
        this._posts.push(post)
        this._postsUpdated$.next([...this._posts])
      })
  }

  getPosts(): void {
    this.http
      .get<{ posts: PostResponse[] }>('/api/posts')
      .pipe(
        map((res) => res.posts.map(toPost)),
        tap((res) => console.log({ res }))
      )
      .subscribe((posts) => {
        this._posts = posts
        this._postsUpdated$.next([...this._posts])
      })
  }
}
