import { Component, OnInit } from '@angular/core';
import { ShowWithdrawService } from './show-withdraw.service';
import { Acquisition } from '../models/acquisition.model';
import { Withdraw } from '../models/withdraw.model';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Warehouse } from '../models/warehouse.model';
import { Inventory } from '../models/inventory.model';
import { Worker } from '../models/worker.model';
import * as moment from 'moment';
import {GrowlModule} from 'primeng/growl';
import {Message} from 'primeng/components/common/api';
import { ShowInventoryService } from '../show-inventory/show-inventory.service';

@Component({
  selector: 'app-show-withdraw',
  templateUrl: './show-withdraw.component.html',
  styleUrls: ['./show-withdraw.component.css'],
  providers: [ ShowWithdrawService, ShowInventoryService ]
})

export class ShowWithdrawComponent implements OnInit {

  displayDialogAdd: boolean;
  displayDialogAddItem: boolean;
  displayDialogEdit: boolean;
  displayDialogFinal: boolean;
  displayDialogCancel: boolean;
  displayDialogCancel2: boolean;
  displayDialogGiveback: boolean;
  withdrawDev: boolean;
  withdraw: Withdraw;
  selectedWithdraw: Withdraw;
  newWithdraw: boolean;
  withdraws: Withdraw[];
  cols: any[];
  cols2: any[];
  warehouse: Warehouse[];
  comentsWithdraw: string;
  newDestination: Warehouse;
  newOrigin: Warehouse;
  newArt: Inventory;
  arts: Inventory[];
  qtyAux: number;
  workers: Worker[];
  worker: Worker;
  newItem: any;
  items: any[];
  selectedItem: any;
  givebackAux: number;
  msgs: Message[] = [];
  groser_wh: string = "5b4d6a850ea6ac19a061b34d";
  stockAux: number;

  constructor(private showWithdrawService: ShowWithdrawService,
  private showInventoryService: ShowInventoryService) {}

  ngOnInit() {
      this.getWithdraws();

      this.cols = [
          { field: '_id', header: 'Código retiro' },
          { field: 'dateFormat1', header: 'Fecha' },
          { field: 'status', header: 'Estado' }
      ];

      this.cols2 = [
          { field: 'name', header: 'Artículo' },
          { field: 'qty', header: 'Cantidad' },
          { field: 'status', header: 'Estado' },
          { field: 'giveback', header: 'Devueltos' }
      ]
  }

  parseWithdraws() {
    var i;
    var j;
    for (i = 0; i < this.withdraws.length; i++) {
        /**this.withdraws[i].art = (this.arts.find(objAux => objAux._id === this.withdraws[i].art)).name; */
        this.withdraws[i].worker = (this.workers.find(objAux => objAux._id === this.withdraws[i].worker)).name;
        this.withdraws[i].dateFormat1 = moment(this.withdraws[i].date1).format("DD/MM/YYYY");
        this.withdraws[i].dateFormat2 = moment(this.withdraws[i].date2).format("DD/MM/YYYY");
        for (j = 0; j < this.withdraws[i].arts.length; j++) {
          this.withdraws[i].arts[j].name = (this.arts.find(objAux => objAux._id === this.withdraws[i].arts[j].art)).name;
        }
    }
  }

  getWithdraws() {
    this.showWithdrawService.getAllWH().subscribe(result => {this.warehouse = result['data'];
      this.showWithdrawService.getAllInv().subscribe(result => {this.arts = result['data'];
        this.showWithdrawService.getAllWithdraw().subscribe(result => {this.withdraws = result['data'];
          this.showWithdrawService.getAllWorkers().subscribe(result => {this.workers = result['data'];
          this.parseWithdraws();
          });
        });
      });
    });
  }

  onRowSelect(event) {
      this.withdraw = this.cloneWithdraw(event.data);
      this.qtyAux = this.withdraw.qty;
      if(this.withdraw.status == "Espera") {
        this.displayDialogEdit = true;
      } else if (this.withdraw.status == "Terminado" || this.withdraw.status == "Cancelado" ) {
        this.displayDialogFinal = true;
      }
  }

  showDialogToAdd() {
    this.displayDialogAdd = true;
    this.withdraw = {};
    this.items = [];
  }

  addItem() {
    this.newItem = {};
    this.newArt = null;
    this.withdrawDev = false;
    this.displayDialogAddItem = true;
  }

  getStock() {
    var artAux;
    this.stockAux = this.newArt.stock_wh.find(objAux => objAux.wh == this.groser_wh).stock;
  }

  addItem2() {
    this.newItem.art = this.newArt._id;
    this.newItem.name = this.newArt.name;
    this.newItem.giveback = 0;
    if(this.withdrawDev) {
      this.newItem.status = "Espera devolución";
    }
    else {
      this.newItem.status = "Retirado";
    }
    if(this.newItem.qty > this.stockAux) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Retiro mayor que stock'});
    } else {
      this.items.push(this.newItem);
      this.displayDialogAddItem = false;
    }
  }

  onRowSelectEditStatus(event) {
    this.displayDialogGiveback = true;
    this.givebackAux = this.selectedItem.qty;
  }

  givebackItem() {
    if(this.selectedItem.qty == this.givebackAux) {
      this.selectedItem.status = "Devuelto";
      this.displayDialogGiveback = false;
      this.selectedItem.giveback = this.givebackAux
    }
    else if(this.givebackAux < 1) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Devolución menor que cero'});
    }
    else if(this.selectedItem.qty > this.givebackAux) {
      this.selectedItem.status = "Devuelto parcial";
      this.displayDialogGiveback = false;
      this.selectedItem.giveback = this.givebackAux
    }
    else if(this.selectedItem.qty < this.givebackAux) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Devolución mayor que retiro'});
    }
  }

  addWithdraw () {
    var i;
    let allAux = true;
    var actualItem;
    var actualStock;
    if (this.items.length < 1) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Se requiere al menos un elemento a ser retirado'});
    } else if(this.withdraw.worker==null) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'Trabajador requerido'});
    } else if(this.withdraw.coments1==null) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'Comentarios requeridos'});
    } else {
      for (i = 0; i < this.items.length; i++) {
        actualItem = this.arts.find(objAux => objAux._id == this.items[i].art);
        actualStock = actualItem.stock_wh.find(objAux => objAux.wh == this.groser_wh).stock;
        this.showInventoryService.updateStock(this.items[i].art, {wh: this.groser_wh, stock: actualStock - this.items[i].qty}).subscribe(res =>{console.log('response is ', res)});
        delete this.items[i].name;
        if(this.items[i].status=="Espera devolución") {
          allAux = false;
        }
      }
      this.withdraw.arts = this.items;
      if(allAux) {
        this.withdraw.status = "Terminado"
      }
      else {
        this.withdraw.status = "Espera"
      }
      this.showWithdrawService.createWithdraw(this.withdraw).subscribe(res =>{console.log('response is ', res)});
      this.getWithdraws();
      this.displayDialogAdd = false;
    }
  }

  updateWithdraw() {
    var actualItem;
    var actualStock;
    var i;
    let allAux = true;
    if(this.withdraw.coments2==null) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Comentarios requeridos'});
    } else {
      for (i = 0; i < this.withdraw.arts.length; i++) {
        actualItem = this.arts.find(objAux => objAux._id == this.withdraw.arts[i].art);
        actualStock = actualItem.stock_wh.find(objAux => objAux.wh == this.groser_wh).stock;
        this.showInventoryService.updateStock(this.withdraw.arts[i].art, {wh: this.groser_wh, stock: actualStock + this.withdraw.arts[i].giveback}).subscribe(res =>{console.log('response is ', res)});
        this.showWithdrawService.updateWithdrawItem(this.withdraw._id, this.withdraw.arts[i]).subscribe(res =>{console.log('response is ', res)});
        if(this.withdraw.arts[i].status=="Espera devolución") {
          allAux = false;
        }
      }
      if(allAux) {
        this.withdraw.status = "Terminado"
      }
      this.showWithdrawService.updateWithdraw(this.withdraw).subscribe(res =>{console.log('response is ', res)});
      this.getWithdraws();
      this.displayDialogEdit = false;
    }
  }

  cloneWithdraw(c: Withdraw): Withdraw {
      let withdraw = {};
      for (let prop in c) {
          withdraw[prop] = c[prop];
      }
      return withdraw;
  }

}
