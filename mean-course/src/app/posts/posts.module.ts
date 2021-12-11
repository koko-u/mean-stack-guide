import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { PostCreateComponent } from './post-create/post-create.component'
import { PostListComponent } from './post-list/post-list.component'
import { PostItemComponent } from './post-list/post-item/post-item.component'
import { PostsComponent } from './posts.component'
import { PostsService } from './posts.service'

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PostItemComponent,
    PostsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  exports: [PostsComponent],
  providers: [PostsService],
})
export class PostsModule {}
