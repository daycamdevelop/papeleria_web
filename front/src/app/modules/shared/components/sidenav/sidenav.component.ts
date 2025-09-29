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
    {name: "Bajas", route: "facturar", icon: "cloud_download"},
    {name: "Clientes", route: "cliente", icon: "people"},
    {name: "Compras", route: "cliente", icon: "add_shopping_cart"},
    {name: "Cotizaciones", route: "facturar", icon: "edit_note"},
    {name: "Devoluciones", route: "facturar", icon: "keyboard_double_arrow_left"},
    {name: "Facturar", route: "facturar", icon: "paid"},
    {name: "Factura Electronica", route: "facturar", icon: "book_online"},
    {name: "Kardex", route: "facturar", icon: "auto_stories"},
    {name: "Inventario", route: "facturar", icon: "storage"},
    {name: "POS Electronico", route: "facturar", icon: "charging_station"},
    {name: "Productos", route: "productos", icon: "inventory"},
    {name: "Proveedores", route: "proveedor", icon: "category"},
    {name: "Reportes", route: "facturar", icon: "insights"},
    {name: "Usuarios", route: "facturar", icon: "groups_2"},
    {name: "Utilidades", route: "facturar", icon: "hardware"},
    {name: "Vendedores", route: "vendedor", icon: "store"},
    {name: "Verificador de precios", route: "facturar", icon: "attach_money"},
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.version = environment.version;
  }
}