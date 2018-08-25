import { Component, OnInit } from '@angular/core';
import { ShowAcquisitionService } from './show-acquisition.service';
import { ShowInventoryService } from '../show-inventory/show-inventory.service';
import { Acquisition } from '../models/acquisition.model';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Warehouse } from '../models/warehouse.model';
import { Inventory } from '../models/inventory.model';
import * as moment from 'moment-timezone';
import { Message } from 'primeng/components/common/api';
import {GrowlModule} from 'primeng/growl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-acquisition',
  templateUrl: './show-acquisition.component.html',
  styleUrls: ['./show-acquisition.component.css'],
  providers: [ ShowAcquisitionService, ShowInventoryService ]
})

export class ShowAcquisitionComponent implements OnInit {

    displayDialogNew: boolean;
    displayDialogEdit: boolean;
    displayDialogConfirm: boolean;
    displayDialogConfirmGroser: boolean;
    displayDialogDispatch: boolean;
    displayDialogDispatch2: boolean;
    displayDialogRejected: boolean;
    displayDialogReceive: boolean;
    displayDialogFinal: boolean;
    displayDialogAddItem: boolean;
    newAcquisition: Acquisition;
    acquisition: Acquisition;
    selectedAcquisition: Acquisition;
    acquisitions: Acquisition[];
    cols: any[];
    cols2: any[];
    arts: Inventory[];
    warehouse: Warehouse[];
    newDestination: Warehouse;
    newItem: Inventory;
    newItemQty: number;
    msgs: Message[] = [];
    userType: string;
    groser_wh: string;

    constructor(private showAcquisitionService: ShowAcquisitionService, private router: Router,
                private showInventoryService: ShowInventoryService) { }

    ngOnInit() {
        this.userType = sessionStorage.getItem('type');
        this.groser_wh = sessionStorage.getItem('wh');
        if(this.userType == 'admin' || this.userType == 'central') {
        }
        else {
          this.router.navigate(['']);
        }
        this.getAcquisition();

        this.cols = [
            { field: '_id', header: 'Código adquisición' },
            { field: 'dateFormat1', header: 'Fecha' },
            { field: 'status', header: 'Estado' }
        ];

        this.cols2 = [
            { field: 'name', header: 'Nombre' },
            { field: 'brand', header: 'Marca' },
            { field: 'qty', header: 'Cantidad' }
        ];
    }

    getAcquisition() {
      this.showAcquisitionService.getAllWH().subscribe(result => {this.warehouse = result['data'];
        this.showAcquisitionService.getAllInv().subscribe(result => {this.arts = result['data'];
          this.showAcquisitionService.getAllAcq().subscribe(result => {this.acquisitions = result['data'];
            this.parseAcquisition();
          });
        });
      });
    }

    parseAcquisition() {
      var i;
      var j;
      var artAux;
      for (i = 0; i < this.acquisitions.length; i++) {
          this.acquisitions[i].dateFormat1 = moment(this.acquisitions[i].date1).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
          this.acquisitions[i].dateFormat2 = moment(this.acquisitions[i].date2).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
          this.acquisitions[i].dateFormat3 = moment(this.acquisitions[i].date3).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
          for (j = 0; j < this.acquisitions[i].arts.length; j++) {
             artAux = (this.arts.find(objAux => objAux._id === this.acquisitions[i].arts[j].art));
             this.acquisitions[i].arts[j].name = artAux.name;
             this.acquisitions[i].arts[j].brand = artAux.brand;
          }
      }
    }

    showDialogToAdd() {
      this.newAcquisition = {};
      this.newAcquisition.arts = [];
      this.displayDialogNew = true;
    }

    onRowSelect(event) {
      if(this.selectedAcquisition.status=="Espera") {
        if(this.userType == 'central') {
          this.displayDialogEdit = true;
        }
        else if(this.userType == 'admin') {
          this.displayDialogConfirm = true;
        }
      }
      else if(this.selectedAcquisition.status=="Confirmado") {
        if(this.userType == 'central') {
          this.displayDialogConfirmGroser = true;
        }
        else if(this.userType == 'admin') {
          this.displayDialogDispatch = true;
        }
      }
      else if(this.selectedAcquisition.status=="Rechazado") {
        if(this.userType == 'central') {
          this.displayDialogConfirmGroser = true;
        }
        else if(this.userType == 'admin') {
          this.displayDialogConfirmGroser = true;
        }
      }
      else if(this.selectedAcquisition.status=="Despachado") {
        if(this.userType == 'central') {
          this.displayDialogReceive = true;
        }
        else if(this.userType == 'admin') {
          this.displayDialogDispatch2 = true;
        }
      }
      else if(this.selectedAcquisition.status=="Recibido") {
        if(this.userType == 'central') {
          this.displayDialogFinal = true;
        }
        else if(this.userType == 'admin') {
          this.displayDialogFinal = true;
        }
      }

    }

    addItem() {
      this.newItem = {};
      this.newItemQty = null;
      this.displayDialogAddItem = true;
    }

    addItem2() {
      this.newAcquisition.arts.push({name: this.newItem.name, art: this.newItem._id, qty: this.newItemQty})
      this.displayDialogAddItem = false;
    }

    createAcquisition() {
      var i;
      var msgAux;
      if (this.newAcquisition.arts.length < 1 || this.newAcquisition.coments1==null) {
        this.msgs = [];
        msgAux = null;
        if (this.newAcquisition.arts.length < 1) {
          msgAux = 'Se requiere al menos un elemento a ser retirado';
        } else if(this.newAcquisition.coments1==null) {
          msgAux = 'Comentarios requeridos';
        }
        this.msgs.push({severity:'error', summary:'Error', detail:msgAux});
      }
       else {
        for (i = 0; i < this.newAcquisition.arts.length; i++) {
          delete this.newAcquisition.arts[i].name;
        }
        this.newAcquisition.status = "Espera"
        this.showAcquisitionService.createAcquisition(this.newAcquisition).subscribe(res =>{console.log('response is ', res)});
        this.getAcquisition();
        this.displayDialogNew = false;
      }
    }

    cancelAcq() {
        this.acquisition.status = "Cancelado"
        this.showAcquisitionService.updateStatusAcq(this.acquisition).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogReceive = false;
    }

    cancelAcquisition() {
      this.showAcquisitionService.cancelAcquisition(this.selectedAcquisition._id).subscribe(res =>{console.log('response is ', res)});
      let index = this.acquisitions.indexOf(this.selectedAcquisition);
      this.acquisitions = this.acquisitions.filter((val, i) => i != index);
      this.displayDialogEdit = false;
    }

    confirmAcquisition() {
      if(this.selectedAcquisition.coments2 == null) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'Comentarios requeridos'});
      }
      else {
        this.selectedAcquisition.status = "Confirmado";
        this.selectedAcquisition.date2 = Date.now();
        this.showAcquisitionService.updateAcquisition(this.selectedAcquisition).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogConfirm = false;
      }
    }

    rejectAcquisition() {
      if(this.selectedAcquisition.coments2 == null) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'Comentarios requeridos'});
      }
      else {
        this.selectedAcquisition.status = "Rechazado";
        this.selectedAcquisition.date2 = Date.now();
        this.showAcquisitionService.updateAcquisition(this.selectedAcquisition).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogConfirm = false;
      }
    }

    dispatchAcquisition() {
      if(this.selectedAcquisition.coments3 == null) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'Comentarios requeridos'});
      }
      else {
        this.selectedAcquisition.status = "Despachado";
        this.selectedAcquisition.date3 = Date.now();
        this.showAcquisitionService.updateAcquisition(this.selectedAcquisition).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogDispatch = false;
      }
    }

    receiveAcquisition() {
      if(this.selectedAcquisition.coments4 == null) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'Comentarios requeridos'});
      }
      else {
        var actualItem;
        var actualStock;
        var i;
        for (i = 0; i < this.selectedAcquisition.arts.length; i++) {
          actualItem = this.arts.find(objAux => objAux._id == this.selectedAcquisition.arts[i].art);
          actualStock = actualItem.stock_wh.find(objAux => objAux.wh == this.groser_wh).stock;
          this.showInventoryService.updateStock(this.selectedAcquisition.arts[i].art, {wh: this.groser_wh, stock: actualStock + this.selectedAcquisition.arts[i].qty}).subscribe(res =>{console.log('response is ', res)});
        }
        this.selectedAcquisition.status = "Recibido";
        this.selectedAcquisition.date4 = Date.now();
        this.showAcquisitionService.updateAcquisition(this.selectedAcquisition).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogReceive = false;
      }
    }

    receiveAcq() {
        this.acquisition.status = "Recibido"
        this.showAcquisitionService.updateStatusAcq(this.acquisition).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogReceive = false;
    }

    deleteAcq() {
        this.showAcquisitionService.deleteAcq(this.acquisition).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogNew = false;
    }

}
