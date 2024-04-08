import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-cuenta-usuario',
  templateUrl: './cuenta-usuario.component.html',
  styleUrl: './cuenta-usuario.component.css'
})

export class CuentaUsuarioComponent implements OnInit {
  formGroup: FormGroup  = this.fb.group({});;
  usuario: Usuario | null = null;
  verContrasena: boolean = false;

  constructor (
    private appService: AppService, 
    private fb: FormBuilder
  ) { 
    this.inicializarFormulario();
  }

  ngOnInit(): void {
    this.appService.isLogin().subscribe(isLogin => {
      if (isLogin) {
        this.appService.getUsuarioId();
        this.appService.getUsuario(this.appService.getUsuarioId()!).subscribe((result: any) => {
          this.usuario = result[0] as Usuario;
          this.inicializarFormulario();
        });
      }
    });
  }

  inicializarFormulario() {
    this.formGroup = this.fb.group({
      nombre: [this.usuario?.nombre || '', Validators.required],
      apellido: [this.usuario?.apellido || '', Validators.required],
      email: [this.usuario?.email || '', [Validators.required, Validators.email]],
      password: [this.usuario?.password || 0, Validators.required],
    });
  }

  mostrarContrasena() {
    this.verContrasena = !this.verContrasena;
    const passwordControl = this.formGroup?.get('password');
    if (passwordControl) {
      const currentType = this.verContrasena ? 'text' : 'password';
      passwordControl.get('type')?.setValue(currentType);
    }
  }
  
  guardarCambios() {
    if (this.formGroup && this.formGroup.valid) {
      const nuevosDatosUsuario = this.formGroup.value as Usuario;
      nuevosDatosUsuario.id = this.appService.getUsuarioId();
      this.appService.actualizarUsuario(nuevosDatosUsuario).subscribe(()=> location.reload());
    }
  }

  deshacerCambios() {
    if (this.usuario) {
      this.formGroup?.reset({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        email: this.usuario.email,
        password: this.usuario.password
      });
    }
  }
}
