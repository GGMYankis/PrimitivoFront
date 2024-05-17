import { Component, Inject, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-historial',
  standalone: true,
  imports: [MaterialModule, DialogModule, CommonModule],
  templateUrl: './modal-historial.component.html',
  styleUrl: './modal-historial.component.css',
})
export class ModalHistorialComponent {
  columnasTabla = ['producto', 'cantidad', 'precio', 'total'];
  visible: boolean = false;
  sistente: string = '';
  total: number = 0;
  tipoPago: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public productos: any) {
    if (productos) {
      this.sistente = productos.nombreAsistente;
      this.total = productos.total;
      this.tipoPago = productos.tipoPago;
    }
  }

  openModal() {
    this.visible = true;
  }
}
