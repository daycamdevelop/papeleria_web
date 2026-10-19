import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;
  version:string = "";

  menuNav = [
    {name: "Menu", route: "home", icon: "home"},
    //{name: "Bajas", route: "bajas", icon: "cloud_download"},
    {name: "Clientes", route: "cliente", icon: "people"},
    {name: "Compras", route: "compras", icon: "add_shopping_cart"},
    //{name: "Cotizaciones", route: "cotizacion", icon: "edit_note"},
    {name: "Devoluciones", route: "devolucion", icon: "keyboard_double_arrow_left"},
    {name: "Facturar", route: "facturas", icon: "paid"},
    {name: "Factura Electronica", route: "factura_electronica", icon: "book_online"},
    {name: "Kardex", route: "kardex", icon: "auto_stories"},
    {name: "Inventario", route: "inventario", icon: "storage"},
    {name: "POS Electronico", route: "pos_electronico", icon: "charging_station"},
    {name: "Productos", route: "productos", icon: "inventory"},
    {name: "Proveedores", route: "proveedor", icon: "category"},
    //{name: "Reportes", route: "reportes", icon: "insights"},
    {name: "Usuarios", route: "usuario", icon: "groups_2"},
    {name: "Utilidades", route: "utilidades", icon: "hardware"},
    {name: "Vendedores", route: "vendedor", icon: "store"},
    //{name: "Verificador de precios", route: "verificador_precios", icon: "attach_money"},
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.version = environment.version;
  }
}