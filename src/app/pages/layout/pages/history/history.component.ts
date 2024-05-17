import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { VentaService } from '../../../../Services/venta.service';
import Swal from 'sweetalert2';
import { ModalHistorialComponent } from '../../../../components/modal-historial/modal-historial.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { PdfComponent } from '../../../../components/pdf/pdf.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MaterialModule, DialogModule , CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  rol: string = '';
  ListVenta: any[] = [];
  formulario: FormGroup;
  columnasTabla = ['numeroVenta', 'tipoPago', 'total', 'acciones'];
  visible: boolean = false;
  constructor(
    private ventaServices: VentaService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      numeroVenta: [''],
    });
  }

  List() {
    let obj = {
      buscarPor: 'fecha',
      numeroVenta: '111',
      inicio: this.formulario.value.inicio,
      fin: this.formulario.value.fin,
    };

    this.ventaServices.List(obj).subscribe({
      next: (data) => {
        if (data.status) {
          this.ListVenta = data.value;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'ha ocurrido un error!',
          });
        }
      },
    });
  }

  openModal(venta: any) {
    this.dialog.open(ModalHistorialComponent, {
      data: { ...venta },
    });
  }

  sendFactura(venta: any) {
    this.dialog.open(PdfComponent, {
      data: { ...venta },
    });
  }
  ngOnInit(): void {}
}
