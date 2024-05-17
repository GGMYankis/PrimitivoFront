import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { UserUtilService } from '../../Services/userUtil.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private userUtilService: UserUtilService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      gmail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const obj = {
      correo: this.formulario.value.gmail,
      clave: this.formulario.value.password,
    };

    this.loginService.Login(obj).subscribe({
      next: (data) => {
        if (data.status) {
          console.log(data)
          this.userUtilService.saveUser(data.value);
          this.router.navigate(['pages/clientes']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${data.msgError}`,
          });
        }
      },
    });
  }
}
