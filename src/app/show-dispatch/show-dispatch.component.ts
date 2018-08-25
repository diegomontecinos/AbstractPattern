import { Component, OnInit } from '@angular/core';
import { ShowDispatchService } from './show-dispatch.service';
import { ShowInventoryService } from '../show-inventory/show-inventory.service';
import { Dispatch } from '../models/dispatch.model';
import { Warehouse } from '../models/warehouse.model';
import { Inventory } from '../models/inventory.model';
import { DropdownModule } from 'primeng/dropdown';
import * as moment from 'moment-timezone';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-show-dispatch',
  templateUrl: './show-dispatch.component.html',
  styleUrls: ['./show-dispatch.component.css'],
  providers: [ShowDispatchService, ShowInventoryService]
})
export class ShowDispatchComponent implements OnInit {

  displayDialogNew: boolean;
  displayDialogEdit: boolean;
  displayDialogFinal: boolean;
  dispatch: Dispatch;
  selectedDispatch: Dispatch;
  newDispatch: boolean;
  dispatchs: Dispatch[];
  cols: any[];
  cols2: any[];
  warehouse: Warehouse[];
  comentsDispatch: string;
  newDestination: Warehouse;
  newOrigin: Warehouse;
  newArt: Inventory;
  arts: Inventory[];
  groser_wh: string;

  constructor(private showDispatchService: ShowDispatchService, private showInventoryService: ShowInventoryService) { }


  ngOnInit() {
      this.groser_wh = sessionStorage.getItem('wh');
      this.getDispatchs();

      this.cols = [
          { field: '_id', header: 'Código despacho' },
          { field: 'origin', header: 'Origen' },
          { field: 'destination', header: 'Destino' },
          { field: 'dateFormat1', header: 'Fecha' },
          { field: 'status', header: 'Estado' }
      ];

      this.cols2 = [
          { field: 'name', header: 'Nombre' },
          { field: 'qty', header: 'Cantidad' }
      ];


  }

  getDispatchs() {
    this.showDispatchService.getAllWH().subscribe(result => {this.warehouse = result['data'];
      this.showDispatchService.getAllInv().subscribe(result => {this.arts = result['data'];
        this.showDispatchService.getAllDis().subscribe(result => {this.dispatchs = result['data'];
          var filtered = [];
          for (var i = 0; i < this.dispatchs.length; i++) {
            if (this.dispatchs[i].destination == this.groser_wh || this.dispatchs[i].origin == this.groser_wh) {
                filtered.push(this.dispatchs[i]);
            }
          }
          this.dispatchs = filtered;
          this.parseDispatchs();
        });
      });
    });
  }

  parseDispatchs() {
    var i;
    var j;
    for (i = 0; i < this.dispatchs.length; i++) {
        this.dispatchs[i].origin = (this.warehouse.find(objAux => objAux._id === this.dispatchs[i].origin)).name;
        this.dispatchs[i].destination = (this.warehouse.find(objAux => objAux._id === this.dispatchs[i].destination)).name;
        this.dispatchs[i].dateFormat1 = moment(this.dispatchs[i].date1).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
        this.dispatchs[i].dateFormat2 = moment(this.dispatchs[i].date2).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
        for (j = 0; j < this.dispatchs[i].arts.length; j++) {
          this.dispatchs[i].arts[j].name = (this.arts.find(objAux => objAux._id === this.dispatchs[i].arts[j].art)).name;
        }
    }

  }

  showDialogToAdd() {
      this.newDispatch = true;
      this.dispatch = {};
      this.displayDialogNew = true;
  }

  onRowSelect(event) {
      if(this.selectedDispatch.status == "Despachado") {
        this.displayDialogEdit = true;
      }
      else {
        this.displayDialogFinal = true;
      }
  }

  createDispatch() {
      this.showDispatchService.addDis(this.dispatch, this.newArt._id, this.newOrigin._id, this.newDestination._id).subscribe(res =>{console.log('response is ', res)});
      this.displayDialogNew = false;
  }

  cancelDispatch() {
      this.showDispatchService.updateStatusDis(this.dispatch, "Cancelado").subscribe(res =>{console.log('response is ', res)});
      this.displayDialogEdit = false;
  }

  rejectDispatch() {
      this.showDispatchService.updateStatusDis(this.selectedDispatch, "Rechazado").subscribe(res =>{console.log('response is ', res)});
      this.getDispatchs();
      this.displayDialogEdit = false;
  }

  receiveDispatch() {
      var actualItem;
      var actualStock;
      var i;
      for (i = 0; i < this.selectedDispatch.arts.length; i++) {
        actualItem = this.arts.find(objAux => objAux._id == this.selectedDispatch.arts[i].art);
        actualStock = actualItem.stock_wh.find(objAux => objAux.wh == this.selectedDispatch.destination).stock;
        this.showInventoryService.updateStock(this.selectedDispatch.arts[i].art, {wh: this.selectedDispatch.destination, stock: actualStock + this.selectedDispatch.arts[i].qty}).subscribe(res =>{console.log('response is ', res)});
      }
      this.showDispatchService.updateStatusDis(this.selectedDispatch, "Recibido").subscribe(res =>{console.log('response is ', res)});
      this.getDispatchs();
      this.displayDialogEdit = false;
  }

  deleteDispatch() {
    if(!this.newDispatch){
      this.showDispatchService.deleteDis(this.dispatch).subscribe(res =>{console.log('response is ', res)});
    }
      this.displayDialogNew = false;
  }

  cloneDispatch(c: Dispatch): Dispatch {
      let dispatch = {};
      for (let prop in c) {
          dispatch[prop] = c[prop];
      }
      return dispatch;
  }

}
