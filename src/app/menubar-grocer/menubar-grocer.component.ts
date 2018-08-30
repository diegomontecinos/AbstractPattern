import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar-grocer',
  templateUrl: './menubar-grocer.component.html',
  styleUrls: ['./menubar-grocer.component.css']
})
export class MenubarGrocerComponent implements OnInit {

  constructor() { }

  public items: MenuItem[];

<<<<<<< HEAD
  ngOnInit() {
    this.items = [
      {label: 'Inventario', routerLink: ['/bodeguero/inventario']},
      {label: 'Despachos', routerLink: ['/bodeguero/despachos']},
      {label: 'Adquisiciones', routerLink: ['/bodeguero/adquisiciones']},
      {label: 'Ordenes', routerLink: ['/bodeguero/ordenes0']},
      {label: 'Retiros', routerLink: ['/bodeguero/retiros']}
    ];
=======
  type: string;
  username: string;
  whName: string;

  ngOnInit() {
    this.username = sessionStorage.getItem('user')
    this.type = sessionStorage.getItem('type')
    this.whName = sessionStorage.getItem('whName')
    if(sessionStorage.getItem('type')=='admin'){
      this.items = [
        {label: 'Inventario', routerLink: ['/bodeguero/inventario']},
        {label: 'Adquisiciones', routerLink: ['/adquisiciones']},
        {label: 'Bodegas', routerLink: ['/bodegas']}
      ];
    }
    else if(sessionStorage.getItem('type')=='central'){
      this.items = [
        {label: 'Inventario', routerLink: ['/bodeguero/inventario']},
        {label: 'Despachos', routerLink: ['/bodeguero/despachos']},
        {label: 'Adquisiciones', routerLink: ['/adquisiciones']},
        {label: 'Ordenes', routerLink: ['/bodeguero/ordenes0']},
        {label: 'Retiros', routerLink: ['/bodeguero/retiros']}
      ];
    }
    else if(sessionStorage.getItem('type')=='bodeguero')
      this.items = [
        {label: 'Inventario', routerLink: ['/bodeguero/inventario']},
        {label: 'Despachos', routerLink: ['/bodeguero/despachos']},
        {label: 'Ordenes', routerLink: ['/bodeguero/ordenes0']},
        {label: 'Retiros', routerLink: ['/bodeguero/retiros']}
      ];
>>>>>>> daniel
  }

}
