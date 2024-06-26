import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  id!: number;
  post!: Post;
  form!: FormGroup;
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data) => {
      this.post = data.result;
      console.log(this.post);
      this.form = new FormGroup({
        details: new FormControl(this.post.details, Validators.required),
        sqft: new FormControl(this.post.sqft, Validators.required),
        name: new FormControl(this.post.name,Validators.required),
        occupancy : new FormControl(this.post.occupancy,Validators.required),
        rate : new FormControl(this.post.rate,Validators.required),
      });
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    console.log(this.id);    
    this.postService.update(this.id, this.form.value).subscribe((res: any) => {
      console.log('Villa updated successfully!');
      this.router.navigateByUrl('post/index');
    })
  }
}