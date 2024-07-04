import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToasterService } from '../../toaster.service';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
declare var $: any;
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule,ToastrModule,ConfirmDeleteModalComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  title1 = 'List Of Villa';
  currentpage :number=1;
  pagesize : number;
  totalpage :number;
  isnextPage:boolean=false;
  ispreviouspage:boolean=false;
  searchQuery: string = '';
  posts: Post[] = [];
  modalItemId: any;
  constructor(public postService: PostService,private toasterService: ToasterService) { }
  ngOnInit(): void {
    this.totalpage=1;
    this.pagesize = 5;
    this.getPosts();
  }
  searchPosts(): void {
    this.postService.searchPosts(this.currentpage,this.pagesize,this.searchQuery).subscribe((data) => {
          console.log(data);
          this.posts = data.data.data;
          this.currentpage=data.data.currentPage;
          this.isnextPage=data.data.nextPage;
          this.ispreviouspage=data.data.previousPage;
          this.totalpage = data.data.totalPages;
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
  }
  getPosts(): void{
    this.postService.getAll(this.currentpage,this.pagesize).subscribe((data)=>{
      console.log(data);
      this.posts = data.data.data;
      this.currentpage=data.data.currentPage;
      this.isnextPage=data.data.nextPage;
      this.ispreviouspage=data.data.previousPage;
      this.totalpage = data.data.totalPages;
    })
  }
  deletePost(id:number){
    console.log("delrete");
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item.id !== id);
      console.log('Villa deleted successfully!');
      this.toasterService.showSuccess('Villa Deleted successfully!', 'Success');
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
  Onpagechange(event: any): void{
    console.log('Selected page size:', event.target.value);
    this.pagesize=event.target.value;
    this.getPosts();
  }
  openModal(id:any){
    this.modalItemId = id;
    console.log(id);
    $("#exampleModalCenter").modal('show');
  }
}