import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../Services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-client',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './modal-client.component.html',
  styleUrl: './modal-client.component.css',
})
export class ModalClientComponent {
  tituloModal: string = 'Nuevo Cliente';
  nombreBoton: string = 'Guardar';
  formulario: FormGroup;

  constructor(
    private modalActual: MatDialogRef<ModalClientComponent>,
    private _clientServices: ClientService,
    @Inject(MAT_DIALOG_DATA) public cliente: any,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
    });

    if (cliente != null) {
      this.tituloModal = 'Editar Cliente';
      this.nombreBoton = 'Editar';
      this.formulario.patchValue({
        cedula: this.cliente.cedula,
        nombre: this.cliente.nombre,
        correo: this.cliente.correo,
        telefono: this.cliente.telefono,
        direccion: this.cliente.direccion,
      });
    }

  }
  
  Register_or_Edit() {
    const obj = {
      idCliente: 0,
      cedula: this.formulario.value.cedula,
      nombre: this.formulario.value.nombre,
      correo: this.formulario.value.correo,
      telefono: this.formulario.value.telefono,
      activo: true,
      direccion: this.formulario.value.direccion,
    };

    this._clientServices.Register(obj).subscribe({
      next:(data) => {
        if(data.status){
          Swal.fire({
            title: "Good job!",
            text: "Cliente Registrado!",
            icon: "success"
          });
          this.modalActual.close('true');
        }else{
          Swal.fire({
            title: "No se pudo registrar el cliente!",
            text: `${data.msgError}`,
            icon: "warning"
          });
        }
      
      }
    })
 
  }
}
