import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  isRegister: boolean = false;
  nombreUsuario!: string;

  constructor (
    private authService: AuthService
  ){}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.isRegister = true;
      const usuario = this.authService.getCurrentUser();
      this.nombreUsuario = usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Nombre Usuario';
    } else {
      this.isRegister = false;
    }
  }
  
  sessionOff(){
    this.authService.logout();
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (
      !target.closest(".navbar-collapse") &&
      !target.closest(".navbar-toggler")
    ) {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse?.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    }
  }

}
