import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  registroExitoso: boolean = false;
  usuarioExistente: boolean = false;
  formGroup: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.formGroup = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.usuarioService.isLogin().subscribe(isLogin => {
      if (isLogin) {
        this.router.navigate(['/inventario']);
      }
    });

    if (this.router.url.indexOf('register') !== -1) {
      this.isLogin = false;
    }
    this.setFormValidators();
  }

  setFormValidators() {
    if (this.isLogin) {
      this.formGroup.get('nombre')?.clearValidators();
      this.formGroup.get('apellido')?.clearValidators();
    } else {
      this.formGroup.get('nombre')?.setValidators([Validators.required]);
      this.formGroup.get('apellido')?.setValidators([Validators.required]);
    }
    this.formGroup.get('nombre')?.updateValueAndValidity();
    this.formGroup.get('apellido')?.updateValueAndValidity();
  }

  loginRegister() {
    if (this.formGroup.invalid) {
      return;
    }

    if (this.isLogin) {
      this.usuarioService.login(this.formGroup.value.email, this.formGroup.value.password).subscribe({
        next: (result: any) => {
          if (result && result.token) {
            localStorage.setItem('auth-token', result.token);
            this.usuarioService.setUsuarioEnSession(result.user);
            this.router.navigate(['/inventario']);
          }
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
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
      this.usuarioService.existeUsuario(nuevoUsuario.email).subscribe({
        next: (existe: boolean) => {
          if (existe) {
            this.usuarioExistente = true;
            this.registroExitoso = false;
          } else {
            this.usuarioService.createUsuario(nuevoUsuario).subscribe({
              next: (result: any) => {
                this.registroExitoso = true;
                this.usuarioExistente = false;
                this.isLogin = true; // Cambia el estado a login después de registrar exitosamente
                this.setFormValidators();
              },
              error: (error) => {
                if (error && error.error && error.error.message === 'Usuario ya existente') {
                  this.usuarioExistente = true;
                  this.registroExitoso = false;
                } else {
                  console.error('Error al registrar usuario:', error);
                }
              }
            });
          }
        },
        error: (error) => {
          console.error('Error al verificar existencia de usuario:', error);
        }
      });
    }
  }

  alterLoginRegister() {
    this.isLogin = !this.isLogin;
    this.setFormValidators();
  }
}