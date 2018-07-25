import { Component, OnInit } from '@angular/core';
import { ShowInventoryService } from './show-inventory.service';
import { Inventory } from '../models/inventory.model';
import { Warehouse } from '../models/warehouse.model';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as _ from 'underscore';
import {SpinnerModule} from 'primeng/spinner';

@Component({
  selector: 'app-show-inventory',
  templateUrl: './show-inventory.component.html',
  styleUrls: ['./show-inventory.component.css'],
  providers: [ ShowInventoryService ]
})
export class ShowInventoryComponent implements OnInit {

  displayDialog: boolean;
  displayAcquire: boolean;
  material: Inventory;
  selectedMaterial: Inventory;
  newMaterial: boolean;
  materials: Inventory[];
  cols: any[];
  warehouse: Warehouse[];
  stockWH: any[];
  qtyAcquire: number;
  comentsAcquire: string;

  constructor(private showInventoryService: ShowInventoryService) { }

  ngOnInit() {
      this.showInventoryService.getAllInv().subscribe(result => {this.materials = result['data'];});
      this.showInventoryService.getAllWH().subscribe(result => {this.warehouse = result['data'];});

      this.cols = [
          { field: 'sku', header: 'SKU' },
          { field: 'name', header: 'Nombre' },
          { field: 'brand', header: 'Marca' }
      ];
  }

  showDialogToAdd() {
      this.newMaterial = true;
      this.material = {};
      this.displayDialog = true;
  }

  onRowSelect(event) {
      this.newMaterial = false;
      this.material = this.cloneMaterial(event.data);
      this.stockWH = this.mergeStock(this.material, this.warehouse);
      this.displayDialog = true;
  }

  addMaterial() {
    if(this.newMaterial){
      this.showInventoryService.addInv(this.material).subscribe(res =>{console.log('response is ', res)});
    }
    else{
      this.showInventoryService.updateInv(this.material).subscribe(res =>{console.log('response is ', res)});
    }
      this.displayDialog = false;
  }

  deleteMaterial() {
    if(!this.newMaterial){
      this.showInventoryService.deleteInv(this.material).subscribe(res =>{console.log('response is ', res)});
    }
      this.displayDialog = false;
  }

  cloneMaterial(c: Inventory): Inventory {
      let material = {};
      for (let prop in c) {
          material[prop] = c[prop];
      }
      return material;
  }

  mergeStock(c: Inventory, d: Warehouse[]) {
    var finalArray = _.map(c.stock_wh, function(item){
    return _.extend(item, _.omit(_.findWhere(d, {_id: item.wh})));
    });
    return finalArray;
  }

  acquire() {
    this.displayDialog = false;
    this.displayAcquire = true;
  }

  cancelAcquire() {
    this.displayAcquire = false;
  }

  createAcquire() {
    this.showInventoryService.createAcquire(this.material._id, this.qtyAcquire, this.comentsAcquire).subscribe(res =>{console.log('response is ', res)});
    this.displayAcquire = false;
  }

}
