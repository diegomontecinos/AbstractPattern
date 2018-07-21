import { Component, OnInit } from '@angular/core';
import { ShowAcquisitionService } from './show-acquisition.service';
import { Acquisition } from '../models/acquisition.model';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-show-acquisition',
  templateUrl: './show-acquisition.component.html',
  styleUrls: ['./show-acquisition.component.css'],
  providers: [ ShowAcquisitionService ]
})

export class ShowAcquisitionComponent implements OnInit {

    displayDialog: boolean;
    acquisition: Acquisition;
    selectedAcq: Acquisition;
    newAcquisition: boolean;
    acquisitions: Acquisition[];
    cols: any[];

    constructor(private showAcquisitionService: ShowAcquisitionService) { }

    ngOnInit() {
        this.showAcquisitionService.getAllAcq().subscribe(result => {this.acquisitions = result['data'];});

        this.cols = [
            { field: 'art', header: 'Nombre' },
            { field: 'qty', header: 'Cantidad' },
            { field: 'date', header: 'Fecha' },
            { field: 'status', header: 'Estado' },
            { field: 'coments', header: 'Comentarios' }
        ];
    }

    showDialogToAdd() {
        this.newAcquisition = true;
        this.acquisition = {};
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.newAcquisition = false;
        this.acquisition = this.cloneAcq(event.data);
        this.displayDialog = true;
    }

    addAcq() {
      if(this.newAcquisition){
        this.showAcquisitionService.addAcq(this.acquisition).subscribe(res =>{console.log('response is ', res)});
      }
      else{
        this.showAcquisitionService.updateAcq(this.acquisition).subscribe(res =>{console.log('response is ', res)});
      }
        this.displayDialog = false
    }

    deleteAcq() {
      if(!this.newAcquisition){
        this.showAcquisitionService.deleteAcq(this.acquisition).subscribe(res =>{console.log('response is ', res)});
      }
        this.displayDialog = false;
    }

    cloneAcq(c: Acquisition): Acquisition {
        let acquisition = {};
        for (let prop in c) {
            acquisition[prop] = c[prop];
        }
        return acquisition;
    }
}
