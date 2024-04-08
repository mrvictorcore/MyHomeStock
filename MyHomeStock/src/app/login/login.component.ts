import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  registroExitoso: boolean = false;
  usuarioExistente: boolean = false;
  formGroup: FormGroup = this.fb.group({});

  constructor(
    private appService: AppService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.inicializarFormulario();
  }

  ngOnInit(): void {
    this.appService.isLogin().subscribe(isLogin => {
      if (isLogin)
        this.router.navigate(['/inventario']);
      if (this.router.url.indexOf('register') != -1) {
        this.alterLoginRegister();
      }
    });
  }

  inicializarFormulario() {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginRegister() {
    // if (this.formGroup.invalid) {
    //   return;
    // }
    
    if (this.isLogin) {
      this.appService.login(this.formGroup.value.email, this.formGroup.value.password).subscribe((result: any) => {
        if (result && result.data && result.data.length) {
          this.appService.setUsuarioEnSession(result.data[0] as Usuario);
          this.router.navigate(['/inventario']);
        }
      });
    } else {
      const nuevoUsuario: Usuario = {
        id: null,
        nombre: this.formGroup.value.nombre,
        apellido: this.formGroup.value.apellido,
        password: this.formGroup.value.password,
        email: this.formGroup.value.email || ''
      };
      if (nuevoUsuario.email !== null) {
        this.appService.existeUsuario(nuevoUsuario.email).subscribe((existe: any) => {
          if (existe) {
            this.usuarioExistente = true;
            this.registroExitoso = false;
          } else {
            this.appService.registrarUsuario(nuevoUsuario).subscribe(
              (result: any) => {
                this.registroExitoso = true;
                this.usuarioExistente = false;
              },
              (error) => {
                if (error && error.error && error.error.message === 'Usuario ya existente') {
                  this.usuarioExistente = true;
                  this.registroExitoso = false;
                } else {
                  console.error('Error al registrar usuario:', error);
                }
              }
            );
          }
        });
      }
    }
  }

  alterLoginRegister() {
    this.isLogin = !this.isLogin;
  }

  irRegister() {
    this.router.navigate(['/register']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }
}