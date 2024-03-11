import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskModalComponent } from '../../modals/create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private matDialog = inject(MatDialog);

  openCreateTaskDialog() {
    this.matDialog.open(CreateTaskModalComponent);
  }
}
