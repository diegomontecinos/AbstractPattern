import { Component, OnInit } from '@angular/core';
import { ShowAcquisitionService } from './show-acquisition.service';
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

@Component({
  selector: 'app-show-acquisition',
  templateUrl: './show-acquisition.component.html',
  styleUrls: ['./show-acquisition.component.css'],
  providers: [ ShowAcquisitionService ]
})

export class ShowAcquisitionComponent implements OnInit {

    displayDialogNew: boolean;
    displayDialogConfirm: boolean;
    displayDialogReceive: boolean;
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

    constructor(private showAcquisitionService: ShowAcquisitionService) { }

    ngOnInit() {
        this.getAcquisition();

        this.cols = [
            { field: '_id', header: 'Código adquisición' },
            { field: 'date1Format', header: 'Fecha' },
            { field: 'status', header: 'Estado' }
        ];

        this.cols2 = [
            { field: 'name', header: 'Nombre' },
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
      for (i = 0; i < this.acquisitions.length; i++) {
          this.acquisitions[i].date1Format = moment(this.acquisitions[i].date1).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
          this.acquisitions[i].date2Format = moment(this.acquisitions[i].date2).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
          this.acquisitions[i].date3Format = moment(this.acquisitions[i].date3).tz('America/Santiago').format("DD/MM/YYYY HH:mm:ss");
          for (j = 0; j < this.acquisition[i].arts.length; j++) {
            this.acquisition[i].arts[j].name = (this.arts.find(objAux => objAux._id === this.acquisition[i].arts[j].art)).name;
          }
      }
    }

    showDialogToAdd() {
      this.newAcquisition = {};
      this.newAcquisition.arts = [];
      this.displayDialogNew = true;
    }

    onRowSelect(event) {
      this.displayDialogReceive = true;
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
