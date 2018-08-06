import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../models/inventory.model';
import { Withdraw } from '../models/withdraw.model';

@Injectable()
export class ShowInventoryService {

    constructor(private http: HttpClient){

    }

    getAllInv(){
        return this.http.post('/api/inventory/getAllInv',{})
    }

    addInv(material: Inventory){
      return this.http.post('/api/inventory/createInv',{
          sku : material.sku,
          name: material.name,
          brand: material.brand,
          stock_wh: material.stock_wh
        })
    }

    updateInv(material: Inventory){
      return this.http.post('/api/inventory/updateInv',{
        id: material._id,
        sku : material.sku,
        name: material.name,
        brand: material.brand,
        stock_wh: material.stock_wh
    })
}

    deleteInv(id){
      return this.http.post('/api/inventory/deleteInv',{id : id})
    }

    getAllWH(){
        return this.http.post('/api/warehouse/getAllWH',{})
    }

    createAcquire(n_art, n_qty, n_coments, n_destination){
      return this.http.post('api/acquisition/createAcq',{
        art: n_art,
        qty: n_qty,
        status: "Proceso",
        coments: n_coments,
        dateAcq: Date.now(),
        destination: n_destination
      })
    }

    createWithdraw(n_art, withdraw: Withdraw){
      return this.http.post('api/withdraw/createWithdraw',{
        art: n_art,
        qty: withdraw.qty,
        status: withdraw.status,
        coments1: withdraw.coments1,
        date1: Date.now(),
        warehouse: "5b4d6a850ea6ac19a061b34d"
      })
    }

}
