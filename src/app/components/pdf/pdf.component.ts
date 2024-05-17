import { Component, Inject, OnInit } from '@angular/core';
import html2PDF from 'jspdf-html2canvas';
import { MaterialModule } from '../../material/material/material.module';
import { DialogModule } from 'primeng/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PruebaService } from '../../Services/prueba.service';

@Component({
  selector: 'app-pdf',
  standalone: true,
  imports: [MaterialModule, DialogModule, CommonModule],
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent {
  visible: boolean = false;
  asistente: string = '';
  cliente: string = '';
  total: number = 0;
  tipoPago: string = '';
  numeroFactura: string = '';
  correoCliente: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public venta: any,
    private pruebaServices: PruebaService
  ) {
    if (venta) {
      this.asistente = venta.nombreAsistente;
      this.total = venta.total;
      this.tipoPago = venta.tipoPago;
      this.numeroFactura = venta.numeroFactura;
      this.cliente = venta.nombreCliente;
      this.correoCliente = venta.correoCliente;
      this.visible = true;
    }
  }

  createPdf() {
    let page = document.getElementById('page');

    // Guarda la posición actual de desplazamiento vertical
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    // Mueve la página hacia arriba temporalmente para que todos los elementos sean visibles
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Genera el PDF
    html2PDF(page, {
      jsPDF: {
        format: 'a4',
      },
      html2canvas: {
        scrollX: 0,
        scrollY: -window.scrollY,
      },
      imageType: 'image/jpeg',
      output: `${this.cliente}/${this.numeroFactura}.pdf`,
    });

    // Restaura la posición original de desplazamiento vertical
    document.documentElement.scrollTop = scrollTop;
    document.body.scrollTop = scrollTop;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const pdfBase64 = reader.result?.toString() || '';

      let obj = {
        para: this.correoCliente,
        asunto: `Factura de Giancarlos : ${this.numeroFactura}`,
        contenido:
          'Espero que este mensaje te encuentre bien. Nos complace confirmar la recepción de tu reciente compra en GRUPO PRIMITIVO. ',
        pdf: pdfBase64,
      };

      this.pruebaServices.Send(obj).subscribe({
        next: (data) => {
          console.log(data);
        },
      });
    };
  }
}
