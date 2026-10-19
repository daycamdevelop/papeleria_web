import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'vendedor', loadChildren: () => import('../vendedor/vendedor.module').then(m => m.VendedorModule) },
  { path: 'cierre', loadChildren: () => import('../cierre/cierre.module').then(m => m.CierreModule) },
  { path: 'cliente', loadChildren: () => import('../cliente/cliente.module').then(m => m.ClienteModule) },
  { path: 'compras', loadChildren: () => import('../compras/compras.module').then(m => m.ComprasModule) },
  { path: 'devoluciones', loadChildren: () => import('../devoluciones/devoluciones.module').then(m => m.DevolucionesModule) },
  { path: 'facturas', loadChildren: () => import('../facturas/facturas.module').then(m => m.FacturasModule) },
  { path: 'factura_electronica', loadChildren: () => import('../factura-electronica/factura-electronica.module').then(m => m.FacturaElectronicaModule) },
  { path: 'inventario', loadChildren: () => import('../inventario/inventario.module').then(m => m.InventarioModule) },
  { path: 'kardex', loadChildren: () => import('../kardex/kardex.module').then(m => m.KardexModule) },
  { path: 'pos_electronico', loadChildren: () => import('../pos-electronico/pos-electronico.module').then(m => m.PosElectronicoModule) },
  { path: 'productos', loadChildren: () => import('../productos/productos.module').then(m => m.ProductosModule) },
  { path: 'proveedor', loadChildren: () => import('../proveedor/proveedor.module').then(m => m.ProveedorModule) },
  { path: 'usuario', loadChildren: () => import('../usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'utilidades', loadChildren: () => import('../utilidades/utilidades.module').then(m => m.UtilidadesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class RouterChildModule {}