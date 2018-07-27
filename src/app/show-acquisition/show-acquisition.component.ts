import { Component, OnInit } from '@angular/core';
import { ShowAcquisitionService } from './show-acquisition.service';
import { Acquisition } from '../models/acquisition.model';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Warehouse } from '../models/warehouse.model';
import { Inventory } from '../models/inventory.model';
import * as moment from 'moment';

@Component({
  selector: 'app-show-acquisition',
  templateUrl: './show-acquisition.component.html',
  styleUrls: ['./show-acquisition.component.css'],
  providers: [ ShowAcquisitionService ]
})

export class ShowAcquisitionComponent implements OnInit {

    displayDialogNew: boolean;
    displayDialogEdit: boolean;
    acquisition: Acquisition;
    selectedAcq: Acquisition;
    newAcquisition: boolean;
    acquisitions: Acquisition[];
    cols: any[];
    arts: Inventory[];
    warehouse: Warehouse[];
    newDestination: Warehouse;
    newArt: Inventory;

    constructor(private showAcquisitionService: ShowAcquisitionService) { }

    ngOnInit() {
        this.showAcquisitionService.getAllWH().subscribe(result => {this.warehouse = result['data'];
          this.showAcquisitionService.getAllInv().subscribe(result => {this.arts = result['data'];
            this.showAcquisitionService.getAllAcq().subscribe(result => {this.acquisitions = result['data'];
              this.parseAcq();
            });
          });
        });

        this.cols = [
            { field: '_id', header: 'Código adquisición' },
            { field: 'art', header: 'Nombre' },
            { field: 'qty', header: 'Cantidad' },
            { field: 'destination', header: 'Destino' },
            { field: 'dateAcqFormat', header: 'Fecha' },
            { field: 'status', header: 'Estado' }
        ];
    }

    parseAcq() {
      var i;
      for (i = 0; i < this.acquisitions.length; i++) {
          this.acquisitions[i].art = (this.arts.find(objAux => objAux._id === this.acquisitions[i].art)).name;
          this.acquisitions[i].destination = (this.warehouse.find(objAux => objAux._id === this.acquisitions[i].destination)).name;
          this.acquisitions[i].dateAcqFormat = moment(this.acquisitions[i].dateAcq).format("DD/MM/YYYY");
      }
    }

    showDialogToAdd() {
        this.newAcquisition = true;
        this.acquisition = {};
        this.displayDialogNew = true;
    }

    onRowSelect(event) {
        this.newAcquisition = false;
        this.acquisition = this.cloneAcq(event.data);
        this.displayDialogEdit = true;
    }

    addAcq() {
        this.showAcquisitionService.addAcq(this.acquisition, this.newArt._id, this.newDestination._id).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogNew = false;
    }

    cancelAcq() {
        this.acquisition.status = "Cancelado"
        this.showAcquisitionService.updateStatusAcq(this.acquisition).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogEdit = false;
    }

    receiveAcq() {
        this.acquisition.status = "Recibido"
        this.showAcquisitionService.updateStatusAcq(this.acquisition).subscribe(res =>{console.log('response is ', res)});
        this.displayDialogEdit = false;
    }

    deleteAcq() {
      if(!this.newAcquisition){
        this.showAcquisitionService.deleteAcq(this.acquisition).subscribe(res =>{console.log('response is ', res)});
      }
        this.displayDialogNew = false;
    }

    cloneAcq(c: Acquisition): Acquisition {
        let acquisition = {};
        for (let prop in c) {
            acquisition[prop] = c[prop];
        }
        return acquisition;
    }
}
