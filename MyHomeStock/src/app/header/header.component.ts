import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {



  
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
