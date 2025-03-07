import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Home", route: "home", icon: "home"},    
    {name: "Clientes", route: "client", icon: "people"},
    {name: "Proveedores", route: "casuppliertegory", icon: "category"},
    {name: "Vendedores", route: "category", icon: "store"},    
    {name: "Productos", route: "product", icon: "shopping_cart"}
  ]


/**
 * 
 * menuNav = [
  { name: "Home", route: "home", icon: "home" },                     // Icono para la página principal
  { name: "Categorías", route: "category", icon: "category" },       // Icono de categorías
  { name: "Clientes", route: "client", icon: "people" },             // Icono de clientes (grupo de personas)
  { name: "Vendedores", route: "seller", icon: "store" },            // Icono de tienda
  { name: "Productos", route: "products", icon: "shopping_cart" },   // Icono de carrito de compras
  { name: "Pedidos", route: "orders", icon: "receipt" },             // Icono para pedidos o recibos
  { name: "Reportes", route: "reports", icon: "bar_chart" },         // Icono para reportes o gráficas
  { name: "Configuración", route: "settings", icon: "settings" },    // Icono para configuración
  { name: "Perfil", route: "profile", icon: "account_circle" },      // Icono para perfil de usuario
  { name: "Notificaciones", route: "notifications", icon: "notifications" }, // Icono de notificaciones
  { name: "Ayuda", route: "help", icon: "help" },                    // Icono de ayuda
  { name: "Facturación", route: "billing", icon: "attach_money" },   // Icono de dinero
  { name: "Inventario", route: "inventory", icon: "inventory_2" },   // Icono de inventario
  { name: "Favoritos", route: "favorites", icon: "favorite" },       // Icono de favoritos
  { name: "Historial", route: "history", icon: "history" },          // Icono de historial
  { name: "Salir", route: "logout", icon: "logout" }                 // Icono para cerrar sesión
];

 * / */

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

}
