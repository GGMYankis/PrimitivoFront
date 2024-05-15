import { Component, ViewChild } from '@angular/core';

import { MaterialModule } from '../../../../material/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalUserComponent } from '../../../../components/modal-user/modal-user.component';
import { UserService } from '../../../../Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  rol: string = '';

  columnasTabla = [
    'nombre',
    'correo',
    'rol',
    'activo',
    'acciones',
  ];

  dataInicio: any[] = [];
  ListUser = new MatTableDataSource(this.dataInicio);

  constructor(
    private userServices: UserService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  ngAfterViewInit(): void {
    this.ListUser.paginator = this.paginacionTabla;
  }

  List() {
    this.userServices.List().subscribe({
      next: (data) => {
        if (data.status) {
          console.log(data)
          this.ListUser.data = data.value;
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

  Register(){
    this.dialog.open(ModalUserComponent)
  }
  
  ngOnInit(): void {
    this.List();
  }
}
