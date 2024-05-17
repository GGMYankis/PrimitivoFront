import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material/material/material.module';
import { ProductService } from '../../../../Services/product.service';
import Swal from 'sweetalert2';
import { ClientService } from '../../../../Services/client.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentaService } from '../../../../Services/venta.service';
import html2PDF from 'jspdf-html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { PdfComponent } from '../../../../components/pdf/pdf.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [MaterialModule, CommonModule, DialogModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements OnInit {
  ListProducts: any[] = [];
  ListClients: any[] = [];
  ListaProductosParaVenta: any[] = [];
  total: number = 0;
  formulario: FormGroup;
  tipodePagoDefecto: string = 'Efectivo';

  columnasTabla = ['nombre', 'cantidad', 'precio', 'total', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private productServices: ProductService,
    private ventaServices: VentaService,
    private clientServices: ClientService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      producto: ['', Validators.required],
      cliente: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
  }

  ListProduct() {
    this.productServices.List().subscribe({
      next: (data) => {
        if (data.status) {
          this.ListProducts = data.value;
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

  ListClient() {
    this.clientServices.List().subscribe({
      next: (data) => {
        if (data.status) {
          this.ListClients = data.value;
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

  ngOnInit(): void {
    this.ListClient();
    this.ListProduct();
  }

  addProduct() {
    const productFound = this.ListProducts.find(
      (p) => p.idProducto == this.formulario.value.producto
    );

    const newProduct = {
      idProducto: productFound.idProducto,
      nombre: productFound.nombre,
      cantidad: this.formulario.value.cantidad,
      precio: productFound.precio,
      total: productFound.precio * this.formulario.value.cantidad,
    };

    this.ListaProductosParaVenta.push(newProduct);
    this.ListaProductosParaVenta = this.ListaProductosParaVenta.slice();

    this.total += productFound.precio * this.formulario.value.cantidad;

    this.formulario.patchValue({
      cantidad: '',
      producto: '',
    });
  }

  deleteProduct(product: any) {
    // Filtrar los productos que no coincidan con el id proporcionado
    this.ListaProductosParaVenta = this.ListaProductosParaVenta.filter(
      (p) => p.idProducto != product.idProducto
    );

    // Recalcular el total después de la eliminación
    this.total = this.ListaProductosParaVenta.reduce(
      (acc, product) => acc + product.precio * product.cantidad,
      0
    );
  }

  RegisterVenta() {
    const obj = {
      idUsuario: 4,
      idCliente: this.formulario.value.cliente,
      tipoPago: this.tipodePagoDefecto,
      total: this.total,
      detalleVenta: this.ListaProductosParaVenta,
    };

    this.ventaServices.Register(obj).subscribe({
      next: (data) => {
        if (data.status) {
          Swal.fire({
            title: 'Venta Registrada!',
            text: `Número de venta: ${data.value.numeroFactura}`,
            icon: 'success',
            //  showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'Ok',
          //  cancelButtonText: 'Ver Factura',
          }).then((result) => {
            if (result.isConfirmed) {
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'ha ocurrido un error!',
          });
        }
      },
    });

    this.formulario.patchValue({
      cantidad: '',
      producto: '',
      cliente: '',
      tipoPago: '',
    });

    this.ListaProductosParaVenta = [];
    this.total = 0;
  }

  contieneElementos(): boolean {
    return this.ListaProductosParaVenta.length > 0;
  }
}
