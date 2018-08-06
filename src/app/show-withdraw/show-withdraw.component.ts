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
import * as moment from 'moment';

@Component({
  selector: 'app-show-withdraw',
  templateUrl: './show-withdraw.component.html',
  styleUrls: ['./show-withdraw.component.css'],
  providers: [ ShowWithdrawService ]
})


export class ShowWithdrawComponent implements OnInit {

  displayDialogEdit: boolean;
  displayDialogFinal: boolean;
  displayDialogCancel: boolean;
  displayDialogCancel2: boolean;
  withdraw: Withdraw;
  selectedWithdraw: Withdraw;
  newWithdraw: boolean;
  withdraws: Withdraw[];
  cols: any[];
  warehouse: Warehouse[];
  comentsWithdraw: string;
  newDestination: Warehouse;
  newOrigin: Warehouse;
  newArt: Inventory;
  arts: Inventory[];
  qtyAux: number;

  constructor(private showWithdrawService: ShowWithdrawService) { }


  ngOnInit() {

      this.showWithdrawService.getAllWH().subscribe(result => {this.warehouse = result['data'];
        this.showWithdrawService.getAllInv().subscribe(result => {this.arts = result['data'];
          this.showWithdrawService.getAllWithdraw().subscribe(result => {this.withdraws = result['data'];
            this.parseWithdraws();
          });
        });
      });

      this.cols = [
          { field: '_id', header: 'Código retiro' },
          { field: 'art', header: 'Artículo' },
          { field: 'qty', header: 'Cantidad' },
          { field: 'dateFormat1', header: 'Fecha' },
          { field: 'status', header: 'Estado' }
      ];
  }

  parseWithdraws() {
    var i;
    for (i = 0; i < this.withdraws.length; i++) {
        this.withdraws[i].art = (this.arts.find(objAux => objAux._id === this.withdraws[i].art)).name;
        this.withdraws[i].dateFormat1 = moment(this.withdraws[i].date1).format("DD/MM/YYYY");
        this.withdraws[i].dateFormat2 = moment(this.withdraws[i].date2).format("DD/MM/YYYY");
    }

  }

  onRowSelect(event) {
      this.newWithdraw = false;
      this.withdraw = this.cloneWithdraw(event.data);
      this.qtyAux = this.withdraw.qty;
      if(this.withdraw.status == "Espera devolución") {
        this.displayDialogEdit = true;
      } else if (this.withdraw.status == "Cancelado" || this.withdraw.status == "No regresado" || this.withdraw.status == "Regreado parcial"
                    || this.withdraw.status == "Regresado") {
        this.displayDialogFinal = true;
      } else if (this.withdraw.status == "Retirado") {
        this.displayDialogCancel = true;
      }

  }

  cancelWithdraw() {
      this.displayDialogCancel2 = true;
  }

  cancelWithdraw2() {
      this.withdraw.status = "Cancelado"
      this.showWithdrawService.updateStatusWithdraw(this.withdraw).subscribe(res =>{console.log('response is ', res)});
      this.displayDialogCancel = false;
      this.displayDialogCancel2 = false;
  }

  givebackWithdraw() {
      if(this.qtyAux == this.withdraw.qty) {
        this.withdraw.status = "Regresado";
        this.showWithdrawService.updateStatusWithdraw(this.withdraw).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogEdit = false;
      } else if (this.qtyAux < this.withdraw.qty) {
        this.withdraw.status = "Regresado parcial";
        this.showWithdrawService.updateStatusWithdraw(this.withdraw).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogEdit = false;
      } else if (this.qtyAux > this.withdraw.qty) {}
  }

  nogivebackWithdraw() {
    this.withdraw.status = "No regresado";
    this.showWithdrawService.updateStatusWithdraw(this.withdraw).subscribe(res =>{console.log('response is ', res)});
  }

  cloneWithdraw(c: Withdraw): Withdraw {
      let withdraw = {};
      for (let prop in c) {
          withdraw[prop] = c[prop];
      }
      return withdraw;
  }

}
