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

@Component({
  selector: 'app-show-inventory',
  templateUrl: './show-inventory.component.html',
  styleUrls: ['./show-inventory.component.css'],
  providers: [ ShowInventoryService ]
})
export class ShowInventoryComponent implements OnInit {

  displayDialogNew: boolean;
  displayDialogEdit: boolean;
  displayAcquire: boolean;
  displayWithdraw: boolean;
  displayDialogStock: boolean;
  displayDialogEDelete: boolean;
  material: Inventory;
  selectedMaterial: Inventory;
  newMaterial: boolean;
  materials: Inventory[];
  cols: any[];
  cols2: any[];
  warehouse: Warehouse[];
  stockWH: any[any];
  qtyAcquire: number;
  comentsAcquire: string;
  newDestination: Warehouse;
  newWithdraw: Withdraw;
  withdrawDev: boolean;
  selectedStock: any;

  constructor(private showInventoryService: ShowInventoryService) { }

  ngOnInit() {
      this.showInventoryService.getAllWH().subscribe(result => {this.warehouse = result['data'];
      this.getInventory();
    });

      this.cols = [
          { field: 'sku', header: 'SKU' },
          { field: 'name', header: 'Nombre' },
          { field: 'brand', header: 'Marca' }
      ];

      this.cols2 = [
          { field: 'name', header: 'Bodega' },
          { field: 'stock', header: 'Stock' }
      ];
  }

  getInventory() {
      this.showInventoryService.getAllInv().subscribe(result => {this.materials = result['data'];});
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

  onRowSelectWHStock(event) {
    this.displayDialogStock = true;
  }

  editStock() {
    this.showInventoryService.updateStock(this.material._id, this.selectedStock).subscribe(res =>{console.log('response is ', res);});
    this.displayDialogStock = false;
  }

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
      this.showInventoryService.addInv(this.material).subscribe(res =>{console.log('response is ', res)
      this.getInventory();
      });
      this.displayDialogNew = false;
    }
    else{
      this.showInventoryService.updateInv(this.material).subscribe(res =>{console.log('response is ', res);});
      this.displayDialogEdit = false;
    }

  }

  deleteMaterial() {
    if(!this.newMaterial){
      this.showInventoryService.deleteInv(this.material).subscribe(res =>{console.log('response is ', res)});
    }
      let index = this.materials.indexOf(this.selectedMaterial);
      this.materials = this.materials.filter((val, i) => i != index);
      this.displayDialogEDelete = false;
      this.displayDialogEdit = false;
  }

  deleteMaterial2() {
    this.displayDialogEDelete = true;
  }

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
  }

  cloneMaterial(c: Inventory): Inventory {
      let material = {};
      for (let prop in c) {
          material[prop] = c[prop];
      }
      return material;
  }

  cloneStock(c) {
      let whSotck = {};
      for (let prop in c) {
          whSotck[prop] = c[prop];
      }
      return whSotck;
  }

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
