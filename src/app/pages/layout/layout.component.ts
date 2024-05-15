import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material/material/material.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
/*   formattedDate: string; */
  nameHeader:string = '';
  close() {
    document.querySelector('#sidebar')?.classList.toggle('expand');
  }

  logout() {
    localStorage.removeItem('token');
  }

  constructor(
 
  ) {
    /* moment.locale('es');
    const currentDate = moment();
    this.formattedDate = currentDate.format('dddd, D MMMM YYYY'); */
  }

}
