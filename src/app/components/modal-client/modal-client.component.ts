import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../Services/client.service';

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
      direccion: ['1', Validators.required],
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
      cedula: 'string',
      nombre: 'string',
      correo: 'string',
      telefono: 'string',
      activo: true,
      direccion: 'string',
    };
  }
}
