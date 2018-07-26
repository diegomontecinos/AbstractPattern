import { Component, OnInit } from '@angular/core';
import { ShowDispatchService } from './show-dispatch.service';
import { Dispatch } from '../models/dispatch.model';
import { Warehouse } from '../models/warehouse.model';
import { Inventory } from '../models/inventory.model';
import {DropdownModule} from 'primeng/dropdown';


@Component({
  selector: 'app-show-dispatch',
  templateUrl: './show-dispatch.component.html',
  styleUrls: ['./show-dispatch.component.css'],
  providers: [ShowDispatchService]
})
export class ShowDispatchComponent implements OnInit {

  displayDialogNew: boolean;
  displayDialogEdit: boolean;
  dispatch: Dispatch;
  selectedDispatch: Dispatch;
  newDispatch: boolean;
  dispatchs: Dispatch[];
  cols: any[];
  warehouse: Warehouse[];
  comentsDispatch: string;
  newDestination: Warehouse;
  newOrigin: Warehouse;
  newArt: Inventory;
  arts: Inventory[];

  constructor(private showDispatchService: ShowDispatchService) { }


  ngOnInit() {
      this.showDispatchService.getAllDis().subscribe(result => {this.dispatchs = result['data'];});
      this.showDispatchService.getAllWH().subscribe(result => {this.warehouse = result['data'];});
      this.showDispatchService.getAllInv().subscribe(result => {this.arts = result['data'];});

      this.cols = [
          { field: '_id', header: 'Código despacho' },
          { field: 'art', header: 'Artículo' },
          { field: 'qty', header: 'Cantidad' },
          { field: 'status', header: 'Estado' }
      ];
  }

  showDialogToAdd() {
      this.newDispatch = true;
      this.dispatch = {};
      this.displayDialogNew = true;
  }

  onRowSelect(event) {
      this.newDispatch = false;
      this.dispatch = this.cloneDispatch(event.data);
      this.displayDialogEdit = true;
  }

  createDispatch() {
      this.showDispatchService.addDis(this.dispatch, this.newArt._id, this.newOrigin._id, this.newDestination._id).subscribe(res =>{console.log('response is ', res)});
      this.displayDialogNew = false;
  }

  cancelDispatch() {
      this.showDispatchService.updateStatusDis(this.dispatch, this.comentsDispatch, "Cancelado").subscribe(res =>{console.log('response is ', res)});
      this.displayDialogEdit = false;
  }

  rejectDispatch() {
      this.showDispatchService.updateStatusDis(this.dispatch, this.comentsDispatch, "Rechazado").subscribe(res =>{console.log('response is ', res)});
      this.displayDialogEdit = false;
  }

  receiveDispatch() {
      this.showDispatchService.updateStatusDis(this.dispatch, this.comentsDispatch, "Recibido").subscribe(res =>{console.log('response is ', res)});
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
