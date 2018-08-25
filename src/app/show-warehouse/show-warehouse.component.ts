import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-warehouse',
  templateUrl: './show-warehouse.component.html',
  styleUrls: ['./show-warehouse.component.css']
})
export class ShowWarehouseComponent implements OnInit {

  cols: any;

  constructor() { }

  ngOnInit() {

    this.cols = [
        { field: '_id', header: 'Código bodega' },
        { field: 'name', header: 'Nombre' }
    ];

  }

}
