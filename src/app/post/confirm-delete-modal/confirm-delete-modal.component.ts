import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, asNativeElements, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ConfirmDeleteModalComponent],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.css'
})
export class ConfirmDeleteModalComponent {
  @Input() id: any;
  @Output() deletePost: EventEmitter<any> = new EventEmitter<any>();
  closeModal() {
    $("#exampleModalCenter").modal('hide');
  }
  deletePostChild(id:any){
    console.log(id)
    this.deletePost.emit(this.id);
    $('#exampleModalCenter').modal('hide');
  }
}
