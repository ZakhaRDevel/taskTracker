import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import { CloseIconComponent } from '../../svg/close-icon/close-icon.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrl: './modal-layout.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDialogContent,
    CloseIconComponent,
    NgStyle
  ],
  standalone: true,
})
export class ModalLayoutComponent {
  @Input() title: string = '';
  @Input() width: string = '600px'
  @Input() height: string = '90svh'
  @Output() closeModal = new EventEmitter();
}
