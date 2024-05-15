import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../material/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalUserComponent } from '../../../../components/modal-user/modal-user.component';
import { ModalCategoryComponent } from '../../../../components/modal-category/modal-category.component';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../../Services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  rol: string = '';

  columnasTabla = [
    'idCategoria',
    'nombre',
    'activo',
    'acciones',
  ];

  dataInicio: any[] = [];
  ListCategory = new MatTableDataSource(this.dataInicio);

  constructor(
    private dialog: MatDialog,
    private categoryServices: CategoryService
  ) {}

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  ngAfterViewInit(): void {
    this.ListCategory.paginator = this.paginacionTabla;
  }

  List() {
    this.categoryServices.List().subscribe({
      next: (data) => {
        if (data.status) {
          console.log(data);
          this.ListCategory.data = data.value;
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
    this.dialog.open(ModalCategoryComponent);
  }
  ngOnInit(): void {
    this.List();
  }
}
