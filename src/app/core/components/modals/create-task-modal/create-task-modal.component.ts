import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';
;

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [
    ModalLayoutComponent,
  ],
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.scss'
})
export class CreateTaskModalComponent {
  private dialogRef = inject(MatDialogRef<CreateTaskModalComponent>);
  closeModal() {
    this.dialogRef.close();
  }
}
