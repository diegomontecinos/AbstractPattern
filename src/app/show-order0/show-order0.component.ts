import { Component, OnInit } from '@angular/core';
import { ShowOrder0Service } from './show-order0.service';
import { Orders } from '../models/order.model';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inventory } from '../models/inventory.model';
import { Warehouse } from '../models/warehouse.model';
import { Worker } from '../models/worker.model';
import { Message } from 'primeng/components/common/api';
import { Dispatch } from '../models/dispatch.model';
import * as moment from 'moment-timezone';
import { ShowInventoryService } from '../show-inventory/show-inventory.service';

@Component({
  selector: 'app-show-order0',
  templateUrl: './show-order0.component.html',
  styleUrls: ['./show-order0.component.css'],
  providers: [ ShowOrder0Service, ShowInventoryService ]
})

export class ShowOrder0Component implements OnInit {

    displayDialog: boolean;
    displayDialogAddOrder: boolean;
    displayDialogAddItem: boolean;
    displayDialogEdit: boolean;
    displayDialogDispatch: boolean;
    displayDialogDispatch2: boolean;
    displayDialogFinal: boolean;
    newOrder: Orders;
    newDispatch: Dispatch;
    selectedOrder: Orders;
    orders: Orders[];
    cols: any[];
    cols2: any[];
    arts: Inventory[];
    selectedItem: any;
    selectedItemDispatch: any;
    newItem: any;
    warehouse: Warehouse[];
    workers: Worker[];
    groser_wh: string = "5b4d6a850ea6ac19a061b34d";
    msgs: Message[] = [];
    artsXDispatch: any[];
    stockAux: number;
    originAux: any;

    constructor(private showOrder0Service: ShowOrder0Service,
    private showInventoryService: ShowInventoryService) {}

    ngOnInit() {
        this.getOrders();

        this.cols = [
            { field: '_id', header: 'Código' },
            { field: 'dateFormat1', header: 'Fecha'},
            { field: 'status', header: 'Estado' }
        ];

        this.cols2 = [
            { field: 'name', header: 'Nombre' },
            { field: 'qty', header: 'Cantidad' },
            { field: 'disp', header: 'Despachado'},
            { field: 'status', header: 'Estado' }
        ];
    }

    getOrders() {
      this.showOrder0Service.getAllWH().subscribe(result => {this.warehouse = result['data'];
        this.showOrder0Service.getAllInv().subscribe(result => {this.arts = result['data'];
          this.showOrder0Service.getAllOrd().subscribe(result => {this.orders = result['data'];
            this.showOrder0Service.getAllWorkers().subscribe(result => {this.workers = result['data'];
            this.parseOrders();
            });
          });
        });
      });
    }

    parseOrders() {
      var i;
      var j;
      for (i = 0; i < this.orders.length; i++) {
          /**this.withdraws[i].art = (this.arts.find(objAux => objAux._id === this.withdraws[i].art)).name; */
          this.orders[i].dateFormat1 = moment(this.orders[i].date1).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
          this.orders[i].dateFormat2 = moment(this.orders[i].date2).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
          for (j = 0; j < this.orders[i].arts.length; j++) {
            this.orders[i].arts[j].name = (this.arts.find(objAux => objAux._id === this.orders[i].arts[j].art)).name;
          }
      }
    }

    showDialogAddOrder() {
        this.newOrder = {};
        this.newOrder.arts = [];
        this.displayDialogAddOrder = true;
    }

    onRowSelect(event) {
      if(this.selectedOrder.status == "Espera") {
        this.displayDialogEdit = true;
      }
      else {
        this.displayDialogFinal = true;
      }
    }

    onRowSelectAddItem(event) {
    }

    onRowSelectDispatch($event) {
      if(this.newDispatch.origin == null) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail: "Primero seleccione origen"});
      }
      else {
        this.getStock();
        this.displayDialogDispatch2 = true;
      }
    }

    addItemDispatch() {
      if(this.selectedItemDispatch.disp == this.selectedItemDispatch.qty){
        this.selectedItemDispatch.status = "Despachado";
      }
      this.newDispatch.arts.push(this.selectedItemDispatch);
      let index = this.artsXDispatch.indexOf(this.selectedItemDispatch);
      this.artsXDispatch = this.artsXDispatch.filter((val, i) => i != index);
      this.displayDialogDispatch2 = false;
    }

    getStock() {
      var artAux;
      artAux = this.arts.find(objAux => objAux._id == this.selectedItemDispatch.art);
      this.stockAux = artAux.stock_wh.find(objAux => objAux.wh == this.newDispatch.origin).stock;
    }

    setOrigin() {
      this.newDispatch.origin = this.originAux._id;
    }

    generateDispatch() {
      this.artsXDispatch = [];
      this.newDispatch = {};
      this.newDispatch.arts = [];
      this.newDispatch.origin = this.groser_wh;
      var i;
      for(i = 0; i < this.selectedOrder.arts.length; i++) {
        if(this.selectedOrder.arts[i].status == "Espera") {
          this.artsXDispatch.push(this.selectedOrder.arts[i])
        }
      }
      this.displayDialogDispatch = true;
    }

    createDispatch() {
      var i;
      var statusOrder: boolean = true;
      var actualItem;
      var actualStock;
      var statusItem;
      for (i = 0; i < this.newDispatch.arts.length; i++) {
        if(this.newDispatch.arts[i].qty==this.newDispatch.arts[i].disp){
          statusItem = "Despachado";
        }
        else{
          statusItem = "Espera";
          statusOrder = false;
        }
        if(statusOrder==true){
          this.showOrder0Service.updateOrderStatus({id: this.selectedOrder._id, status: "Finalizado"}).subscribe(res =>{console.log('response is ', res)});
        }
        actualItem = this.arts.find(objAux => objAux._id == this.newDispatch.arts[i].art);
        actualStock = actualItem.stock_wh.find(objAux => objAux.wh == this.newDispatch.origin).stock;
        this.showInventoryService.updateStock(this.newDispatch.arts[i].art, {wh: this.newDispatch.origin, stock: actualStock - this.newDispatch.arts[i].disp}).subscribe(res =>{console.log('response is ', res)});
        this.showOrder0Service.updateOrderItem({id: this.selectedOrder._id, art: this.newDispatch.arts[i].art, status: statusItem, disp: this.newDispatch.arts[i].disp}).subscribe(res =>{console.log('response is ', res)});
        this.newDispatch.arts[i] = {art: this.newDispatch.arts[i].art, qty: this.newDispatch.arts[i].disp};
      }
      this.newDispatch.order = this.selectedOrder._id;
      this.newDispatch.destination = this.selectedOrder.destination;
      this.newDispatch.status = "Despachado";
      this.showOrder0Service.createDispatch(this.newDispatch).subscribe(res =>{console.log('response is ', res)});
      this.displayDialogDispatch = false;
      this.displayDialogEdit = false;
      this.getOrders();
    }

    createOrder() {
      var msgAux;
      if(this.newOrder.coments1 == null || this.newOrder.arts.length < 1) {
        this.msgs = [];
        msgAux = null;
        if(this.newOrder.arts.length < 1) {
          msgAux = "Se debe añadir al menos un elemento a la orden";
        } else if(this.newOrder.coments1 == null) {
          msgAux = "Faltan comentarios de la orden";
        }
        this.msgs.push({severity:'error', summary:'Error', detail:msgAux});
      }
      else {
        this.newOrder.destination = this.groser_wh;
        this.newOrder.status = "Espera";
        this.showOrder0Service.createOrder(this.newOrder).subscribe(res =>{console.log('response is ', res)});
        this.getOrders();
        this.displayDialogAddOrder = false;
      }
    }

    addItem() {
      this.newItem = {};
      this.displayDialogAddItem = true;
    }

    addItem2() {
      this.newOrder.arts.push({art: this.newItem.art._id, name: this.newItem.art.name, qty: this.newItem.qty, status: "Espera", disp: 0});
      this.displayDialogAddItem = false;
    }

    deleteOrder() {
    }

}
