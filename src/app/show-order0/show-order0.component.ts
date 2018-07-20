import { Component, OnInit } from '@angular/core';
import { ShowOrder0Service } from './show-order0.service';
import { Orders } from '../models/order.model';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-show-order0',
  templateUrl: './show-order0.component.html',
  styleUrls: ['./show-order0.component.css'],
  providers: [ ShowOrder0Service ]
})

export class ShowOrder0Component implements OnInit {

    displayDialog: boolean;

    order: Orders;

    selectedOrder: Orders;

    newOrder: boolean;

    orders: Orders[];

    cols: any[];

    constructor(private showOrder0Service: ShowOrder0Service) { }

    ngOnInit() {
        this.showOrder0Service.getAllOrd().subscribe(result => {this.orders = result['data'];});

        this.cols = [
            { field: 'name', header: 'Nombre' },
            { field: 'qty', header: 'Cantidad' },
            { field: 'status', header: 'Estado' }
        ];
    }

    showDialogToAdd() {
        this.newOrder = true;
        this.order = {};
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.newOrder = false;
        this.order = this.cloneOrder(event.data);
        this.displayDialog = true;
    }

    addOrder() {
      if(this.newOrder){
        this.showOrder0Service.addOrder(this.order).subscribe(res =>{console.log('response is ', res)});
      }
      else{
        this.showOrder0Service.updateOrder(this.order).subscribe(res =>{console.log('response is ', res)});
      }
        this.displayDialog = false
    }

    deleteOrder() {
      if(!this.newOrder){
        this.showOrder0Service.deleteOrder(this.order).subscribe(res =>{console.log('response is ', res)});    
      }
        this.displayDialog = false;
    }

    cloneOrder(c: Orders): Orders {
        let order = {};
        for (let prop in c) {
            order[prop] = c[prop];
        }
        return order;
    }
}
