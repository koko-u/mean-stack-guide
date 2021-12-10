import { Injectable } from "@angular/core"
import { Post } from "../shared/models/post.type"
import { BehaviorSubject, map, Observable, Subject, tap } from "rxjs"
import { HttpClient } from "@angular/common/http"

type GetResponse = {
  message: string
  posts: Post[]
}
type PostResponse = {
  message: string
  post: Post
}

@Injectable()
export class PostsService {
  private _posts: Post[] = []

  private _postsUpdated$ = new Subject<Post[]>()

  get postUpdated$(): Observable<Post[]> {
    return this._postsUpdated$.asObservable()
  }

  constructor(private http: HttpClient) {
  }

  add(title: string, content: string): void {
    this.http
      .post<PostResponse>("/api/posts", {title, content}).pipe(
      tap(res => console.log({res})),
      map(res => res.post)
    ).subscribe(post => {
      this._posts.push(post)
      this._postsUpdated$.next([...this._posts])
    })
  }

  getPosts(): void {
    this.http
      .get<GetResponse>("/api/posts")
      .pipe(tap(res => console.log({res})),
        map(res => res.posts))
      .subscribe(posts => {
        this._posts = posts
        this._postsUpdated$.next([...this._posts])
      })
  }
}
