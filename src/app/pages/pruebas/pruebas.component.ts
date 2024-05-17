import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { PruebaService } from '../../Services/prueba.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pruebas',
  standalone: true,
  imports: [],
  templateUrl: './pruebas.component.html',
  styleUrl: './pruebas.component.css',
})
export class PruebasComponent {
  constructor(private pruebaServices: PruebaService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    console.log(file);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const pdfBase64 = reader.result?.toString() || '';

      let obj = {
        para: 'giancarlosgenao7@gmail.com',
        asunto:'Factura de compra de Giancarlos',
        contenido: 'Espero que este mensaje te encuentre bien. Nos complace confirmar la recepción de tu reciente compra en GRUPO PRIMITIVO. ',
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
