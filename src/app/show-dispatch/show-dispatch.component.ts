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
import { Message } from 'primeng/components/common/api';
import { Router } from '@angular/router';

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
  displayDialogAddItem: boolean;
  selectedDispatch: Dispatch;
  newDispatch: Dispatch;
  dispatchs: Dispatch[];
  cols: any[];
  cols2: any[];
  warehouse: Warehouse[];
  comentsDispatch: string;
  newDestination: Warehouse;
  arts: Inventory[];
  groser_wh: string;
  newItem: Inventory;
  newItemQty: number;
  newItemStock: number;
  msgs: Message[] = [];
  userType: string;
  statuses: any[];

  constructor(private showDispatchService: ShowDispatchService, private showInventoryService: ShowInventoryService, private router: Router) { }


  ngOnInit() {
      this.userType = sessionStorage.getItem('type')
      this.groser_wh = sessionStorage.getItem('wh');
      if(this.userType == 'central' || this.userType == 'bodeguero') {
      }
      else {
        this.router.navigate(['']);
      }
      this.getDispatchs();

      this.cols = [
          { field: '_id', header: 'Código despacho' },
          { field: 'originParsed', header: 'Origen' },
          { field: 'destinationParsed', header: 'Destino' },
          { field: 'dateFormat1', header: 'Fecha' },
          { field: 'status', header: 'Estado' }
      ];

      this.cols2 = [
          { field: 'name', header: 'Nombre' },
          { field: 'qty', header: 'Cantidad' }
      ];

      this.statuses = [
          { label: 'Todo', value: null },
          { label: 'Despachado', value: 'Despachado' },
          { label: 'Recibido', value: 'Recibido' },
          { label: 'Rechazado', value: 'Rechazado' },
          { label: 'Cancelado', value: 'Cancelado' }
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
        this.dispatchs[i].originParsed = (this.warehouse.find(objAux => objAux._id === this.dispatchs[i].origin)).name;
        this.dispatchs[i].destinationParsed = (this.warehouse.find(objAux => objAux._id === this.dispatchs[i].destination)).name;
        this.dispatchs[i].dateFormat1 = moment(this.dispatchs[i].date1).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
        this.dispatchs[i].dateFormat2 = moment(this.dispatchs[i].date2).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
        for (j = 0; j < this.dispatchs[i].arts.length; j++) {
          this.dispatchs[i].arts[j].name = (this.arts.find(objAux => objAux._id === this.dispatchs[i].arts[j].art)).name;
        }
    }

  }

  showDialogToAdd() {
      this.newDispatch = {};
      this.newDispatch.arts = [];
      this.newDestination = null;
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
    var msgAux;
    if (this.newDispatch.arts.length < 1 || this.newDispatch.destination==null || this.newDispatch.coments1==null) {
      this.msgs = [];
      msgAux = null;
      if (this.newDispatch.arts.length < 1) {
        msgAux = 'Se requiere al menos un elemento a despachar';
      } else if(this.newDispatch.destination==null) {
        msgAux = 'Seleccione destino';
      } else if(this.newDispatch.coments1==null) {
        msgAux = 'Comentarios requeridos';
      }
      this.msgs.push({severity:'error', summary:'Error', detail:msgAux});
    }
    else {
      var actualItem;
      var actualStock;
      var i;
      for (i = 0; i < this.newDispatch.arts.length; i++) {
        actualItem = this.arts.find(objAux => objAux._id == this.newDispatch.arts[i].art);
        actualStock = actualItem.stock_wh.find(objAux => objAux.wh == this.groser_wh).stock;
        this.showInventoryService.updateStock(this.newDispatch.arts[i].art, {wh: this.groser_wh, stock: actualStock - this.newDispatch.arts[i].qty}).subscribe(res =>{console.log('response is ', res)});
        delete this.newDispatch.arts[i].name;
      }
      this.newDispatch.origin = this.groser_wh;
      this.newDispatch.date1 = Date.now();
      this.showDispatchService.createDispatch(this.newDispatch).subscribe(res =>{console.log('response is ', res)});
      this.getDispatchs();
      this.displayDialogNew = false;
    }
  }

  addItem() {
    this.newItem = null;
    this.newItemQty = null;
    this.newItemStock = null;
    this.displayDialogAddItem = true;
  }

  addItem2() {
    this.newDispatch.arts.push({name: this.newItem.name, art: this.newItem._id, qty: this.newItemQty})
    this.displayDialogAddItem = false;
  }

  getStock() {
    this.newItemStock = this.newItem.stock_wh.find(objAux => objAux.wh == this.groser_wh).stock;
    this.newItemQty = 1;
  }

  setDestination() {
    this.newDispatch.destination = this.newDestination._id;
  }

  cancelDispatch() {
      this.showDispatchService.updateStatusDis(this.selectedDispatch, "Cancelado").subscribe(res =>{console.log('response is ', res)});
      this.displayDialogEdit = false;
  }

  rejectDispatch() {
    if (this.selectedDispatch.coments2==null) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail: "Comenatrios requeridos"});
    } else {
      this.showDispatchService.updateStatusDis(this.selectedDispatch, "Rechazado").subscribe(res =>{console.log('response is ', res)});
      this.getDispatchs();
      this.displayDialogEdit = false;
    }
  }

  receiveDispatch() {
      if (this.selectedDispatch.coments2==null) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail: "Comenatrios requeridos"});
      }
      else {
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
  }

  deleteDispatch() {
    if(!this.newDispatch){
      this.showDispatchService.deleteDis(this.selectedDispatch).subscribe(res =>{console.log('response is ', res)});
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
