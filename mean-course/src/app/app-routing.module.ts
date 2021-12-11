import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PostsComponent } from './posts/posts.component'
import { PostCreateComponent } from './posts/post-create/post-create.component'
import { PostListComponent } from './posts/post-list/post-list.component'

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: 'posts',
    component: PostsComponent,
    children: [
      { path: '', component: PostListComponent },
      { path: 'create', component: PostCreateComponent },
      { path: 'edit/:id', component: PostCreateComponent },
    ],
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
