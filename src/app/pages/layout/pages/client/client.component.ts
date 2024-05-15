import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../material/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalUserComponent } from '../../../../components/modal-user/modal-user.component';
import { ModalClientComponent } from '../../../../components/modal-client/modal-client.component';
import { ClientService } from '../../../../Services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  rol: string = '';

  columnasTabla = [
    'cedula',
    'nombre',
    'correo',
    'telefono',
    'activo',
    'acciones',
  ];

  dataInicio: any[] = [];
  ListClient = new MatTableDataSource(this.dataInicio);

  constructor(
    private clientServices: ClientService,
    private dialog: MatDialog
  ) {}
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  ngAfterViewInit(): void {
    this.ListClient.paginator = this.paginacionTabla;
  }

  List() {
    this.clientServices.List().subscribe({
      next: (data) => {
        if (data.status) {
          console.log(data);
          this.ListClient.data = data.value;
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
    this.dialog.open(ModalClientComponent);
  }
  ngOnInit(): void {
    this.List();
  }
}
