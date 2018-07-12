import { Component, OnInit } from '@angular/core';
import { ShowOrderService } from './show-order.service';
import { Orders } from '../models/order.model';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css'],
  providers: [ ShowOrderService ]
})
export class ShowOrderComponent implements OnInit {

  public orders : any [];

  constructor(private showOrderService: ShowOrderService) {

  }

  ngOnInit(){
    this.getAllOrd();
  }

  getAllOrd(){
    this.showOrderService.getAllOrd().subscribe(result => {
        this.orders = result['data'];
    });
  }
}
