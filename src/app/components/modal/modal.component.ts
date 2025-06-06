import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrls: [],
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
    @Inject(MAT_DIALOG_DATA) public data: any /* Inyección de datos */,
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
