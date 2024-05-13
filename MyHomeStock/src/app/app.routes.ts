import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { StockProductoComponent } from './stock/stock-producto.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { LoginComponent } from './login/login.component';
import { CuentaUsuarioComponent } from './cuenta-usuario/cuenta-usuario.component';

export const routes: Routes = [
    { path: 'inventario', component: DashboardComponent },
    { path: 'producto', component: ProductosComponent },
    { path: 'stock', component: StockProductoComponent },
    { path: 'compra', component: ShoppingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: LoginComponent },
    { path: 'cuenta', component: CuentaUsuarioComponent },
    { path: '', redirectTo: '/login', pathMatch:'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}