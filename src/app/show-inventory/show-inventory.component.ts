import { Component, OnInit } from '@angular/core';
import { ShowInventoryService } from './show-inventory.service';
import { Inventory } from '../models/inventory.model';
import { Warehouse } from '../models/warehouse.model';
import { Withdraw } from '../models/withdraw.model';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as _ from 'underscore';
import {SpinnerModule} from 'primeng/spinner';
import {ToggleButtonModule} from 'primeng/togglebutton';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
>>>>>>> daniel

@Component({
  selector: 'app-show-inventory',
  templateUrl: './show-inventory.component.html',
  styleUrls: ['./show-inventory.component.css'],
  providers: [ ShowInventoryService ]
})
export class ShowInventoryComponent implements OnInit {

<<<<<<< HEAD
  isMenuOpen?: boolean;
=======
>>>>>>> daniel
  displayDialogNew: boolean;
  displayDialogEdit: boolean;
  displayAcquire: boolean;
  displayWithdraw: boolean;
<<<<<<< HEAD
=======
  displayDialogStock: boolean;
  displayDialogEDelete: boolean;
>>>>>>> daniel
  material: Inventory;
  selectedMaterial: Inventory;
  newMaterial: boolean;
  materials: Inventory[];
  cols: any[];
<<<<<<< HEAD
  warehouse: Warehouse[];
  stockWH: any[];
=======
  cols2: any[];
  warehouse: Warehouse[];
  stockWH: any[any];
>>>>>>> daniel
  qtyAcquire: number;
  comentsAcquire: string;
  newDestination: Warehouse;
  newWithdraw: Withdraw;
<<<<<<< HEAD
  newWHStock: any[];
  withdrawDev: boolean;

  constructor(private showInventoryService: ShowInventoryService) { }

  ngOnInit() {
      this.showInventoryService.getAllInv().subscribe(result => {this.materials = result['data'];});
      this.showInventoryService.getAllWH().subscribe(result => {this.warehouse = result['data'];});
=======
  withdrawDev: boolean;
  selectedStock: any;
  userType: string;
  groser_wh: string;
  msgs: Message[] = [];

  constructor(private showInventoryService: ShowInventoryService, private router: Router) { }

  ngOnInit() {
      this.userType = sessionStorage.getItem('type');
      this.groser_wh = sessionStorage.getItem('wh');
      if(this.userType == 'admin' || this.userType == 'central' || this.userType == 'bodeguero') {
      }
      else {
        this.router.navigate(['']);
      }

      this.getInventory();

>>>>>>> daniel

      this.cols = [
          { field: 'sku', header: 'SKU' },
          { field: 'name', header: 'Nombre' },
          { field: 'brand', header: 'Marca' }
      ];
<<<<<<< HEAD
=======

      this.cols2 = [
          { field: 'name', header: 'Bodega' },
          { field: 'stock', header: 'Stock' }
      ];
  }

  getInventory() {
      this.showInventoryService.getAllWH().subscribe(result => {this.warehouse = result['data'];
        this.showInventoryService.getAllInv().subscribe(result => {this.materials = result['data'];
        /*
          for (var i = 0; i < this.materials.length; i++) {
            for (var j = (this.materials[i].stock_wh.length -1); j >= 0; j--) {
              if(this.materials[i].stock_wh[j].wh != this.groser_wh) {
                this.materials[i].stock_wh = this.materials[i].stock_wh.splice(j, 1);
              }
            }
          } */
        });
      });
>>>>>>> daniel
  }

  showDialogToAdd() {
      this.newMaterial = true;
      this.material = {};
      this.displayDialogNew = true;
  }

  onRowSelect(event) {
      this.qtyAcquire = 0;
      this.newMaterial = false;
      this.material = this.cloneMaterial(event.data);
      this.stockWH = this.mergeStock(this.material, this.warehouse);
      this.displayDialogEdit = true;
  }

<<<<<<< HEAD
  addMaterial() {
    if(this.newMaterial){
      this.material.stock_wh = [];
      var i;
      var objAux;
      for (i = 0; i < this.warehouse.length; i++) {
        objAux = {};
        objAux.wh = this.warehouse[i]._id;
        objAux.stock = 0;
        this.material.stock_wh.push(objAux);
      }
      this.showInventoryService.addInv(this.material).subscribe(res =>{console.log('response is ', res)});
      this.displayDialogNew = false;
    }
    else{
      this.showInventoryService.updateInv(this.material).subscribe(res =>{console.log('response is ', res)});
=======
  onRowSelectWHStock(event) {
    this.displayDialogStock = true;
  }

  editStock() {
    this.showInventoryService.updateStock(this.material._id, this.selectedStock).subscribe(res =>{console.log('response is ', res);});
    this.displayDialogStock = false;
  }

  addMaterial() {
    if(this.newMaterial){
      var msgAux;
      if (this.material.sku==null || this.material.name==null || this.material.brand==null) {
        this.msgs = [];
        msgAux = null;
        if (this.material.sku==null) {
          msgAux = 'SKU requerido';
        } else if(this.material.name==null) {
          msgAux = 'Nombre requerido';
        } else if(this.material.brand==null) {
          msgAux = 'Marca requerida';
        }
        this.msgs.push({severity:'error', summary:'Error', detail:msgAux});
      } else {
        this.material.stock_wh = [];
        var i;
        var objAux;
        for (i = 0; i < this.warehouse.length; i++) {
          objAux = {};
          objAux.wh = this.warehouse[i]._id;
          objAux.stock = 0;
          this.material.stock_wh.push(objAux);
        }
        this.showInventoryService.addInv(this.material).subscribe(res =>{console.log('response is ', res)
        this.getInventory();
        });
        this.displayDialogNew = false;
      }
    }
    else{
      this.showInventoryService.updateInv(this.material).subscribe(res =>{console.log('response is ', res);});
      this.getInventory();
>>>>>>> daniel
      this.displayDialogEdit = false;
    }
  }

  deleteMaterial() {
    if(!this.newMaterial){
      this.showInventoryService.deleteInv(this.material).subscribe(res =>{console.log('response is ', res)});
    }
<<<<<<< HEAD
      this.displayDialogEdit = false;
  }

=======
      let index = this.materials.indexOf(this.selectedMaterial);
      this.materials = this.materials.filter((val, i) => i != index);
      this.displayDialogEDelete = false;
      this.displayDialogEdit = false;
  }

  deleteMaterial2() {
    this.displayDialogEDelete = true;
  }

>>>>>>> daniel
  showWithdraw () {
    this.newWithdraw = {};
    this.displayWithdraw = true;
  }

  cancelWithdraw() {
    this.displayWithdraw = false;
  }

  createWithdraw () {
    this.displayWithdraw = false;
    this.displayDialogEdit = false;
    if(this.withdrawDev){
<<<<<<< HEAD
      this.newWithdraw.status = "Espera devolución"
    }
    else{
      this.newWithdraw.status = "Retirado"
    }
    this.showInventoryService.createWithdraw(this.material._id, this.newWithdraw).subscribe(res =>{console.log('response is ', res)});
=======
      this.newWithdraw.status = "Espera devolución";
    }
    else{
      this.newWithdraw.status = "Retirado";
    }
    let actualWarehouse = "5b4d6a850ea6ac19a061b34d";
    var i;
    var index;
    for (i = 0; i < this.stockWH.length; i++) {
      if(this.stockWH[i].wh == actualWarehouse) {
        index = i;
        this.stockWH[i].stock = this.stockWH[i].stock - this.newWithdraw.qty;
      }
    }
    this.showInventoryService.createWithdraw(this.material._id, this.newWithdraw).subscribe(res =>{console.log('response is ', res)});
    this.showInventoryService.updateStock(this.material._id, this.stockWH[index]).subscribe(res =>{console.log('response is ', res);});
>>>>>>> daniel
  }

  cloneMaterial(c: Inventory): Inventory {
      let material = {};
      for (let prop in c) {
          material[prop] = c[prop];
      }
      return material;
  }

<<<<<<< HEAD
=======
  cloneStock(c) {
      let whSotck = {};
      for (let prop in c) {
          whSotck[prop] = c[prop];
      }
      return whSotck;
  }

>>>>>>> daniel
  mergeStock(c: Inventory, d: Warehouse[]) {
    var finalArray = _.map(c.stock_wh, function(item){
    return _.extend(item, _.omit(_.findWhere(d, {_id: item.wh})));
    });
    return finalArray;
  }

  acquire() {
    this.displayDialogEdit = false;
    this.displayAcquire = true;
  }

  cancelAcquire() {
    this.displayAcquire = false;
  }

  createAcquire() {
    this.showInventoryService.createAcquire(this.material._id, this.qtyAcquire, this.comentsAcquire, this.newDestination._id).subscribe(res =>{console.log('response is ', res)});
    this.displayAcquire = false;
  }

}
