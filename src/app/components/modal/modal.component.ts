import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() acceptButtonText: string = '';
  @Input() confirmButtonText: string = '';
  @Input() cancelButtonText: string = '';

  @Output() closeAction = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<void>();
  @Output() acceptAction = new EventEmitter<void>();

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    private dialog: MatDialog
  ) {}

  close() {
    this.closeAction.emit();
    this.dialogRef.close();
  }

  confirm() {
    if (!this.confirmButtonText) {
      this.accept();
      return;
    }

    // Abrir un modal de confirmación adicional
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'Confirmación',
        description: '¿Estás seguro de confirmar esta acción?',
        acceptButtonText: 'Sí',
        cancelButtonText: 'No',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'accept') {
        this.confirmAction.emit();
        this.dialogRef.close();
      }
    });
  }

  accept() {
    this.acceptAction.emit();
    this.dialogRef.close();
  }
}
