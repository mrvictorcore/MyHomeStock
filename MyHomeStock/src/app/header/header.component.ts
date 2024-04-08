import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  isRegister: boolean = false;
  nombreUsuario!: string;

  constructor (
    private appService: AppService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.appService.isLogin().subscribe(isLogin => {
      if(!isLogin) {
        this.isRegister = false;
      } else {
        this.isRegister = true;
        const usuario: any = this.appService.getUsuarioEnSession();
        this.appService.getUsuario(usuario).subscribe((user: any)  => {
          this.nombreUsuario = user ? user[0]['nombre'] : 'Nombre Usuario';
        });
        
      }
    });
  }
  
  sessionOff(){
    this.appService.removeUsuarioEnSession();
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
