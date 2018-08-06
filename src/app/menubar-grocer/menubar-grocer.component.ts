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

  ngOnInit() {
    this.items = [
      {label: 'Inventario', routerLink: ['/bodeguero/inventario']},
      {label: 'Despachos', routerLink: ['/bodeguero/despachos']},
      {label: 'Adquisiciones', routerLink: ['/bodeguero/adquisiciones']},
      {label: 'Ordenes', routerLink: ['/bodeguero/ordenes0']},
      {label: 'Retiros', routerLink: ['/bodeguero/retiros']}
    ];
  }

}
