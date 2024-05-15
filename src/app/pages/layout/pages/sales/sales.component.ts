import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material/material/material.module';
import { ProductService } from '../../../../Services/product.service';
import Swal from 'sweetalert2';
import { ClientService } from '../../../../Services/client.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements OnInit {
  ListProducts: any[] = [];
  ListClients: any[] = [];
  ProductSelect: any[] = [];
  total: number = 0;
  formulario: FormGroup;

  columnasTabla = ['nombre', 'cantidad', 'precio', 'total', 'acciones'];

  constructor(
    private productServices: ProductService,
    private clientServices: ClientService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      producto: ['', Validators.required],
      cliente: ['', Validators.required],
      cantidad: ['', Validators.required],
      tipoPago: ['', Validators.required],
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
      id: productFound.idProducto,
      nombre: productFound.nombre,
      cantidad: this.formulario.value.cantidad,
      precio: productFound.precio,
      total: productFound.precio * this.formulario.value.cantidad, // Asegúrate de que el total es cantidad * precio
    };

    this.ProductSelect.push(newProduct);
    this.ProductSelect = this.ProductSelect.slice(); // Crear una nueva referencia del array

    this.total += productFound.precio * this.formulario.value.cantidad; // Actualizar el total con la cantidad correcta
  }

  deleteProduct(product: any) {
    // Filtrar los productos que no coincidan con el id proporcionado
    this.ProductSelect = this.ProductSelect.filter((p) => p.id != product.id);

    // Recalcular el total después de la eliminación
    this.total = this.ProductSelect.reduce(
      (acc, product) => acc + product.precio * product.cantidad,
      0
    );
  }
}
