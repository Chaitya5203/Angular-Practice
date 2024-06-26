import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  title1 = 'List Of Villa';
  currentpage :number=1;
  pagesize : number=5;
  totalpage :number;
  isnextPage:boolean=false;
  ispreviouspage:boolean=false;
  searchQuery: string = '';
  posts: Post[] = [];
  constructor(public postService: PostService) { }
  ngOnInit(): void {
    this.totalpage=1;
    this.getPosts(); 
    this.searchPosts();
  }
  searchPosts(): void {
    this.postService.searchPosts(this.searchQuery)
      .subscribe(
        (data) => {
          this.posts = data.result.data; // Adjust based on your API response structure
        },
        (error) => {
          console.error('Error fetching posts:', error);
          // Handle error scenarios if needed
        }
      );
  }
  getPosts(): void{
      this.postService.getAll(this.currentpage,this.pagesize).subscribe((data)=>{
      this.posts = data.result.data;
      this.currentpage=data.result.currentPage;
      this.isnextPage=data.result.nextPage;
      this.ispreviouspage=data.result.previousPage;
      this.totalpage = data.result.totalPages;
      console.log(data);
    })
  }
  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item.id !== id);
      console.log('Villa deleted successfully!');
    })
  }
  setPage(pageNumber: number): void {
    this.currentpage = pageNumber;
    this.getPosts();
  }
  previousPage(): void {
    if (this.currentpage > 1) {
      this.setPage(this.currentpage - 1);
    }
  }
  nextPage(): void {
    if (this.currentpage <= this.totalpage) {
      this.setPage(this.currentpage + 1);
    }
  }
}