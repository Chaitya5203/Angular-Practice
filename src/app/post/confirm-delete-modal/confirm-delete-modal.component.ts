import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, asNativeElements, viewChild } from '@angular/core';
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
  @ViewChild('modal') modal?:ElementRef;
  openModel(){
    $(this.modal?.nativeElement).modal('show');
  }
  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }
}
