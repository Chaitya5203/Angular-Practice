import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { ToasterService } from '../../toaster.service';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  post!: Post;
  form!: FormGroup;
  constructor(public postService: PostService,private route: ActivatedRoute,private toasterService: ToasterService,
  private router: Router) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      details: new FormControl('', Validators.required),
      sqft: new FormControl('', Validators.required),
      occupancy: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required)
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);   
    this.postService.create(this.form.value).subscribe((res: any) => {
      console.log('Villa Created successfully!');
      this.router.navigateByUrl('post/index');
      this.toasterService.showSuccess('Villa Created successfully!', 'Success');
    })
  }
}