import { Injectable } from '@angular/core';
import { Post } from './post';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private postUpdates = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(private http: HttpClient) { }

  getPosts() {
    // return[...this.posts];
    // this.postUpdates.next([...this.posts]);
     this.http.get<[Post]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res) => {
        this.posts =res;
        this.postUpdates.next([...this.posts]);
      });
  }
  getComments(id:number){
    return this.http.get<{message:string, post: Post}>(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);      
  }

  getPost(id: number) {
    return this.http.get<{message:string, post: Post}>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  addPost(post: Post) {


    this.http.post('https://jsonplaceholder.typicode.com/posts', post)
      .subscribe((res) => {
        this.posts.push(post);
        this.postUpdates.next([...this.posts]);
      });
  }

  updatePost(post: Post) {
    this.http.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
      .subscribe(() => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id)
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postUpdates.next([...this.posts]);
      });
  }

  deletePost(id: number) {
    this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .subscribe((res) => {
        const updatedPosts = this.posts.filter(post => post.id !== id);
        this.posts = updatedPosts;
        this.postUpdates.next([...this.posts]);
      });
  }

  updatedPosts() {
    return this.postUpdates.asObservable();
  }
}
