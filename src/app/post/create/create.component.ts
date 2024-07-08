import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
      name: new FormControl('', [Validators.required,trimmedValidator]),
      details: new FormControl('', [Validators.required,trimmedValidator]),
      sqft: new FormControl('', Validators.required),
      occupancy: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required),
      amenity:new FormControl('',[Validators.required,trimmedValidator])
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    debugger;
    if (this.form.valid) {
      console.log(this.form.value);   
      this.postService.create(this.form.value).subscribe((res: any) => {
        console.log('Villa Created successfully!');
        this.router.navigateByUrl('post/index');
        this.toasterService.showSuccess('Villa Created successfully!', 'Success');
      })
    }
    else{
      console.log('Form is invalid, please fix errors');
      this.markFormGroupTouched(this.form);
    }
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
export function trimmedValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value && control.value.trim() === '') {
    return { 'required': true };
  }
  return null;
}