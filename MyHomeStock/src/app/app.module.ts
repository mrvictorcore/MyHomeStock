import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app.routes';
import { AppService } from './app.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductosComponent } from './productos/productos.component';
import { EditarCrearProductoComponent } from './productos/crear-editar-producto/editar-crear-producto.component';
import { StockProductoComponent } from './stock/stock-producto/stock-producto.component';
import { EditarStockComponent } from './stock/stock-producto/editar-stock/editar-stock.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { CrearEditarCompraComponent } from './shopping/crear-editar-compra/crear-editar-compra.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CuentaUsuarioComponent } from './cuenta-usuario/cuenta-usuario.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ProductosComponent,
    ShoppingComponent,
    EditarCrearProductoComponent,
    StockProductoComponent,
    EditarStockComponent,
    CrearEditarCompraComponent,
    LoginComponent,
    CuentaUsuarioComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
