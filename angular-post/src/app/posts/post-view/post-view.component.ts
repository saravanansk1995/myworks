import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  private postId: number;
  post: Post;

  constructor(private postService: PostService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) { // the id passed in paramMap.has('id') has to be same as it define in routing module.
        this.postId = Number(paramMap.get('id'));
        this.postService.getPost(this.postId).subscribe((res: any) => {
          this.post = res;
          console.log("posttt 11 : ",res)

        });

        this.postService.getComments(this.postId).subscribe((res: any) => {
          this.post.comments=res;
          console.log("cmts 11 : ", this.post)

        });
        
      }
    });
  }

  deletePost(id: number) {
    this.postService.deletePost(id);
  }




  addComment(commentForm: NgForm) {
    if (commentForm.invalid) {
      return;
    } else {
      const comment = commentForm.value.comment;
      this.post.comments.push(comment);
      this.postService.updatePost(this.post);
      commentForm.reset();
    }

  }
}
