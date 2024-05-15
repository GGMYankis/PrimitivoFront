import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../material/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalUserComponent } from '../../../../components/modal-user/modal-user.component';
import { UserService } from '../../../../Services/user.service';
import Swal from 'sweetalert2';
import { ProductService } from '../../../../Services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  rol: string = '';

  columnasTabla = [
    'nombre',
    'categoria',
    'stock',
    'precio',
    'acciones',
  ];

  dataInicio: any[] = [];
  ListProduct = new MatTableDataSource(this.dataInicio);

  constructor(private productServices: ProductService, private dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  ngAfterViewInit(): void {
    this.ListProduct.paginator = this.paginacionTabla;
  }

  List() {
    this.productServices.List().subscribe({
      next: (data) => {
        if (data.status) {
          console.log(data)
          this.ListProduct.data = data.value;
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

  Register() {
    this.dialog
      .open(ModalUserComponent)
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.List();
      });
  }

  ngOnInit(): void {
    this.List();
  }
}
