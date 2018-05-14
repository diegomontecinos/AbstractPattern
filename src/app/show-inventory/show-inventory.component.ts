import { Component, OnInit } from '@angular/core';
import { ShowInventoryService } from './show-inventory.service';
import { Materiales } from '../models/materiales.model';
import { MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { DataTableModule } from 'primeng/datatable';

@Component({
  selector: 'app-show-inventory',
  templateUrl: './show-inventory.component.html',
  styleUrls: ['./show-inventory.component.css'],
  providers: [ ShowInventoryService ]
})
export class ShowInventoryComponent implements OnInit {

  public materiales : any [];
  public kaka = 'lala';

  constructor(private showInventoryService: ShowInventoryService) {

  }

  ngOnInit(){
    this.getAllMat();
  }

  getAllMat(){
    this.showInventoryService.getAllMat().subscribe(result => {
        this.materiales = result['data'];
    });
  }


}
