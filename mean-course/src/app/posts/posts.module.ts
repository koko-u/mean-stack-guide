import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'

import { PostCreateComponent } from './post-create/post-create.component'
import { PostListComponent } from './post-list/post-list.component'
import { PostItemComponent } from './post-list/post-item/post-item.component'
import { PostsComponent } from './posts.component'
import { PostsService } from './posts.service'
import { HttpClientModule } from '@angular/common/http'

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
  ],
  exports: [PostsComponent],
  providers: [PostsService],
})
export class PostsModule {}
