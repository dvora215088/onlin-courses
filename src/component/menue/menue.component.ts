import { Component, EventEmitter } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-menue',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,RouterOutlet],
  templateUrl: './menue.component.html',
  styleUrl: './menue.component.css'
})
export class MenueComponent {
  constructor(private router: Router) { }

  login() {
    this.router.navigate(['login'])
  }
  register() {
    this.router.navigate(['register'])
  }
}
