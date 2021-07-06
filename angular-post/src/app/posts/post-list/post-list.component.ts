import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];

  constructor(private http: HttpClient,private postService: PostService) { }

  ngOnInit(): void {
  this.postService.getPosts();    
    this.postService.updatedPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  deletePost(id: number) {
    this.postService.deletePost(id);
  }




}
