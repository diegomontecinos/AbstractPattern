import { Component, OnInit } from '@angular/core';
import { ShowInventoryService } from './show-inventory.service';
import { Materiales } from '../models/materiales.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-show-inventory',
  templateUrl: './show-inventory.component.html',
  styleUrls: ['./show-inventory.component.css'],
  providers: [ ShowInventoryService ]
})
export class ShowInventoryComponent implements OnInit {

  public materiales : any [];

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
